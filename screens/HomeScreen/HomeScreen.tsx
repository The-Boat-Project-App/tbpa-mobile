import { useState, useCallback, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import localization from 'moment/locale/fr'
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
import LottieView from 'lottie-react-native'
import { Divider } from 'native-base'

interface HomeScreenProps {}

const HomeScreen: React.FunctionComponent<HomeScreenProps> = ({}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { height, width } = useWindowDimensions()
  const [newList, setNewsList] = useState([])
  const navigation = useNavigation()
  const { data, refetch } = useGetAllNewsQuery()
  const { data: postsData, refetch: refetchPostsData } = useGetValidatedPostsQuery()
  const { data: tripData, refetch: refetchTripData } = useGetTripByIdQuery({
    variables: { id: '63627a16ad3d7a6d9999e8e9' },
  })

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
    console.log('postsData', postsData)
    console.log('tripData', tripData)
    wait(2000).then(() => {
      refetch(), refetchPostsData(), refetchTripData(), setRefreshing(false)
    })
  }, [])

  console.log('API_URL in .env', API_URL)
  // ! Changement locale Momentjs en global en même temps que la langue ?
  moment.updateLocale('fr', localization)

  // if (!data || !postsData || !tripData) {
  //   return <LoadingView />
  // }

  if (data && postsData && tripData) {
    navigation.setOptions({
      tabBarStyle: { display: 'flex' },
    })
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <HomeHeader />
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
          <View className='flex flex-row space-x-10 w-screen  justify-between'>
            <View className='w-1/2 '>
              <Text className='text-xl  color-deepBlue font-ralewayBold mt-2 ml-3 my-2'>
                Actualités
              </Text>
            </View>
            <View className=' flex-row items-center mr-1'>
              <SeeAll target='AllNews' />
            </View>
          </View>
          {data && (
            <FlatList
              className='mb-3'
              horizontal={true}
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

          <Text className='text-xl color-deepBlue font-ralewayBold mt-2 ml-3 my-2'>
            Les compagnons
          </Text>
          <CrewDisplay />
          <View className='flex flex-row space-x-10 w-screen  justify-between'>
            <View className='w-1/2 '>
              <Text className='text-xl  color-deepBlue font-ralewayBold mt-2 ml-3 my-2'>
                Journal de bord
              </Text>
            </View>
            <View className=' flex-row items-center mr-1'>
              <SeeAll target='AllPosts' />
            </View>
          </View>
          <View className='mx-3'>
            {postsData?.ValidatedPostsList.map((postItem, index) => {
              return (
                <View key={index}>
                  <PostCard
                    id={postItem.id}
                    title={postItem.title}
                    picture={postItem.mainPicture}
                    likes={postItem.likes}
                    comments={postItem.comments}
                    intro={postItem.intro}
                  />
                  {index !== postsData?.ValidatedPostsList.length - 1 && (
                    <Divider bg='#dddddd' thickness='1' my='3' orientation='horizontal' />
                  )}
                </View>
              )
            })}
          </View>
          <ThemesDisplay />
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
