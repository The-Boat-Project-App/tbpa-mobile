import { Image, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
// import FastImage from 'react-native-fast-image'

interface NewsCard {
  id: string
  picture: string
  date: string
  title: string
  content: string
}

export const NewsCard: React.FunctionComponent<NewsCardProps> = ({
  id,
  picture,
  date,
  title,
  content,
  intro,
}) => {
  //* Regex to shorten text content
  console.log(intro)
  let shortenedContent = intro.replace(/^(.{80}[^\s]*).*/, '$1')
  if (shortenedContent.length > 80) {
    shortenedContent += ' ...'
  }
  const navigation = useNavigation()
  console.log('tessst')
  console.log('id dans newscard ', id)
  return (
    <TouchableOpacity
      className='w-32 p-0 ml-3'
      onPress={() => navigation.navigate('News', { newsId: id })}
    >
      <Image
        className='rounded-md w-full h-24'
        source={{
          uri: picture,
        }}
      />
      {/* <FastImage
        style={{ width: 200, height: 200 }}
        source={{
          uri: picture,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      /> */}
      <Text className='font-bold  text-xs  color-grey font-raleway'>{date}</Text>
      <Text className='text-md  color-deepBlue font-ralewayBold'>{title}</Text>
      <Text className='text-xs  color-grey font-raleway'>{shortenedContent}</Text>
    </TouchableOpacity>
  )
}

export default NewsCard
