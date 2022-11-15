import React, { useState, useCallback } from 'react'
import { View, Text, Image, useWindowDimensions, ScrollView, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import ImageViewer from 'react-native-image-zoom-viewer'

interface PictureScreenProps {}

const PictureScreen: React.FunctionComponent<PictureScreenProps> = (props) => {
  console.log('url dans picturescreen', props.route.params.imageUrl)

  const images = [
    {
      // Simplest usage.
      url: props.route.params.imageUrl,

      // width: number
      // height: number
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {
        // headers: ...
      },
    },
  ]
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScreenHeader />
      <ImageViewer imageUrls={images} backgroundColor='white' />

      {/* <View style={{ flex: 1, height: '100%', width: '100%' }}>
        <Image
          style={{ flex: 1, resizeMode: 'contain' }}
          source={{
            uri: props.route.params.imageUrl,
          }}
        />
      </View> */}
    </SafeAreaView>
  )
}

export default PictureScreen
