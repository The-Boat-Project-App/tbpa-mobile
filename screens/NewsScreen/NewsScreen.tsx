import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
} from 'react-native'
import NewsCard from '@components/NewsCard/NewsCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import RenderHtml from 'react-native-render-html'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import Toggle from '@components/Toggle/Toggle'
import { useGetNewsByIdQuery, useGetAllNewsQuery } from '../../graphql/graphql'
import moment from 'moment'
import localization from 'moment/locale/fr'
import LoadingView from '@components/LoadingView/LoadingView'

interface NewsScreenProps {}

const NewsScreen: React.FunctionComponent<NewsScreenProps> = (props) => {
  const { data, refetch } = useGetNewsByIdQuery({
    variables: { id: props.route.params.newsId },
  })
  const { data: newsData, refetch: refetchNewsData } = useGetAllNewsQuery()

  console.log('data dans postscreen', data)

  console.log(props.route.params.newsId)
  const [likes, setLikes] = useState<number>(data?.News.likes)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { height, width } = useWindowDimensions()
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  console.log('rerender data dans newscreen', data)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    console.log('data dans onrefresh sur newsScreen', data)

    wait(2000).then(() => {
      refetch(), setRefreshing(false)
    })
  }, [])

  const source = {
    html: `<div style="text-align:justify;">${data?.News.content}</div>`,
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

  if (!data || !newsData) {
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
          <View className='self-end mr-2  z-40'></View>
          <Image
            className='h-40 rounded-md '
            source={{
              uri: data?.News.mainPicture,
            }}
          />
          {data?.News.title && (
            <>
              <Text className='text-xl color-deepBlue font-ralewayBold  ml-3 mt-6 mb-2 text-center'>
                {data?.News.title}
              </Text>
              <Text className='text-xs color-deepBlue font-raleway  mb-6 text-center '>
                {moment().diff(data?.News.createdAt, 'days') <= 2
                  ? moment(data?.News.createdAt).fromNow()
                  : moment(data?.News.createdAt).format('LL')}
              </Text>
            </>
          )}

          {data?.News.content && (
            <RenderHtml contentWidth={width} tagsStyles={tagsStyles} source={source} />
          )}
        </View>
        {newsData && (
          <>
            <Text className='text-xl color-deepBlue font-ralewayBold  ml-3 mt-6 mb-2 text-left'>
              Autres actualités
            </Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              data={newsData.NewsList}
              renderItem={({ item, index }) =>
                item.id !== props.route.params.newsId && (
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
                )
              }
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default NewsScreen
