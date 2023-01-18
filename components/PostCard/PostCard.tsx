import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  useWindowDimensions,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Badge } from 'native-base'
interface PostCardProps {
  id: string
  picture: string
  title: string
  content: string
  likes: number
  intro: string
  video: string
  setIsLoading: Function
  validated: String
  authorView: Boolean
  date: Date
  comments: [
    {
      author: string
      content: string
      date: string
    },
  ]
}

export const PostCard: React.FunctionComponent<PostCardProps> = ({
  id,
  picture,
  title,
  content,
  likes,
  comments,
  intro,
  authorView = false,
  validated,
  video,
  date,
}) => {
  // console.log('validated in PostCard', validated)
  //* Regex to shorten text content
  const shortenedContent = intro.replace(/^(.{120}[^\s]*).*/, '$1') + ' ...'
  const navigation = useNavigation()
  const { height, width } = useWindowDimensions()

  return (
    <TouchableOpacity
      className={`flex-row bg-lightBlue p-2 rounded-md `}
      onPress={() => navigation.navigate('Post', { postId: id, key: id })}
    >
      <View className='w-2/5 justify-center'>
        <Image
          className='h-24 flex-row justify-end rounded-lg'
          // imageStyle={{ borderRadius: '10%' }}
          source={{
            uri: picture,
          }}
          resizeMode='cover'
        ></Image>
      </View>
      <View className='w-3/5 pl-2 flex-col '>
        <View className='flex flex-row justify-between' style={{ width: width * 0.5 }}>
          <View>
            <Text className='font-bold  text-xs  color-grey font-raleway'>{date}</Text>
            <Text className='color-deepBlue font-ralewayBold'>{title}</Text>
          </View>
        </View>
        <Text className='text-xs  color-deepBlue font-raleway'>{shortenedContent}</Text>

        <View
          className={`flex-row mt-2 self-end items-between  w-full   ${
            authorView ? 'justify-between' : 'justify-end'
          }`}
        >
          <View className='flex flex-row s'>
            {authorView && (
              <Badge
                colorScheme={validated == 'validated' ? 'green' : 'coolGray'}
                alignSelf='center'
                variant='subtle'
              >
                {validated == 'validated' ? 'Validée' : 'En cours de validation'}
              </Badge>
            )}
            {video && (
              <>
                <MaterialCommunityIcons name='play-circle' color='#87BC23' size={18} />
                <Text className='text-xs  color-deepBlue font-ralewayBold  mr-1'>Vidéo</Text>
              </>
            )}
            {likes > 0 && (
              <View className='ml-4 flex flex-row'>
                <MaterialCommunityIcons name='hand-clap' color='#87BC23' size={16} />
                <Text className='text-xs  color-deepBlue font-ralewayBold mr-2'>{likes}</Text>
              </View>
            )}
            {comments.length > 0 && (
              <>
                <MaterialCommunityIcons name='chat' color='#87BC23' size={18} />
                <Text className='text-xs  color-deepBlue font-ralewayBold  mr-1'>
                  {comments.length}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PostCard
