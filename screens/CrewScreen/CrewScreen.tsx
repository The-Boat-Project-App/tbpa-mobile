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
import { Divider, Pressable } from 'native-base'
import { useGetValidatedPostsQuery } from '../../graphql/graphql'
import { useGetAllUsersQuery } from '../../graphql/graphql'
import CustomAvatarSmall from '@components/CustomAvatarSmall/CustomAvatarSmall'
import CrewCarousel from '@components/CrewCarousel/CrewCarousel'
import CrewDisplay from '@components/CrewDisplay/CrewDisplay'

interface CrewScreenProps {}

const CrewScreen: React.FunctionComponent<CrewScreenProps> = (props) => {
  const { data, refetch } = useGetAllUsersQuery()

  // const { data, refetch } = useGetPostsByIdQuery({
  //   variables: { id: props.route.params.postId },
  // })
  // console.log(props.route.params.postId)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { data: postsData, refetch: refetchPostsData } = useGetValidatedPostsQuery()
  console.log('data dans crewscreen', data)
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

      <View
        className='mx-3 flex flex-col justify-between'
        style={{ height: '90%' }}
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
        <View className='flex flex-col justify-end mb-4'>
          <Text className='text-lg  color-deepBlue font-ralewayBold  ml-3 mb-6 text-center mt-6'>
            Les compagnons de la Méditerranée
          </Text>
          <Text className='text-md font-raleway text-center text-deepBlue mx-8 leading-6'>
            L’équipage du bateau est composé de deux skippers, d’un coordinateur mais aussi et
            surtout des « Compagnons de la Méditerranée ». Qui sont-il ?
          </Text>
          <Text className='text-md font-raleway text-center text-deepBlue mx-8 leading-6 mt-4'>
            Huit jeunes spécialement recrutés autour de la Méditerranée pour animer les ateliers
            autour du vivre-ensemble. Ces jeunes naviguent entre les 5 villes méditerranéennes dont
            ils sont originaires.
          </Text>
        </View>
        <CrewDisplay />
        {data && <CrewCarousel users={data?.usersList} />}
      </View>
    </SafeAreaView>
  )
}

export default CrewScreen
