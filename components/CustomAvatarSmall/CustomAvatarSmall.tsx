import { View, Image, TouchableOpacity } from 'react-native'
import { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'

interface CustomAvatarSmall {
  avatarPicture: string
  isConnected: boolean
  userId: string
  noLink: boolean
}

export const CustomAvatarSmall: React.FunctionComponent<CustomAvatarSmallProps> = ({
  avatarPicture,
  isConnected = true,
  userId,
  noLink = false,
}) => {
  const navigation = useNavigation()
  const key = useRef(null)

  return (
    <TouchableOpacity
      className='w-16 h-18 items-center justify-center'
      onPress={() => {
        !noLink && navigation.navigate('User', { userId: userId, key: key.current })
      }}
    >
      <Image
        source={{
          uri: avatarPicture,
        }}
        className={`w-14 h-14 rounded-full border-2 ${
          isConnected ? 'border-white' : 'border-white'
        }`}
      />
      {isConnected && (
        <View
          className='top-1 left-12 absolute  w-4 h-4 border-2 
           bg-green
         border-white dark:border-gray-800 rounded-full'
        ></View>
      )}
    </TouchableOpacity>
  )
}

export default CustomAvatarSmall
