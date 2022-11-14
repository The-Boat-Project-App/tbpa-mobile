import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView,
  SafeAreaView,
  View,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import { Button, Divider, Badge } from 'native-base'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import {
  useGetAllSubmittedPostsByUserQuery,
  useGetAllDraftPostsByUserQuery,
} from '../../graphql/graphql'
import PostCard from '@components/PostCard/PostCard'
import LoadingView from '@components/LoadingView/LoadingView'
import {
  PlusCircleIcon as PlusCircleIconOutline,
  InboxIcon as InboxIconOutline,
} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

interface UserPostsScreenProps {}

const UserPostsScreen: React.FunctionComponent<UserPostsScreenProps> = (props) => {
  // const { data, refetch } = useGetPostsByIdQuery({
  //   variables: { id: props.route.params.postId },
  // })
  // console.log(props.route.params.postId)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const [isDraftSelected, setIsDraftSelected] = useState<boolean>(false)
  const { data: submittedPostsData, refetch: refetchSubmittedPostsData } =
    useGetAllSubmittedPostsByUserQuery()
  const { data: draftPostsData, refetch: refetchDraftPostsData } = useGetAllDraftPostsByUserQuery()
  console.log('isDraftSelected', isDraftSelected)
  const navigation = useNavigation()
  const { height, width } = useWindowDimensions()
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => {
      refetchSubmittedPostsData(), setRefreshing(false)
    })
  }, [])
  if (!submittedPostsData || !draftPostsData) {
    return <LoadingView />
  }

  const emptyDraftDisplay =
    draftPostsData?.AllDraftPostsByUserList.length == 0 ? (
      <View className='w-2/2 flex flex-row justify-center items-center min-h-full'>
        <InboxIconOutline size={40} color='grey' />
      </View>
    ) : null

  const emptySumbittedDisplay =
    submittedPostsData?.AllSubmittedPostsByUserList.length == 0 ? (
      <View className='w-2/2 flex flex-row justify-center items-center min-h-full'>
        <InboxIconOutline size={40} color='grey' />
      </View>
    ) : null

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex flex-row justify-center'>
        <Text className='text-xl  color-deepBlue font-ralewayBold ml-3 mb-5 mt-6'>
          Vos publications
        </Text>
      </View>
      <View
        className='flex flex-row  mb-2 mx-3'
        style={{ borderBottomWidth: 1, borderBottomColor: '#bfbfbf' }}
      >
        <TouchableOpacity
          className={`w-1/2  flex justify-center items-center ${
            !isDraftSelected ? 'border-b-2 border-deepBlue ' : 'border-b-2 border-white'
          } `}
          onPress={() => setIsDraftSelected(false)}
        >
          <Text
            className={`text-sm  ${
              !isDraftSelected ? 'font-ralewayBold mb-1  color-deepBlue ' : 'font-raleway mb-1'
            } ml-3`}
          >
            Publiées
            {submittedPostsData?.AllSubmittedPostsByUserList.length > 0 && (
              <Badge // bg="red.400"
                colorScheme='success'
                rounded='full'
                mb={2}
                mr={-2}
                zIndex={1}
                variant='subtle'
                alignSelf='flex-start'
                _text={{
                  fontSize: 10,
                }}
              >
                {submittedPostsData?.AllSubmittedPostsByUserList.length}
              </Badge>
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-1/2 bg flex justify-center items-center ${
            isDraftSelected ? 'border-b-2 border-deepBlue ' : 'border-b-2 border-white'
          }`}
          onPress={() => setIsDraftSelected(true)}
        >
          <Text
            className={`text-sm color-deepBlue ${
              isDraftSelected ? 'font-ralewayBold' : 'font-raleway'
            } ml-3`}
          >
            Brouillons
            {draftPostsData?.AllDraftPostsByUserList.length > 0 && (
              <Badge // bg="red.400"
                colorScheme='default'
                rounded='full'
                mb={2}
                mr={-2}
                zIndex={1}
                variant='subtle'
                alignSelf='flex-start'
                _text={{
                  fontSize: 10,
                }}
              >
                {draftPostsData?.AllDraftPostsByUserList.length}
              </Badge>
            )}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        className='mx-3 mt-2 '
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
        {!isDraftSelected && (
          <>
            {submittedPostsData?.AllSubmittedPostsByUserList.map((postItem, index) => {
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
                    authorView='true'
                    validated={postItem.validated}
                  />
                  <Divider bg='#dddddd' thickness='1' my='3' orientation='horizontal' />
                </>
              )
            })}
            {emptySumbittedDisplay}
          </>
        )}
        {isDraftSelected && (
          <>
            {draftPostsData?.AllDraftPostsByUserList.map((postItem, index) => {
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
            {emptyDraftDisplay}
          </>
        )}
      </ScrollView>
      <View className='flex flex-row justify-center'>
        <Text className='text-xl  color-deepBlue font-ralewayBold ml-3 mb-1 mt-4'>
          {draftPostsData?.AllDraftPostsByUserList.length == 0 &&
          submittedPostsData?.AllSubmittedPostsByUserList.length == 0
            ? `Proposez votre première publication !`
            : `Proposer une nouvelle publication`}
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
    </SafeAreaView>
  )
}

export default UserPostsScreen
