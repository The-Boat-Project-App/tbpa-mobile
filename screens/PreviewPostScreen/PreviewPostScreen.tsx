import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Image, useWindowDimensions, ScrollView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { newPostVar } from '../../variables/newPost'
import RenderHtml from 'react-native-render-html'
import { useReactiveVar } from '@apollo/client'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import CustomAvatar from '@components/CustomAvatar/CustomAvatar'
import Toggle from '@components/Toggle/Toggle'
import { useCreateNewPostMutation, useUpdatePostMutation } from '../../graphql/graphql'
import { userDataVar } from '../../variables/userData'
import { Button, useToast, Box } from 'native-base'
import { useNavigation } from '@react-navigation/native'

interface PreviewPostScreenProps {}

const PreviewPostScreen: React.FunctionComponent<PreviewPostScreenProps> = ({ route }) => {
  console.log('id existant dans la router', route.params.postId)
  const newPostData = useReactiveVar(newPostVar)
  const userData = useReactiveVar(userDataVar)
  const currentNewPostData = useReactiveVar(newPostVar)
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false)
  console.log('newPost dans le store', newPostData)

  const [title, setTitle] = useState<string>(newPostData.title)
  const [intro, setIntro] = useState<string>(newPostData.intro)
  const [content, setContent] = useState<string>(newPostData.content)
  const [video, setVideo] = useState<string>(newPostData.video)

  const [mainPicture, setMainPicture] = useState<string>(newPostData.image)
  const [author, setAuthor] = useState<string>(userData.avatar)
  const [likes, setLikes] = useState<number>(1)
  const [submitted, setSubmitted] = useState<boolean>(true)
  const [isDraftModalVisible, setIsDraftModalVisible] = useState<boolean>(false)

  const [validated, setValidated] = useState<string>('pending')
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string>('')

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
  const [createNewPost] = useCreateNewPostMutation()
  const [updatePost] = useUpdatePostMutation()

  const { height, width } = useWindowDimensions()
  const source = {
    html: newPostData.content,
  }

  useEffect(() => {
    if (route.params.postId) {
      newPostVar({
        title: newPostData.title,
        image: newPostData.image,
        content: newPostData.content,
        intro: newPostData.intro,
        video: newPostData.video,
        id: route.params.postId,
      })
    }
  }, [])
  // Modification du style du rendu HTML
  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: '#272E67',
    },
    a: {
      color: '#87BC23',
    },
  }
  const toast = useToast()

  const createPost = async () => {
    setIsLoading(true)
    const data = new FormData()
    const source = {
      uri: newPostData.image,
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
        if (!route.params.postId) {
          const response = await createNewPost({
            variables: {
              newPostsInput: {
                title,
                intro,
                content,
                mainPicture: data.secure_url,
                likes,
                submitted,
                validated,
                author: '',
                video: newPostData.video,
              },
            },
          })
            .catch((err) => {
              console.log(err)
            })
            .then(() => {
              toast.show({
                title: 'Votre publication est en cours de validation ...',
              })
            })
            .then(() => navigation.navigate('Home'))
        } else {
          const response = await updatePost({
            variables: {
              newPostsInput: {
                id: route.params.postId,
                title,
                intro,
                content,
                mainPicture: data.secure_url,
                likes,
                submitted: true,
                validated,
                author: '',
                video: newPostData.video,
              },
            },
          })
            .catch((err) => {
              console.log(err)
            })
            .then(() => {
              toast.show({
                title: 'Votre publication est en cours de validation ...',
              })
            })
            .then(() => navigation.navigate('Home'))
        }
      })
  }

  const savePost = async () => {
    setIsLoadingSave(true)
    const data = new FormData()
    const source = {
      uri: newPostData.image,
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
        const response = await createNewPost({
          variables: {
            newPostsInput: {
              id: newPostData.id,
              title,
              intro,
              content,
              author,
              mainPicture: data.secure_url,
              likes,
              submitted: false,
              validated,
              video,
            },
          },
        })
      })
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        toast.show({
          title: 'Votre publication a bien été enregistrée dans vos brouillons',
        })
      })
      .then(() => navigation.navigate('AddPost'))
  }

  return (
    <SafeAreaView className='flex-1 bg-white' edges={['top', 'left', 'right']}>
      <View
        className={`flex flex-row justify-end  ${
          Platform.OS === 'ios' ? '-mt-6' : 'mt-4'
        } mx-3 mb-2`}
      >
        <Button onPress={() => navigation.goBack()} variant='outline' className='mr-3'>
          <Text className='color-clearBlue font-ralewayBold'>Éditer</Text>
        </Button>
        <Button onPress={savePost} variant='outline' className='mr-3' isLoading={isLoadingSave}>
          <Text className='color-clearBlue font-ralewayBold'>Sauvegarder</Text>
        </Button>
        {isLoading ? (
          <Button isLoading isLoadingText='Chargement...' onPress={createPost}>
            <Text className='color-white font-ralewayBold'>Publier</Text>
          </Button>
        ) : (
          <Button isLoadingText='Chargement...' onPress={createPost}>
            <Text className='color-white font-ralewayBold'>Publier</Text>
          </Button>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className='flex flex-col'>
        <View className='justify-center bg-white px-3 mt-8 '>
          <Text className='text-xl color-deepBlue font-ralewayBold  ml-3 mb-4 text-center'>
            {newPostData.title}
          </Text>
          <Text className='text-xs color-deepBlue font-raleway mb-4'>{newPostData.intro}</Text>
          <Image
            className='h-48 rounded-md '
            source={{
              uri: newPostData.image,
            }}
          />
          <View className='flex-row justify-between mt-2 '>
            <View className='-mt-12'>
              <CustomAvatar noLink={true} isConnected={true} avatarPicture={userData.avatar} />
            </View>
          </View>
          <Text className=' text-md color-deepBlue font-ralewayBold '>
            Publié par {userData.firstName}
          </Text>
          <Text className='text-xs color-deepBlue font-raleway  mb-4'>Aujourd'hui</Text>
          <View className='color-deepBlue'>
            <RenderHtml tagsStyles={tagsStyles} contentWidth={width * 0.8} source={source} />
          </View>
        </View>

        <View className='flex flex-row justify-end my-4 mx-3'>
          <Button onPress={() => navigation.goBack()} variant='outline' className='mr-3'>
            <Text className='color-clearBlue font-ralewayBold'>Éditer</Text>
          </Button>
          <Button onPress={savePost} variant='outline' className='mr-3' isLoading={isLoadingSave}>
            <Text className='color-clearBlue font-ralewayBold'>Sauvegarder</Text>
          </Button>
          {isLoading ? (
            <Button isLoading isLoadingText='Chargement...' onPress={createPost}>
              <Text className='color-white font-ralewayBold'>Publier</Text>
            </Button>
          ) : (
            <Button isLoadingText='Chargement...' onPress={createPost}>
              <Text className='color-white font-ralewayBold'>Publier</Text>
            </Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PreviewPostScreen
