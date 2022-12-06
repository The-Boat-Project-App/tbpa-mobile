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
      <View
        className='mb-10 p-2 flex flex-col justify-center items-center'
        style={{ opacity: 0.65, backgroundColor: 'white', borderRadius: '50%' }}
      >
        <Spinner className='' size='lg' color='#0C617D' />
      </View>
    </ImageBackground>
  )
}
export default InitialLoader
