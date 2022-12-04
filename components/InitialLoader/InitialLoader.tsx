import React from 'react'
import { ImageBackground, View } from 'react-native'
import { Spinner } from 'native-base'

interface InitialLoaderProps {}

const InitialLoader: React.FunctionComponent<InitialLoaderProps> = () => {
  return (
    <ImageBackground
      source={require('../../assets/onboarding/onboarding.png')}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}
    >
      <View className='p-20 flex justify-center items-center'>
        <Spinner className='' size='lg' color='white' />
      </View>
    </ImageBackground>
  )
}
export default InitialLoader
