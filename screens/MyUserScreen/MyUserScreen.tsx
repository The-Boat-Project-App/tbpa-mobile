import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Platform,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import { PencilSquareIcon } from 'react-native-heroicons/outline'

import { useGetUsersByEmailQuery } from '../../graphql/graphql'
import moment from 'moment'
import localization from 'moment/locale/fr'
import LoadingView from '@components/LoadingView/LoadingView'
import { useNavigation } from '@react-navigation/native'
import { useReactiveVar } from '@apollo/client'

import { userDataVar } from '../../variables/userData'
import { HomeModernIcon, ChatBubbleLeftIcon } from 'react-native-heroicons/outline'

interface MyUserScreenProps {}

const MyUserScreen: React.FunctionComponent<MyUserScreenProps> = (props) => {
  console.log('email dans la route', props.route.params.userEmail)
  console.log('data', data)
  const { data, refetch } = useGetUsersByEmailQuery({
    variables: { email: props.route.params.userEmail },
  })

  const navigation = useNavigation()
  const userDataInApollo = useReactiveVar(userDataVar)

  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { height, width } = useWindowDimensions()
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      refetch(), setRefreshing(false)
    })
  }, [])

  if (!data) {
    return <LoadingView />
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScreenHeader />
      <ScrollView
        className='px-2'
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor='#87BC23'
            colors={['#87BC23', '#139DB8']}
          />
        }
      >
        {data?.userEmail.email == userDataInApollo.email && (
          <View className='ml-4 flex flex-col m-2  self-end'>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditProfile', { userEmail: data?.userEmail.email })
              }
              className='flex flex-row p-1 bg-lightBlue rounded-md items-center justify-between mb-1'
            >
              <PencilSquareIcon size='18' color={'#0C617D'} />
              <Text className='text-md ml-2 color-deepBlue font-ralewayBold  mr-2'>
                Éditer mon profil
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View className=' bg-white flex flex-row mb-4 mt-2 px-2'>
          {data?.userEmail.firstName && (
            <View className='w-1/2 justify-center '>
              <Text className='text-xl color-deepBlue font-ralewayBold'>
                👋 Bonjour !{'\n'}Je m'appelle{'\n'}
                {data?.userEmail.firstName}
              </Text>
              <Text className='text-sm color-grey font-raleway mb-8'>
                Membre depuis {moment(data?.userEmail.createdAt).format('MMMM YYYY')}
              </Text>
            </View>
          )}

          <Image
            className='rounded-full w-32 h-32'
            source={{
              uri: data?.userEmail.avatar,
            }}
          />
        </View>
        <View className={`${Platform.OS === 'ios' ? 'px-3' : 'px-2'}`}>
          {/* <View className='flex-row justify-center'>
            <Toggle isEnabled={false} />
          </View> */}
          <Text className='text-xl color-deepBlue font-ralewayBold mb-2'>À propos</Text>
          <Text className='text-sm color-grey font-raleway mb-6'>{data?.userEmail.bio}</Text>
          <View className='flex flex-row items-center mb-6'>
            <ChatBubbleLeftIcon size={24} color='#272E67' />
            <Text className='text-sm color-grey font-raleway ml-1'>
              Langues :{' '}
              {data?.userEmail.lang.map((language, index) => {
                let formattedLanguage = ''
                if (language === 'FR') {
                  formattedLanguage = 'Français'
                }
                if (language === 'EN') {
                  formattedLanguage = 'English'
                }
                if (language === 'ES') {
                  formattedLanguage = 'Español'
                }
                if (language === 'AR') {
                  formattedLanguage = 'عربى'
                }

                if (language === 'IT') {
                  formattedLanguage = 'Italiano'
                }

                if (index == data?.userEmail.lang.length - 1) {
                  return `${formattedLanguage}`
                }

                return `${formattedLanguage} | `
              })}
            </Text>
          </View>
          <View className='flex flex-row items-center mb-6'>
            <HomeModernIcon size={24} color='#272E67' />
            <Text className='text-sm color-grey font-raleway ml-1'>
              Vient de :{' '}
              {data?.userEmail.city != null && data?.userEmail.country != null
                ? `${data?.userEmail.city}, ${data?.userEmail.country}`
                : ''}
            </Text>
          </View>

          <Text className='text-xl color-deepBlue font-ralewayBold mb-3'>
            {data?.userEmail.firstName} n'a encore rien publié.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MyUserScreen
