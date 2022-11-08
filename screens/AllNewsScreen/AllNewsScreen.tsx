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
import NewsCard from '@components/NewsCard/NewsCard'
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

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScreenHeader />
      <View className='flex flex-row justify-center'>
        <Text className='text-xl  color-deepBlue font-ralewayBold ml-3 mb-5'>Actualités</Text>
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
            <NewsCard
              key={index}
              id={newsItem.id}
              title={newsItem.title}
              picture={newsItem.mainPicture}
              intro={newsItem.intro}
            />
          )
        })}
        {data && (
          <FlatList
            horizontal={true}
            inverted={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={data.NewsList}
            renderItem={({ item, index }) => (
              <NewsCard
                key={index}
                title={item.title}
                id={item.id}
                intro={item.intro}
                picture={item.mainPicture}
                content={item.content}
                date={
                  moment().diff(item.createdAt, 'days') <= 2
                    ? moment(item.createdAt).fromNow()
                    : moment(item.createdAt).format('LL')
                }
              />
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AllNewsScreen
