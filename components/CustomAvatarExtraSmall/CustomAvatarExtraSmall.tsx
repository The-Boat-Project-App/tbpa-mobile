import { View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

interface CustomAvatarExtraSmallProps {
  avatarPicture: string
  isConnected: boolean
  userId: string
  noLink: boolean
}

export const CustomAvatarExtraSmall: React.FunctionComponent<CustomAvatarExtraSmallProps> = ({
  avatarPicture,
  isConnected = true,
  userId,
  noLink = false,
}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      className='w-10 h-10 items-center justify-center'
      onPress={() => {
        !noLink && navigation.navigate('User', { userId: userId })
      }}
    >
      <Image
        source={{
          uri: avatarPicture,
        }}
        className={`w-8 h-8 rounded-full border-2 ${isConnected ? 'border-white' : 'border-white'}`}
      />
      {isConnected && (
        <View
          className='top-1 left-7 absolute  w-3 h-3 border-2 
           bg-green
         border-white dark:border-gray-800 rounded-full'
        ></View>
      )}
    </TouchableOpacity>
  )
}

export default CustomAvatarExtraSmall
