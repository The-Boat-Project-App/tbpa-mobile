import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView,
  SafeAreaView,
  View,
  useWindowDimensions,
  Text,
  RefreshControl,
} from 'react-native'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import PostCard from '@components/PostCard/PostCard'
import LoadingView from '@components/LoadingView/LoadingView'
import { Divider } from 'native-base'
import { useGetValidatedPostsQuery } from '../../graphql/graphql'

interface AllPostsScreenProps {}

const AllPostsScreen: React.FunctionComponent<AllPostsScreenProps> = (props) => {
  // const { data, refetch } = useGetPostsByIdQuery({
  //   variables: { id: props.route.params.postId },
  // })
  // console.log(props.route.params.postId)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { data: postsData, refetch: refetchPostsData } = useGetValidatedPostsQuery()

  const { height, width } = useWindowDimensions()
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      refetchPostsData(), setRefreshing(false)
    })
  }, [])
  if (!postsData) {
    return <LoadingView />
  }
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScreenHeader />
      <View className='flex flex-row justify-center mb-4'>
        <Text className='text-xl  color-deepBlue font-ralewayBold ml-3 mb-5'>Journal de bord</Text>
      </View>
      <ScrollView
        className='mx-3'
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
        {postsData?.ValidatedPostsList.map((postItem, index) => {
          return (
            <>
              <PostCard
                key={index}
                id={postItem.id}
                title={postItem.title}
                picture={postItem.mainPicture}
                likes={postItem.likes}
                comments={postItem.comments}
                intro={postItem.intro}
                video={postItem.video}
              />
              {index !== postsData?.ValidatedPostsList.length - 1 && (
                <Divider bg='#dddddd' thickness='1' my='3' orientation='horizontal' />
              )}
            </>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AllPostsScreen
