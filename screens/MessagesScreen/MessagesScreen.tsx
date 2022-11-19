import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Platform,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, KeyboardAvoidingView, IconButton, Icon } from 'native-base'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { gql, useQuery, useSubscription } from '@apollo/client'

import MessageCard from '@components/MessageCard/MessageCard'
import {
  useCreateMessagesMutation,
  useGetAllMessagesQuery,
  useOnMessageAddedSubscription,
} from '../../graphql/graphql'

import moment from 'moment'
import localization from 'moment/locale/fr'
import LoadingView from '@components/LoadingView/LoadingView'

import { HomeModernIcon, ChatBubbleLeftIcon } from 'react-native-heroicons/outline'

interface MessagesScreenProps {}

const MessagesScreen: React.FunctionComponent<MessagesScreenProps> = (props) => {
  // const MESSAGES_SUBSCRIPTION = gql`
  //   subscription messageSent {
  //     messageSent {
  //       id
  //       content
  //       mainPicture
  //       author {
  //         firstName
  //       }
  //     }
  //   }
  // `
  const inputRef = useRef()
  const [message, setMessage] = useState<string>('')

  const [sendMessage] = useCreateMessagesMutation()
  const { data: messagesData, refetch: refetchMessagesData } = useGetAllMessagesQuery()
  const [chat, setChat] = useState([])
  // const { data, loading } = useSubscription(MESSAGES_SUBSCRIPTION)
  const { data: newMessageData, loading } = useOnMessageAddedSubscription()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  // console.log(newMessageData)
  useEffect(() => {
    if (messagesData?.MessagesList) {
      if (chat.length && newMessageData) {
        const existingMessages = [...chat]
        const newMessage = { ...newMessageData.messageSent }
        const finalArray = [...existingMessages, newMessage]
        setChat(finalArray)
      } else {
        const messagesOnLoad = [...messagesData?.MessagesList]
        setChat(messagesOnLoad)
      }
    }
  }, [messagesData, newMessageData])
  console.log('newMessageData', newMessageData, 'loading', loading)
  // console.log('data from sub', data)
  const saveMessage = async () => {
    if (message && message !== '') {
      const response = await sendMessage({
        variables: {
          newMessagesInput: {
            content: message,
            mainPicture: 'httpppp',
            author: '',
          },
        },
      })
      setMessage('')
    }
  }
  // console.log('liste de mess', messagesData)
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      // console.log('liste de mess', messagesData)

      refetchMessagesData(), setRefreshing(false)
    })
  }, [])

  // if (!messagesData) {
  //   return <LoadingView />
  // }

  // console.log('data dans partnerScreen', partnersData)

  // const [refreshing, setRefreshing] = useState<boolean>(false)

  // const { height, width } = useWindowDimensions()
  // const wait = (timeout) => {
  //   return new Promise((resolve) => setTimeout(resolve, timeout))
  // }
  // console.log('rerender data dans partnerscreen', partnersData)
  // const onRefresh = useCallback(() => {
  //   setRefreshing(true)
  //   console.log('data dans onrefresh sur partnerScreen', partnersData)

  //   wait(2000).then(() => {
  //     refetchPartnersData(), setRefreshing(false)
  //   })
  // }, [])
  if (!messagesData) {
    return <LoadingView />
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <FlatList
        className='mb-3 mx-3'
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={chat}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor='#87BC23'
            colors={['#87BC23', '#139DB8']}
          />
        }
        renderItem={({ item, index }) => (
          <MessageCard key={index} content={item.content} author={item.author} />
        )}
      />

      {/* <View className=' bg-white flex flex-row mb-4 mt-2 justify-center'>
          {data?.user.firstName && (
            <View className='w-1/2 justify-center '>
              <Text className='text-xl color-deepBlue font-ralewayBold '>
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
        <View className='px-4'> */}
      {/* <View className='flex-row justify-center'>
            <Toggle isEnabled={false} />
          </View>
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
        </View> */}
      <KeyboardAvoidingView
        className='mx-3 flex flex-row justify-between'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Input placeholder='Input' w='82%' onChangeText={(msg) => setMessage(msg)} ref={inputRef} />
        <IconButton
          w='15%'
          size='sm'
          variant='solid'
          _icon={{
            as: FontAwesome,
            name: 'send',
          }}
          onPress={() => saveMessage()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MessagesScreen
