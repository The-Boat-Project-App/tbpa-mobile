import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { useToast, Box } from 'native-base'
import { PencilSquareIcon, ArchiveBoxIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import RenderHtml from 'react-native-render-html'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import CustomAvatar from '@components/CustomAvatar/CustomAvatar'
import Toggle from '@components/Toggle/Toggle'
import Applause from '@components/Applause/Applause'
import { BookmarkIcon } from 'react-native-heroicons/solid'
import { BookmarkIcon as BookmarkIconOutline } from 'react-native-heroicons/outline'
import {
  useGetAllDraftPostsByUserLazyQuery,
  useGetPostsByIdQuery,
  useDeletePostsMutation,
} from '../../graphql/graphql'
import moment from 'moment'
import localization from 'moment/locale/fr'
import LoadingView from '@components/LoadingView/LoadingView'
import YoutubePlayer from 'react-native-youtube-iframe'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { newPostVar } from '../../variables/newPost'
import { useReactiveVar } from '@apollo/client'

import { userDataVar } from '../../variables/userData'

interface PostScreenProps {}

const PostScreen: React.FunctionComponent<PostScreenProps> = (props) => {
  const toast = useToast()
  const navigation = useNavigation()
  const userDataInApollo = useReactiveVar(userDataVar)

  const { data, refetch } = useGetPostsByIdQuery({
    variables: { id: props.route.params.postId },
  })
  console.log('data du post', data)

  console.log('id du post,', props.route.params.postId)
  const [likes, setLikes] = useState<number>(data?.Posts.likes)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
  const [deletePostInDb] = useDeletePostsMutation()

  const { height, width } = useWindowDimensions()
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  console.log('🔥data.Posts', data?.Posts)

  const editPost = () => {
    console.log('au clci data.Posts', data?.Posts)
    newPostVar({
      id: data?.Posts.id,
      title: data?.Posts.title,
      image: data?.Posts.mainPicture,
      content: data?.Posts.content,
      intro: data?.Posts.intro,
      video: data?.Posts.video,
    })
    navigation.navigate('AddNewPost')
  }

  const deletePost = async () => {
    const response = await deletePostInDb({
      variables: {
        id: data?.Posts.id,
      },
    })
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <Box bg='#059669' p={2} rounded='sm' mb={5}>
                <Text className='text-xs color-white  font-raleway  '>{`✅ La publication a bien été supprimée.`}</Text>
              </Box>
            )
          },
        })
      })
      .then(() => navigation.navigate('Home'))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      refetch(), setRefreshing(false)
    })
  }, [])

  const source = {
    html: `${data?.Posts.content}`,
  }

  console.log('🧡source', source)
  // Modification du style du rendu HTML
  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: '#494848',
    },
    a: {
      color: '#87BC23',
    },
    p: {
      lineHeight: '1.8em',
    },
  }
  if (!data) {
    return <LoadingView />
  }
  return (
    <SafeAreaView className='flex-1 bg-white' edges={['top', 'left', 'right']}>
      <ScreenHeader />
      <ScrollView
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
        <View className='justify-center bg-white'>
          {data?.Posts.video ? (
            <View className=''>
              <YoutubePlayer height={230} play={true} videoId={data?.Posts.video} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Picture', { imageUrl: data?.Posts.mainPicture })
                console.log('clic detecté')
              }}
            >
              <Image
                className='h-52'
                source={{
                  uri: data?.Posts.mainPicture,
                }}
              />
            </TouchableOpacity>
          )}
          <View className='flex-row justify-between '>
            <View
              className={` ${
                data?.Posts.video
                  ? '-mt-1 flex flex-row items-center justify-start '
                  : 'flex flex-col items-center -mt-8 mx-3'
              } `}
            >
              <CustomAvatar
                userId={data?.Posts.author.id}
                isConnected={false}
                avatarPicture={data?.Posts.author.avatar}
              />
              <View>
                <Text
                  className={`text-md color-deepBlue font-ralewayBold ${
                    data?.Posts.video ? '' : 'text-center'
                  } `}
                >
                  {data?.Posts.author.firstName}
                </Text>
                {data?.Posts.author.status === 'crew' && (
                  <Text
                    className={`text-xs color-clearBlue font-raleway ${
                      data?.Posts.video ? '' : 'text-center'
                    } `}
                  >
                    Compagnon
                  </Text>
                )}
                <Text className='text-xs color-deepBlue font-raleway'>
                  {moment().diff(data?.Posts.createdAt, 'days') <= 2
                    ? moment(data?.Posts.createdAt).fromNow()
                    : moment(data?.Posts.createdAt).format('LL')}
                </Text>
              </View>
            </View>
            {/* <View className='flex-row justify-center'>
              <Toggle isEnabled={false} />
            </View> */}
            {data?.Posts.likes > 0 && (
              <View className='ml-4 flex flex-row mt-2'>
                <MaterialCommunityIcons name='hand-clap' color='#87BC23' size={16} />
                <Text className='text-xs  color-deepBlue font-ralewayBold bg-white mr-2'>
                  {data?.Posts.likes}
                </Text>
              </View>
            )}

            {data?.Posts.author.email == userDataInApollo.email && (
              <View className='ml-4 flex flex-col m-2'>
                <TouchableOpacity
                  onPress={editPost}
                  className='flex flex-row p-1 bg-lightBlue rounded-md items-center justify-between mb-1'
                >
                  <PencilSquareIcon size='18' color={'#0C617D'} />
                  <Text className='text-xs  color-deepBlue font-ralewayBold  mr-2'>Éditer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deletePost}
                  className='flex flex-row p-1 bg-lightBlue rounded-md items-center justify-between'
                >
                  <ArchiveBoxIcon size='18' color={'#0C617D'} />
                  <Text className='text-xs  color-deepBlue font-ralewayBold '>Supprimer</Text>
                </TouchableOpacity>
              </View>
            )}

            {data?.Posts.comments.length > 0 && (
              <>
                <MaterialCommunityIcons name='chat' color='#87BC23' size={18} />
                <Text className='text-xs  color-deepBlue font-ralewayBold bg-white mr-1'>
                  {data?.Posts.comments.length}
                </Text>
              </>
            )}
          </View>

          {data?.Posts.title && (
            <Text className='text-xl color-deepBlue font-ralewayBold  ml-3 mt-5 mb-6 text-center'>
              {data?.Posts.title}
            </Text>
          )}
          {data?.Posts.content && (
            <View className='mx-3 pb-12'>
              <RenderHtml contentWidth={width} tagsStyles={tagsStyles} source={source} />
            </View>
          )}
        </View>
      </ScrollView>
      {data?.Posts.likes && <Applause likes={data?.Posts.likes} postId={data?.Posts.id} />}
    </SafeAreaView>
  )
}

export default PostScreen
