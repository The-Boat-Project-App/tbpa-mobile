import { View, Image, Text, useWindowDimensions, Platform, TouchableOpacity } from 'react-native'
import {
  ArrowLeftCircleIcon as ArrowLeftCircleIconOutline,
  ArrowDownCircleIcon as ArrowDownCircleIconOutline,
} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { useRef } from 'react'

interface ScreenHeaderProps {
  arrowDirection: String
}

const ScreenHeader: React.FunctionComponent<ScreenHeaderProps> = ({ arrowDirection = 'left' }) => {
  const { height, width } = useWindowDimensions()
  const navigation = useNavigation()

  return (
    <View className={`flex-row mx-3  ${Platform.OS === 'ios' ? 'pb-0 -mt-2' : 'pb-1 mt-1'} pr-1 `}>
      <TouchableOpacity
        className=' justify-center align-middle flex-1'
        onPress={() => {
          navigation.pop()
        }}
      >
        {arrowDirection == 'down' ? (
          <ArrowDownCircleIconOutline size='42' color='#0C617D' />
        ) : (
          <ArrowLeftCircleIconOutline size='42' color='#0C617D' />
        )}
      </TouchableOpacity>
      <View className='mr-2'>
        <Image
          source={{
            uri: 'https://camo.githubusercontent.com/a4c2e531fddea46509f4aac9dce43d10f8592b1ef23cba021aa958d77979956c/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6d617474686965756465762f696d6167652f75706c6f61642f76313636333936333237352f436170747572655f645f652543432538316372616e5f323032322d30392d32335f612543432538305f32322e30302e35375f6734717375362e706e67',
          }}
          style={{ width: width * 0.35, height: width * 0.2, resizeMode: 'contain' }}
        />
      </View>
    </View>
  )
}

export default ScreenHeader
