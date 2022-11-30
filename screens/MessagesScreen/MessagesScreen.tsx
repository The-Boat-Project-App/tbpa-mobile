import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Platform, RefreshControl, FlatList, Keyboard, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, KeyboardAvoidingView, IconButton, Modal, Heading, Spinner } from 'native-base'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import OnlineUsers from '@components/OnlineUsers/OnlineUsers'

import MessageCard from '@components/MessageCard/MessageCard'
import {
  useCreateMessagesMutation,
  useGetAllMessagesQuery,
  useOnMessageAddedSubscription,
  useOnMessageDeletedSubscription,
} from '../../graphql/graphql'

// import moment from 'moment'
// import localization from 'moment/locale/fr'
import LoadingView from '@components/LoadingView/LoadingView'
import { userDataVar } from '../../variables/userData'
import { useReactiveVar } from '@apollo/client'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native'

interface MessagesScreenProps {}

const MessagesScreen: React.FunctionComponent<MessagesScreenProps> = (props) => {
  const navigation = useNavigation()

  const inputRef = useRef()
  const [image, setImage] = useState('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState<boolean>(false)

  const [reload, setReload] = useState<boolean>(false)
  const chatFlatListRef = useRef<FlatList<any>>()
  const userDataInApollo = useReactiveVar(userDataVar)
  const isFocused = useIsFocused()

  const [message, setMessage] = useState<string>('')
  const [sendMessage] = useCreateMessagesMutation()
  const { data: messagesData, refetch: refetchMessagesData } = useGetAllMessagesQuery()
  const [chat, setChat] = useState([])
  // const { data, loading } = useSubscription(MESSAGES_SUBSCRIPTION)
  const { data: newMessageData, loading } = useOnMessageAddedSubscription()
  const { data: deletedMessageData, loading: loadingDeletedMessage } =
    useOnMessageDeletedSubscription()
  useEffect(() => {
    isFocused && setIsConnectionModalOpen(userDataInApollo.firstName ? false : true)
  }, [userDataInApollo.email, isFocused])

  const [refreshing, setRefreshing] = useState<boolean>(false)
  useEffect(() => {
    if (reload) {
      console.log('ee')
      setChat(messagesData)
      setReload(false)
      return
    } else if (messagesData?.MessagesList) {
      console.log('oo', newMessageData?.messageSent)

      if (
        chat.length &&
        newMessageData &&
        !chat.some((e) => e.id == newMessageData?.messageSent.id)
      ) {
        console.log('kk', newMessageData?.messageSent)
        const existingMessages = [...chat]
        const newMessage = { ...newMessageData.messageSent }
        const finalArray = [...existingMessages, newMessage]
        setChat(finalArray)
      } else {
        console.log('messagesOnLoad')
        const messagesOnLoad = [...messagesData?.MessagesList]
        setChat(messagesOnLoad)
      }
    }
  }, [messagesData, newMessageData, reload])
  useEffect(() => {
    if (message.slice(-5) === '.gif ') {
      setIsDisabled(true)
      saveMessage('', message)
    }
  }, [message])

  useEffect(() => {
    if (deletedMessageData && !loadingDeletedMessage) {
      console.log('deletedMessageData', deletedMessageData)
      console.log('chat avant filter', chat)
      const newArray = chat.filter((msg) => msg.id !== deletedMessageData?.messageDeleted.id)
      setChat(newArray)
    }
  }, [deletedMessageData])

  // useEffect(() => {
  //   chatFlatListRef?.current?.scrollTo({
  //     y: 0,
  //     animated: true,
  //   })
  // }, [chat])
  // console.log('newMessageData', newMessageData, 'loading', loading)
  // console.log('data from sub', data)
  const saveMessage = async (image: string, messageToSave: string) => {
    setIsDisabled(true)
    if (image !== '') {
      const response = await sendMessage({
        variables: {
          newMessagesInput: {
            content: image,
            mainPicture: 'httpppp',
            author: '',
          },
        },
      })
      setMessage('')
      setIsOpen(false)
    } else {
      if (message && message !== '') {
        const response = await sendMessage({
          variables: {
            newMessagesInput: {
              content: messageToSave,
              mainPicture: 'httpppp',
              author: '',
            },
          },
        })
        setMessage('')
      }
    }
    setIsDisabled(false)
  }

  const pickImage = async () => {
    setIsOpen(true)

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.2,
    })

    if (result.cancelled) {
    }
    if (!result.cancelled) {
      const data = new FormData()
      const source = {
        uri: result.uri,
        type: 'image/jpeg',
        name: 'newPic',
      }
      data.append('file', source)
      data.append('upload_preset', 'bk8ems2f')
      data.append('cloud_name', 'matthieudev')
      fetch('https://api.cloudinary.com/v1_1/matthieudev/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log('retour de cloudinary', data.secure_url)
          saveMessage(data.secure_url, null)
        })
    }
  }
  // Scroll to end when keyboard is closed.
  const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
    chatFlatListRef.current?.scrollToEnd({ animated: true })
  })
  // console.log('liste de mess', messagesData)
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      // console.log('liste de mess', messagesData)

      refetchMessagesData(), setReload(true), setRefreshing(false)
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
    <SafeAreaView className='flex-1 bg-white' edges={['top', 'left', 'right']}>
      <Text className='text-lg  color-deepBlue font-ralewayBold mt-2 ml-3 my-2 text-center'>
        Chat
      </Text>
      <OnlineUsers />
      <FlatList
        ref={chatFlatListRef}
        onContentSizeChange={() => chatFlatListRef.current?.scrollToEnd({ animated: true })}
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
          <MessageCard
            key={item.id}
            content={item.content}
            author={item.author}
            isAuthor={item.author.email == userDataInApollo.email}
            messageId={item.id}
          />
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
        className='px-3 py-1 flex flex-row justify-between  border-white bg-lightBlue'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Input
          placeholder='Message'
          style={{ color: '#0991b2', fontWeight: 'bold', backgroundColor: 'white' }}
          w='65%'
          size='lg'
          onChangeText={(msg) => setMessage(msg)}
          ref={inputRef}
          value={message}
        />
        <IconButton
          w='13%'
          size='md'
          variant='ghost'
          _icon={{
            as: AntDesign,
            name: 'picture',
          }}
          onPress={() => pickImage()}
        />
        <IconButton
          isDisabled={isDisabled}
          w='17%'
          size='sm'
          variant='solid'
          _icon={{
            as: FontAwesome,
            name: 'send',
          }}
          onPress={() => saveMessage('', message)}
        />
      </KeyboardAvoidingView>
      {/* Modal during image upload */}
      <Modal isOpen={isOpen} safeAreaTop={true}>
        <Modal.Content maxWidth='350'>
          <Modal.Body>
            <Spinner accessibilityLabel='Loading image' />
            <Text className='text-sm  color-deepBlue font-ralewayBold mt-2  my-2 text-center'>
              Envoi de l'image en cours ...
            </Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      {/* Modal if user not connected */}
      <Modal isOpen={isConnectionModalOpen} safeAreaTop={true}>
        <Modal.Content maxWidth='350'>
          <Modal.Header>
            <Text className='text-xl  color-deepBlue font-ralewayBold ml-3 text-center'>
              Connectez-vous pour découvrir toutes les fonctionnalités
            </Text>
          </Modal.Header>
          <Modal.Body>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BottomTabs', { screen: 'Profile' })
                setIsConnectionModalOpen(false)
              }}
            >
              <Text className='text-md  color-deepBlue font-ralewayBold ml-3 text-center'>
                Se connecter ou s'inscrire
              </Text>
            </TouchableOpacity>
          </Modal.Body>
          <Modal.Footer onPress={() => navigation.navigate('Home')}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BottomTabs', { screen: 'Home' })
                setIsConnectionModalOpen(false)
              }}
            >
              <Text className='text-xs  color-deepBlue font-raleway ml-3 text-center'>
                Non merci
              </Text>
            </TouchableOpacity>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  )
}

export default MessagesScreen
