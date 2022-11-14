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
import { Button } from 'native-base'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import { useGetAllPostsByUserQuery } from '../../graphql/graphql'
import PostCard from '@components/PostCard/PostCard'
import LoadingView from '@components/LoadingView/LoadingView'
import { PlusCircleIcon as PlusCircleIconOutline } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

interface UserPostsScreenProps {}

const UserPostsScreen: React.FunctionComponent<UserPostsScreenProps> = (props) => {
  // const { data, refetch } = useGetPostsByIdQuery({
  //   variables: { id: props.route.params.postId },
  // })
  // console.log(props.route.params.postId)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { data: postsData, refetch: refetchPostsData } = useGetAllPostsByUserQuery()
  const navigation = useNavigation()
  const { height, width } = useWindowDimensions()
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => {
      refetchPostsData(), setRefreshing(false)
      console.log('AU REFRESH ::::', postsData)
    })
  }, [])
  if (!postsData) {
    return <LoadingView />
  }
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex flex-row justify-center'>
        <Text className='text-xl  color-deepBlue font-ralewayBold ml-3 mb-1 mt-4'>
          Proposer une publication
        </Text>
      </View>
      <Button
        className='mx-6 my-4'
        onPress={() => {
          console.log('clic')
          navigation.navigate('AddNewPost')
        }}
      >
        <PlusCircleIconOutline size={40} color='white' />
      </Button>

      <View className='flex flex-row justify-center'>
        <Text className='text-xl  color-deepBlue font-ralewayBold ml-3 mb-5 mt-6'>
          Vos publications
        </Text>
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
        {postsData?.AllPostsByUserList.map((postItem, index) => {
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserPostsScreen
