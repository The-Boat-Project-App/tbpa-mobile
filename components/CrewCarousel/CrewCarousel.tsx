import { useState, useCallback } from 'react'
import { Dimensions, Text, View, Pressable } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useNavigation } from '@react-navigation/native'
import CustomAvatarSmall from '@components/CustomAvatarSmall/CustomAvatarSmall'
import { flexbox } from 'native-base/lib/typescript/theme/styled-system'
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated'
interface CrewCarouselProps {
  users: [Users]
}

const CrewCarousel: React.FunctionComponent<CrewCarouselProps> = ({ users }) => {
  const width = Dimensions.get('window').width

  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const animationStyle: TAnimationStyle = useCallback((value: number) => {
    'worklet'

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30])
    const rotateZ = `${interpolate(value, [-1, 0, 1], [-45, 0, 45])}deg`
    const translateX = interpolate(value, [-1, 0, 1], [-width, 0, width])

    return {
      transform: [{ rotateZ }, { translateX }],
      zIndex,
    }
  }, [])
  const navigation = useNavigation()
  //   console.log('data dans le carousel', users)
  const crewData = users.filter((e) => {
    return e.status == 'crew'
  })
  console.log('crew', crewData)
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Carousel
        customAnimation={animationStyle}
        scrollAnimationDuration={1200}
        loop
        style={{}}
        width={width * 0.9}
        height={width / 1.6}
        autoPlay={true}
        data={crewData}
        // scrollAnimationDuration={1000}
        renderItem={({ item, index }) => (
          <Pressable
            className='mt-4 flex flex-col items-center  p-4 rounded-lg  bg-clearBlue'
            style={{ width: width * 0.9 }}
          >
            <View className='flex flex-row items-center'>
              <CustomAvatarSmall
                key={index}
                isConnected={false}
                avatarPicture={item.avatar}
                userId={item.id}
              />
              <View>
                <View className='bg-white p-2 rounded-lg'>
                  <Text className='font-ralewayBold text-md '>{item.firstName} </Text>
                  <Text className='font-ralewayBold text-xs color-deepBlue'>{item.country} </Text>
                </View>
              </View>
            </View>
            <View className='bg-lightBlue p-2 rounded-lg mt-2'>
              <Text className='font-raleway text-justify text-xs '>{item.desc}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  )
}

export default CrewCarousel
