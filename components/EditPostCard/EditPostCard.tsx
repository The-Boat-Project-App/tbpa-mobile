import { View, Image, TouchableOpacity, Text, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Badge } from 'native-base'
import { newPostVar } from '../../variables/newPost'

interface EditPostCardProps {
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
  comments: [
    {
      author: string
      content: string
      date: Date
    },
  ]
}

export const EditPostCard: React.FunctionComponent<EditPostCardProps> = ({
  id = null,
  picture,
  title,
  content,
  likes,
  comments,
  intro,
  authorView = false,
  validated,
  video = null,
}) => {
  console.log('validated in PostCard', validated)
  //* Regex to shorten text content
  const shortenedContent = intro.replace(/^(.{70}[^\s]*).*/, '$1') + ' ...'
  const navigation = useNavigation()

  const handleClick = () => {
    newPostVar({
      id: id,
      title: title,
      image: picture,
      content: content,
      intro: intro,
      video: video,
    })
    navigation.navigate('AddNewPost')
  }
  return (
    <TouchableOpacity className='flex-row bg-white p-0  rounded-xl mt-2' onPress={handleClick}>
      <View className='w-2/5'>
        <Image
          className='h-24 flex-row justify-end rounded-lg'
          // imageStyle={{ borderRadius: '10%' }}
          source={{
            uri: picture,
          }}
          resizeMode='cover'
        ></Image>
      </View>
      <View className='w-3/5 pl-3 flex-col '>
        <Text className='color-deepBlue font-ralewayBold'>{title}</Text>
        <Text className='text-xs  color-grey font-raleway text-justify'>{shortenedContent}</Text>
        <View
          className={`flex-row mt-2   self-end items-center  w-full   ${
            authorView ? 'justify-between' : 'justify-end'
          }`}
        >
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
              <Text className='text-xs  color-deepBlue font-ralewayBold bg-white mr-1'>Vidéo</Text>
            </>
          )}
          {likes > 0 && (
            <View className='ml-4 flex flex-row'>
              <MaterialCommunityIcons name='hand-clap' color='#87BC23' size={16} />
              <Text className='text-xs  color-deepBlue font-ralewayBold bg-white mr-2'>
                {likes}
              </Text>
            </View>
          )}
          {comments.length > 0 && (
            <>
              <MaterialCommunityIcons name='chat' color='#87BC23' size={18} />
              <Text className='text-xs  color-deepBlue font-ralewayBold bg-white mr-1'>
                {comments.length}
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default EditPostCard
