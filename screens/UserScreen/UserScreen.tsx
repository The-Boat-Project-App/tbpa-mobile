import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import CustomAvatar from '@components/CustomAvatar/CustomAvatar'
import Toggle from '@components/Toggle/Toggle'
import { useGetUsersByIdQuery, useGetPostsByUserQuery } from '../../graphql/graphql'
import moment from 'moment'
import localization from 'moment/locale/fr'
import LoadingView from '@components/LoadingView/LoadingView'

import PostCard from '@components/PostCard/PostCard'

import { HomeModernIcon, ChatBubbleLeftIcon } from 'react-native-heroicons/outline'

interface UserScreenProps {}

const UserScreen: React.FunctionComponent<UserScreenProps> = (props) => {
  const { data, refetch } = useGetUsersByIdQuery({
    variables: { id: props.route.params.userId },
  })

  const { data: userPostsData, refetch: refetchUserPostsData } = useGetPostsByUserQuery({
    variables: { id: props.route.params.userId },
  })

  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { height, width } = useWindowDimensions()
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      refetch(), refetchUserPostsData(), setRefreshing(false)
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
        <View className=' bg-white flex flex-row mb-4 mt-2 justify-center'>
          {data?.user.firstName && (
            <View className='w-1/2 justify-center '>
              <Text className='text-xl color-deepBlue font-ralewayBold'>
                👋 Bonjour !{'\n'}Je m'appelle{'\n'}
                {data?.user.firstName}
              </Text>
              <Text className='text-sm color-grey font-raleway mb-8'>
                Membre depuis {moment(data?.user.createdAt).format('MMMM YYYY')}
              </Text>
            </View>
          )}

          <Image
            className='rounded-full w-40 h-40'
            source={{
              uri: data?.user.avatar,
            }}
          />
        </View>
        <View className={`${Platform.OS === 'ios' ? 'px-3' : 'px-2'}`}>
          {/* <View className='flex-row justify-center'>
            <Toggle isEnabled={false} />
          </View> */}
          <Text className='text-xl color-deepBlue font-ralewayBold mb-2'>À propos</Text>
          <Text className='text-sm color-grey font-raleway mb-6'>{data?.user.bio}</Text>
          <View className='flex flex-row items-center mb-6'>
            <ChatBubbleLeftIcon size={24} color='#272E67' />
            <Text className='text-sm color-grey font-raleway ml-1'>
              Langues :{' '}
              {data?.user.lang.map((language, index) => {
                let formattedLanguage = ''
                if (language === 'FR') {
                  formattedLanguage = 'Français'
                }
                if (language === 'EN') {
                  formattedLanguage = 'English'
                }
                if (language === 'SP') {
                  formattedLanguage = 'Español'
                }
                if (language === 'AR') {
                  formattedLanguage = 'عربى'
                }

                if (language === 'IT') {
                  formattedLanguage = 'Italiano'
                }

                if (index == data?.user.lang.length - 1) {
                  return `${formattedLanguage}`
                }

                return `${formattedLanguage} | `
              })}
            </Text>
          </View>
          <View className='flex flex-row items-center mb-6'>
            <HomeModernIcon size={24} color='#272E67' />
            <Text className='text-sm color-grey font-raleway ml-1'>
              Vient de : {`${data?.user.city}, ${data?.user.country}`}
            </Text>
          </View>
          {userPostsData?.PostsByUserList.length > 0 ? (
            <Text className='text-xl color-deepBlue font-ralewayBold mb-3 mt-2'>
              Mes publications
            </Text>
          ) : (
            <Text className='text-xl color-deepBlue font-ralewayBold mb-3'>
              {data?.user.firstName} n'a encore rien publié.
            </Text>
          )}
          {userPostsData?.PostsByUserList.map((postItem, index) => {
            return (
              <PostCard
                key={index}
                id={postItem.id}
                title={postItem.title}
                picture={postItem.mainPicture}
                likes={postItem.likes}
                comments={postItem.comments}
                intro={postItem.intro}
              />
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserScreen
