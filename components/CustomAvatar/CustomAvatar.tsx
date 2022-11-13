import { View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

interface CustomAvatar {
  avatarPicture: string
  isConnected: boolean
  userId: string
  noLink: boolean
}

export const CustomAvatar: React.FunctionComponent<CustomAvatarProps> = ({
  avatarPicture,
  isConnected,
  userId,
  noLink = false,
}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      className='w-20 h-20 items-center justify-center'
      onPress={() => {
        !noLink && navigation.navigate('User', { userId: userId })
      }}
    >
      <Image
        source={{
          uri: avatarPicture,
        }}
        className={`w-16 h-16 rounded-full border-2 ${
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

export default CustomAvatar
