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
import { useGetAllNewsQuery } from '../../graphql/graphql'
import NewsCardHorizontal from '@components/NewsCardHorizontal/NewsCardHorizontal'
import moment from 'moment'
import LoadingView from '@components/LoadingView/LoadingView'

import localization from 'moment/locale/fr'
interface AllNewsScreenProps {}

const AllNewsScreen: React.FunctionComponent<AllNewsScreenProps> = (props) => {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { data: newsData, refetch: refetchNewsData } = useGetAllNewsQuery()

  const { height, width } = useWindowDimensions()
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      refetchNewsData(), setRefreshing(false)
    })
  }, [])
  if (!newsData) {
    return <LoadingView />
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScreenHeader />
      <View className='flex flex-row justify-center'>
        <Text className='text-xl  color-deepBlue font-ralewayBold ml-3 mb-3'>Actualités</Text>
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
        {newsData?.NewsList.map((newsItem, index) => {
          return (
            <NewsCardHorizontal
              date={
                moment().diff(newsItem.createdAt, 'days') <= 2
                  ? moment(newsItem.createdAt).fromNow()
                  : moment(newsItem.createdAt).format('LL')
              }
              key={index}
              id={newsItem.id}
              title={newsItem.title}
              picture={newsItem.mainPicture}
              intro={newsItem.intro}
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AllNewsScreen
