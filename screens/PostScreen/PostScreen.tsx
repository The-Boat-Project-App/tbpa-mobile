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
import { SafeAreaView } from 'react-native-safe-area-context'
import RenderHtml from 'react-native-render-html'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import CustomAvatar from '@components/CustomAvatar/CustomAvatar'
import Toggle from '@components/Toggle/Toggle'
import Applause from '@components/Applause/Applause'
import { BookmarkIcon } from 'react-native-heroicons/solid'
import { BookmarkIcon as BookmarkIconOutline } from 'react-native-heroicons/outline'
import { useGetPostsByIdQuery } from '../../graphql/graphql'
import moment from 'moment'
import localization from 'moment/locale/fr'
import LoadingView from '@components/LoadingView/LoadingView'
import YoutubePlayer from 'react-native-youtube-iframe'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

interface PostScreenProps {}

const PostScreen: React.FunctionComponent<PostScreenProps> = (props) => {
  const navigation = useNavigation()

  const { data, refetch } = useGetPostsByIdQuery({
    variables: { id: props.route.params.postId },
  })
  console.log('data du post', data)

  console.log('id du post,', props.route.params.postId)
  const [likes, setLikes] = useState<number>(data?.Posts.likes)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

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

  const source = {
    html: `<div style="text-align:justify;">${data?.Posts.content}</div>`,
  }
  // Modification du style du rendu HTML
  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: '#494848',
    },
    a: {
      color: '#87BC23',
    },
  }
  if (!data) {
    return <LoadingView />
  }
  return (
    <SafeAreaView className='flex-1 bg-white'>
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
        <View className='justify-center bg-white px-3 '>
          {data?.Posts.title && (
            <Text className='text-xl color-deepBlue font-ralewayBold  ml-3 mb-4 text-center'>
              {data?.Posts.title}
            </Text>
          )}

          {data?.Posts.video ? (
            <View className=''>
              <YoutubePlayer height={200} play={true} videoId={data?.Posts.video} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Picture', { imageUrl: data?.Posts.mainPicture })
                console.log('clic detecté')
              }}
            >
              <Image
                className='h-60 rounded-md '
                source={{
                  uri: data?.Posts.mainPicture,
                }}
              />
            </TouchableOpacity>
          )}
          <View className='flex-row justify-between mt-2 '>
            <View className='-mt-12'>
              <CustomAvatar
                userId={data?.Posts.author.id}
                isConnected={false}
                avatarPicture={data?.Posts.author.avatar}
              />
            </View>
            {/* <View className='flex-row justify-center'>
              <Toggle isEnabled={false} />
            </View> */}
            {data?.Posts.likes > 0 && (
              <View className='ml-4 flex flex-row'>
                <MaterialCommunityIcons name='hand-clap' color='#87BC23' size={16} />
                <Text className='text-xs  color-deepBlue font-ralewayBold bg-white mr-2'>
                  {data?.Posts.likes}
                </Text>
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
          <Text className='text-md color-deepBlue font-ralewayBold  '>
            {data?.Posts.author.firstName}
          </Text>
          <Text className='text-xs color-deepBlue font-raleway  mb-4'>
            {moment().diff(data?.Posts.createdAt, 'days') <= 2
              ? moment(data?.Posts.createdAt).fromNow()
              : moment(data?.Posts.createdAt).format('LL')}
          </Text>
          {data?.Posts.content && (
            <RenderHtml contentWidth={width} tagsStyles={tagsStyles} source={source} />
          )}
        </View>
      </ScrollView>
      {data?.Posts.likes && <Applause likes={data?.Posts.likes} postId={data?.Posts.id} />}
    </SafeAreaView>
  )
}

export default PostScreen
