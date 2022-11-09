import { Image, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

interface NewsCard {
  id: string
  picture: string
  date: string
  title: string
  content: string
}

export const NewsCardHorizontal: React.FunctionComponent<NewsCardProps> = ({
  id,
  picture,
  date,
  title,
  content,
  intro,
}) => {
  //* Regex to shorten text content
  console.log(intro)
  let shortenedContent = intro.replace(/^(.{60}[^\s]*).*/, '$1')
  if (shortenedContent.length > 60) {
    shortenedContent += ' ...'
  }
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      className=' p-0  flex flew-row mt-6'
      onPress={() => navigation.navigate('News', { newsId: id })}
    >
      <Image
        className='rounded-md w-full h-32'
        source={{
          uri: picture,
        }}
      />
      <Text className='font-bold  text-xs  color-grey font-raleway'>{date}</Text>
      <Text className='text-md  color-deepBlue font-ralewayBold'>{title}</Text>
      <Text className='text-xs  color-grey font-raleway'>{shortenedContent}</Text>
    </TouchableOpacity>
  )
}

export default NewsCardHorizontal
