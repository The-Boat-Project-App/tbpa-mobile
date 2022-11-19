import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import NewsCard from '@components/NewsCard/NewsCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import RenderHtml from 'react-native-render-html'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import Toggle from '@components/Toggle/Toggle'
import { useGetNewsByIdQuery, useGetAllNewsQuery } from '../../graphql/graphql'
import moment from 'moment'
import localization from 'moment/locale/fr'
import LoadingView from '@components/LoadingView/LoadingView'
import { Modal } from 'native-base'

interface NewsScreenProps {}

const NewsScreen: React.FunctionComponent<NewsScreenProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false)
  const navigation = useNavigation()

  const { data, refetch } = useGetNewsByIdQuery({
    variables: { id: props.route.params.newsId },
  })
  const { data: newsData, refetch: refetchNewsData } = useGetAllNewsQuery()

  const [likes, setLikes] = useState<number>(data?.News.likes)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { height, width } = useWindowDimensions()
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  console.log('rerender data dans newscreen', data)
  const onRefresh = useCallback(() => {
    setRefreshing(true)

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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Picture', { imageUrl: data?.News.mainPicture })
              console.log('clic detecté')
            }}
          >
            <Image
              className='h-60 rounded-md '
              source={{
                uri: data?.News.mainPicture,
              }}
            />
          </TouchableOpacity>
          {data?.News.title && (
            <>
              <Text className='text-xl color-deepBlue font-ralewayBold  ml-3 mt-6 mb-2 text-center'>
                {data?.News.title}
              </Text>
              <Text className='text-xs color-deepBlue font-raleway  mb-2 text-center '>
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
      {/* <Modal
        style={{ justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}
        isOpen={open}
        onClose={() => setOpen(false)}
        safeAreaTop={true}
      >
        <Modal.Content maxWidth='300'>
          <Modal.CloseButton />
          <Modal.Header>{data?.News.title}</Modal.Header>
          <Modal.Body>
            <View style={{ objectFit: 'contain',width: width, height: height }}>
              <Image
                style={{  resizeMode: 'cover', width: 300, height: 350 }}
                source={{
                  uri: data?.News.mainPicture,
                }}
              />
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal> */}
    </SafeAreaView>
  )
}

export default NewsScreen
