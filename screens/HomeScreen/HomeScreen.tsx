import { useState, useCallback, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import localization from 'moment/locale/fr'
import InitialLoader from '@components/InitialLoader/InitialLoader'
import LoadingView from '@components/LoadingView/LoadingView'

import {
  useWindowDimensions,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { API_URL } from 'react-native-dotenv'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomAvatar } from '@components/CustomAvatar/CustomAvatar'
import HomeHeader from '@components/HomeHeader/HomeHeader'
import SeeAll from '@components/SeeAll/SeeAll'
import CrewDisplay from '@components/CrewDisplay/CrewDisplay'
import NewsCard from '@components/NewsCard/NewsCard'
import PostCard from '@components/PostCard/PostCard'
import ThemesDisplay from '@components/ThemesDisplay/ThemesDisplay'
import {
  useGetAllNewsQuery,
  useGetValidatedPostsQuery,
  useGetTripByIdQuery,
} from '../../graphql/graphql'
import { boatLocationVar } from '../../variables/boatLocation'
import { userDataVar } from '../../variables/userData'
import { Divider } from 'native-base'

interface HomeScreenProps {}

const HomeScreen: React.FunctionComponent<HomeScreenProps> = ({}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isInitialLoaderVisible, setIsInitialLoaderVisible] = useState<boolean>(true)
  const { height, width } = useWindowDimensions()
  const [newList, setNewsList] = useState([])
  const navigation = useNavigation()
  const { data, refetch } = useGetAllNewsQuery()
  const { data: postsData, refetch: refetchPostsData } = useGetValidatedPostsQuery()
  const { data: tripData, refetch: refetchTripData } = useGetTripByIdQuery({
    variables: { id: '63627a16ad3d7a6d9999e8e9' },
  })
  useEffect(() => {
    setTimeout(() => {
      setIsInitialLoaderVisible(false)
    }, 2500)
  }, [])

  if (tripData) {
    boatLocationVar({
      date: tripData.Trip.locations[0].date,
      description: tripData.Trip.locations[0].description,
      latitude: tripData.Trip.locations[0].latitude,
      longitude: tripData.Trip.locations[0].longitude,
      name: tripData.Trip.locations[0].name,
      start_date: tripData.Trip.start_date,
    })
  }
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      refetch(), refetchPostsData(), refetchTripData(), setRefreshing(false)
    })
  }, [])

  console.log('API_URL in .env', API_URL)
  // console.log('data', data)
  // console.log('tripDatadata', tripData)

  // ! Changement locale Momentjs en global en m??me temps que la langue ?
  moment.updateLocale('fr', localization)

  if (!data || !postsData || !tripData || isInitialLoaderVisible) {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    })

    return <InitialLoader />
  }

  if (data && postsData && tripData && !isInitialLoaderVisible) {
    navigation.setOptions({
      tabBarStyle: { display: 'flex' },
    })
  }

  return (
    <SafeAreaView className='flex-1 bg-white' edges={['top', 'left', 'right']}>
      <HomeHeader isScrolled={isScrolled} />
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
        <View className='justify-center bg-white '>
          <SeeAll target='AllNews' />
          {data && (
            <FlatList
              className='mb-3'
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              data={data.NewsList.slice(-6).reverse()}
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
          <SeeAll target='Crew' />
          <CrewDisplay />
          <SeeAll target='AllPosts' />
          <View className='mx-3 mb-4'>
            {postsData?.ValidatedPostsList.slice(-4)
              .reverse()
              .map((postItem, index) => {
                return (
                  <View key={index}>
                    <PostCard
                      id={postItem.id}
                      title={postItem.title}
                      picture={postItem.mainPicture}
                      likes={postItem.likes}
                      comments={postItem.comments}
                      intro={postItem.intro}
                      video={postItem.video}
                      date={
                        moment().diff(postItem.createdAt, 'days') <= 2
                          ? moment(postItem.createdAt).fromNow()
                          : moment(postItem.createdAt).format('LL')
                      }
                    />
                    {index !== postsData?.ValidatedPostsList.length - 1 && (
                      <Divider bg='#dddddd' thickness='1' my='3' orientation='horizontal' />
                    )}
                  </View>
                )
              })}
          </View>
          <SeeAll target='AllThemes' />
          {/* <ThemesDisplay /> */}
          <TouchableOpacity
            className='flex flex-row justify-center mx-3 mb-3'
            onPress={() => navigation.navigate('AllThemes')}
          >
            <Image
              className='rounded-md '
              source={require('../../assets/images/project_map.png')}
              style={{
                height: width * 0.35,
                width: '100%',
                resizeMode: 'cover',
                margin: 0,
                backgroundColor: 'white',
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  colorBlue: { color: '#0C617D' },
  colorDate: { backgroundColor: '#139db8' },
})

export default HomeScreen
