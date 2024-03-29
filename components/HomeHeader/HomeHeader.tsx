import { useState } from 'react'
import { View, Image, Text, TouchableOpacity, useWindowDimensions, Platform } from 'react-native'
import { boatLocationVar } from '../../variables/boatLocation'
import { useReactiveVar } from '@apollo/client'
import { Spinner } from 'native-base'
import { useNavigation } from '@react-navigation/native'

interface HomeHeaderProps {
  isScrolled: boolean
}

const HomeHeader: React.FunctionComponent<HomeHeaderProps> = ({ isScrolled }) => {
  const { width } = useWindowDimensions()
  const [formattedCountDown, setFormattedCountDown] = useState<string>('a')
  const boatData = useReactiveVar(boatLocationVar)
  const countDownDate = new Date(boatData.start_date).getTime()
  const navigation = useNavigation()
  //* Nécessaire pour le countdown, sinon on affiche juste "Nos Partenaires"
  // if (boatData.start_date) {
  //   // Update the count down every 1 second
  //   let x = setInterval(function () {
  //     // Get today's date and time
  //     let now = new Date().getTime()

  //     let distance = countDownDate - now

  //     let days = Math.floor(distance / (1000 * 60 * 60 * 24))
  //     let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  //     let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  //     let seconds = Math.floor((distance % (1000 * 60)) / 1000)

  //     setFormattedCountDown(`J-${days} - ${hours} h  ${minutes} m ${seconds} s`)

  //     if (distance < 0) {
  //       clearInterval(x)
  //       setFormattedCountDown('Découvrir le projet')
  //     }
  //   }, 1000)
  // }

  return (
    <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
      <View
        className={`flex-row bg-white ${Platform.OS === 'ios' ? 'pb-0' : 'pb-1'} pr-1 `}
        style={
          !isScrolled
            ? {
                shadowColor: 'white',
                shadowOffset: { width: 1, height: 0.5 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 4,
              }
            : {
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 0.5 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 4,
              }
        }
      >
        <View className='w-1/2 flex flex-row justify-center'>
          <TouchableOpacity onPress={() => navigation.navigate('ProjectDescription')}>
            <Image
              source={{
                uri: 'https://camo.githubusercontent.com/a4c2e531fddea46509f4aac9dce43d10f8592b1ef23cba021aa958d77979956c/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6d617474686965756465762f696d6167652f75706c6f61642f76313636333936333237352f436170747572655f645f652543432538316372616e5f323032322d30392d32335f612543432538305f32322e30302e35375f6734717375362e706e67',
              }}
              style={{ width: width * 0.4, height: width * 0.2, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
          {/* <View className='flex-row justify-center justify-evenly '>
          <TouchableOpacity className='mt-0 justify-center items-center  p-0.5 border border-cyan-700 rounded-md '>
            <Text className='color-cyan-700 font-bold text-xs'>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity className='mt-1 justify-center items-center p-2 border border-cyan-700 rounded-lg bg-cyan-700'>
            <Text className='color-white font-bold text-xs'>FR</Text>
          </TouchableOpacity>
          <TouchableOpacity className='mt-0 justify-center items-center  p-0.5 border border-cyan-700 rounded-md '>
            <Text className='color-cyan-700 font-bold text-xs'>ES</Text>
          </TouchableOpacity>
          <TouchableOpacity className='mt-0 justify-center items-center  p-0.5 border border-cyan-700 rounded-md '>
            <Text className='color-cyan-700 font-bold text-xs'>AR</Text>
          </TouchableOpacity>
        </View> */}
        </View>

        <View className='items-end  w-1/2  mr-2'>
          <Text className='color-deepBlue font-raleway text-xs '>Départ 1ère édition :</Text>
          <Text className='color-deepBlue text-xs font-raleway'>12 janvier 2023</Text>
          <TouchableOpacity
            className='flex-row rounded-md p-1 mt-2 bg-clearBlue justify-center'
            style={{ width: width * 0.4 }}
            onPress={() => navigation.navigate('Partners')}
          >
            {formattedCountDown != '' ? (
              <Text className='color-white  font-ralewayBold text-xs'>Nos Partenaires</Text>
            ) : (
              <Spinner size='sm' color='white' />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default HomeHeader
