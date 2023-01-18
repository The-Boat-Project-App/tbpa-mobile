import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView,
  SafeAreaView,
  View,
  useWindowDimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import LoadingView from '@components/LoadingView/LoadingView'
import { useNavigation } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { Divider } from 'native-base'

interface PartnersScreenProps {}

const PartnersScreen: React.FunctionComponent<PartnersScreenProps> = (props) => {
  const { height, width } = useWindowDimensions()

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScreenHeader arrowDirection={'left'} />

      <ScrollView
        className='mx-3 flex flex-col pb-12'
        style={{ height: '90%' }}
        showsVerticalScrollIndicator={false}
      >
        <View className='flex flex-col justify-end mb-4'>
          <Text className='text-lg  color-deepBlue font-ralewayBold  ml-3 mb-10 text-center mt-6 '>
            Nos partenaires fondateurs
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.matanel.org/')}>
            <View className='items-center'>
              <Image
                style={{ width: width, height: width * 0.17 }}
                resizeMode={'contain'}
                source={{
                  uri: 'https://www.matanel.org/wp-content/uploads/2017/03/m-logo-o.png',
                }}
              />
            </View>
            <Text className='text-md font-ralewayBold text-center text-deepBlue mx-8 leading-6 mt-4'>
              Matanel Foundation
            </Text>

            <Text className='text-md font-raleway text-justify text-deepBlue mx-4 leading-6 mt-2 mb-4'>
              Matanel Foundation soutient des projets encourageant la compréhension entre religions,
              cultures et peuples et investit spécifiquement dans des projets originaux, novateurs
              et transformateurs.
            </Text>
          </TouchableOpacity>
          <Divider thickness='1' orientation='horizontal' className='my-4' />
          <TouchableOpacity onPress={() => Linking.openURL('http://www.euromed.institute')}>
            <View className='items-center'>
              <Image
                style={{ width: width, height: width * 0.17 }}
                resizeMode={'contain'}
                source={{
                  uri: 'http://www.euromed.institute/sites/all/themes/emid_theme/logo.png',
                }}
              />
            </View>
            <Text className='text-md font-ralewayBold text-center text-deepBlue mx-8 leading-6 mt-4'>
              EMID, l'Institut Euro-Méditerranéen pour le Dialogue entre les Civilisations
            </Text>

            <Text className='text-md font-raleway text-justify text-deepBlue mx-4 leading-6 mt-4'>
              L'EMID a pour objectif la promotion et le développement de la compréhension et de la
              tolérance entre les habitants des différentes rives de la Méditerranée.
            </Text>
          </TouchableOpacity>
          <Divider thickness='1' orientation='horizontal' className='my-4' />
          <TouchableOpacity onPress={() => Linking.openURL('https://thebeitproject.org')}>
            <View className='items-center mt-2'>
              <Image
                style={{ width: width, height: width * 0.1 }}
                resizeMode={'contain'}
                source={{
                  uri: 'https://thebeitproject.org/wp-content/uploads/elementor/thumbs/TheBeitProject-Logo_2019-oeds8hk7qa8pynk4wznlh462j0ulwhih71hzx29egq.png',
                }}
              />
            </View>
            <Text className='text-md font-ralewayBold text-center text-deepBlue mx-8 leading-6 mt-8'>
              The Beit Project France
            </Text>
            <Text className='text-md font-raleway text-justify text-deepBlue mx-4 leading-6 mt-4'>
              The Beit Project est un projet né il y a 10 ans avec l'objectif de transformer
              l'espace urbain et son patrimoine en outils d'éducation au vire-ensemble. Il est
              aujourd'hui présent dans 16 villes européennes.
            </Text>
          </TouchableOpacity>
        </View>
        <Divider thickness='4' orientation='horizontal' className='my-4' />
        <Text className='text-lg  color-deepBlue font-ralewayBold  ml-3  text-center mt-0 '>
          Nos partenaires
        </Text>
        <View className='items-center mt-2'>
          <Image
            style={{ width: width, height: width }}
            resizeMode={'contain'}
            source={{
              uri: 'https://res.cloudinary.com/dhjhmopdj/image/upload/v1673877739/Capture_d_%C3%A9cran_2023-01-16_%C3%A0_14.39.20_sqib8r.png',
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PartnersScreen
