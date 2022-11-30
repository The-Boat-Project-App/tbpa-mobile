import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView,
  SafeAreaView,
  View,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  RefreshControl,
  Platform,
  SnapshotViewIOSComponent,
} from 'react-native'
import { newPostVar } from '../../variables/newPost'

import { Button, Divider, Badge, Modal } from 'native-base'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import {
  useGetAllSubmittedPostsByUserQuery,
  useGetAllDraftPostsByUserQuery,
} from '../../graphql/graphql'
import PostCard from '@components/PostCard/PostCard'
import EditPostCard from '@components/EditPostCard/EditPostCard'
import LoadingView from '@components/LoadingView/LoadingView'
import {
  PlusCircleIcon as PlusCircleIconOutline,
  InboxIcon as InboxIconOutline,
} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { useReactiveVar } from '@apollo/client'
import { userDataVar } from '../../variables/userData'
import { useIsFocused } from '@react-navigation/native'

interface UserPostsScreenProps {}

const UserPostsScreen: React.FunctionComponent<UserPostsScreenProps> = (props) => {
  //Check if user is connected => if not, display modal
  const isFocused = useIsFocused()

  const userDataInApollo = useReactiveVar(userDataVar)
  console.log('userdateinapollo', userDataInApollo)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navigation = useNavigation()
  const [isDraftSelected, setIsDraftSelected] = useState<boolean>(false)
  const { data: submittedPostsData, refetch: refetchSubmittedPostsData } =
    useGetAllSubmittedPostsByUserQuery()
  const { data: draftPostsData, refetch: refetchDraftPostsData } = useGetAllDraftPostsByUserQuery()
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
  console.log('🍭submittedPostsData', submittedPostsData)
  console.log('🍭draftPostsData', draftPostsData)

  useEffect(() => {
    isFocused && setIsOpen(userDataInApollo.firstName ? false : true)
  }, [userDataInApollo.email, isFocused])

  if (!submittedPostsData || !draftPostsData) {
    if (userDataInApollo.email || userDataInApollo.firstName) {
      return <LoadingView />
    }
  }

  // let isConnected
  // if (userDataInApollo.email !== '' || !userDataInApollo.email) {
  //   isConnected = false
  // }
  const emptyDraftDisplay =
    draftPostsData?.AllDraftPostsByUserList.length == 0 ? (
      <View
        style={{ flex: 1, minHeight: height * 0.5, justifyContent: 'center', alignItems: 'center' }}
      >
        <InboxIconOutline size={40} color='grey' />
        <Text className='text-sm color-grey font-raleway'>Vous n'avez pas de brouillons.</Text>
      </View>
    ) : null

  const emptySumbittedDisplay =
    submittedPostsData?.AllSubmittedPostsByUserList.length == 0 ? (
      <View
        style={{ flex: 1, minHeight: height * 0.5, justifyContent: 'center', alignItems: 'center' }}
      >
        <InboxIconOutline size={40} color='grey' />
        <Text className='text-sm color-grey font-raleway'>Vous n'avez pas encore publié.</Text>
      </View>
    ) : null

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex flex-row justify-center'>
        <Text
          className={`text-xl  color-deepBlue font-ralewayBold ml-3 mb-5  ${
            Platform.OS === 'ios' ? 'mt-6' : 'mt-12'
          }`}
        >
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
              console.log('tous les brouillons', postItem)
              return (
                <EditPostCard
                  key={index}
                  id={postItem.id ? postItem.id : null}
                  title={postItem.title}
                  picture={postItem.mainPicture}
                  likes={postItem.likes}
                  comments={postItem.comments}
                  intro={postItem.intro}
                  content={postItem.content}
                  video={postItem.video}
                />
              )
            })}
            {emptyDraftDisplay}
          </>
        )}
      </ScrollView>
      <View className='flex flex-row justify-center'>
        <Text className='text-xl  color-deepBlue font-ralewayBold mx-16 mb-1 mt-4 text-center'>
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
          newPostVar({
            title: '',
            image: '',
            content: '',
            intro: '',
            video: null,
            id: null,
          })
          navigation.navigate('AddNewPost')
        }}
      >
        <PlusCircleIconOutline size={40} color='white' />
      </Button>

      <Modal isOpen={isOpen} safeAreaTop={true}>
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
                setIsOpen(false)
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
                setIsOpen(false)
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

export default UserPostsScreen
