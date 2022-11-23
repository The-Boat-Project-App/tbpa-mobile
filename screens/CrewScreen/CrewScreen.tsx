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
import { useGetAllUsersQuery } from '../../graphql/graphql'
import CustomAvatarSmall from '@components/CustomAvatarSmall/CustomAvatarSmall'

interface CrewScreenProps {}

const CrewScreen: React.FunctionComponent<CrewScreenProps> = (props) => {
  const { data, refetch } = useGetAllUsersQuery()

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
      <ScreenHeader arrowDirection={'left'} />

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
        <Text className='text-lg  color-deepBlue font-ralewayBold mt-2 ml-3 my-2 text-center'>
          Les compagnons de la Méditerranée
        </Text>
        <Text className='text-md font-raleway text-justify text-deepBlue'>
          Au cœur du projet : un voilier avec à son bord 8 compagnons de la Méditerranée, des
          partenaires locaux et des collégiens, venant des 5 villes méditerranéennes visitées. Les
          Compagnons de la Méditerranée pour créer des ateliers pédagogiques sur le vivre-ensemble.
          Les partenaires locaux pour aider à la pédagogie des ateliers. Les collégiens des 5 villes
          méditerranéennes pour assister aux ateliers et échanger sur le vivre-ensemble.
        </Text>
        <Text className='text-md font-raleway text-justify text-grey'></Text>
        {data?.usersList.map((user, index) => {
          if (user.status === 'crew' /* && user.email !== userDataInApollo.email */) {
            return (
              <View className='mt-4 flex flex-col items-center mx-4'>
                <View className='flex flex-row items-center'>
                  <CustomAvatarSmall
                    key={index}
                    isConnected={false}
                    avatarPicture={user.avatar}
                    userId={user.id}
                  />
                  <Text className='font-ralewayBold'>{user.firstName} </Text>
                </View>
                <Text className='font-raleway text-justify italic'>
                  Marin est paysagiste de formation. De ce fait, il a acquis de solides compétences
                  en dessin et écriture. Pour candidater, il y a réalisé un journal de bord dessiné
                  fictif.
                </Text>
              </View>
            )
          }
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default CrewScreen
