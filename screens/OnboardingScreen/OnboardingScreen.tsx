import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView,
  SafeAreaView,
  View,
  useWindowDimensions,
  Text,
  RefreshControl,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { FlatList } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import PostCard from '@components/PostCard/PostCard'
import InitialLoader from '@components/InitialLoader/InitialLoader'

interface OnboardingScreenProps {}
const slides = [
  {
    id: 1,
    image: require('../../assets/onboarding/boat_medium.jpg'),
    title: '👋 Bienvenue sur The Boat Project !',
    subtitle:
      'Au cœur du projet : un voilier avec à son bord huit jeunes en Service Civique : les Compagnons de la Méditerranée, ainsi que des partenaires locaux et des collégiens, venant des 5 villes méditerranéennes visitées. ',
  },
  {
    id: 2,
    image: require('../../assets/onboarding/onboarding4.png'),
    title: "Six mois d'aventure",
    subtitle:
      'À chaque escale, les Compagnons de la Méditerranée rencontrent des collégiens venant de contextes différents pour organiser des ateliers autour de sujets variés, tant sociaux que culturels.',
  },

  {
    id: 3,
    image: require('../../assets/onboarding/onboarding3.png'),
    title: 'The Boat Project App',
    subtitle:
      "Grâce à l'application, suivez en temps réel les aventures des Compagnons de la Méditerranée et communiquez directement avec eux. Découvrez les actualités du Boat Project et de ses partenaires.",
  },
]

const Slide = ({ item }) => {
  const { height, width } = useWindowDimensions()

  return (
    <View
      className={`${Platform.OS === 'ios' ? 'mt-20' : 'mt-28'}`}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width,
        borderRadius: 20,
      }}
    >
      <Image
        className='rounded-md '
        source={item?.image}
        style={{
          marginTop: 10,
          height: '60%',
          width: '70%',
          resizeMode: 'contain',
          margin: 0,
          backgroundColor: 'white',
        }}
      />
      <View className='mt-10  items-center'>
        <Text className='font-ralewayBold' style={styles.title}>
          {item?.title}
        </Text>
        <Text className='font-ralewayBold text-grey text-xs' style={styles.subtitle}>
          {item?.subtitle}
        </Text>
      </View>
    </View>
  )
}
const OnboardingScreen: React.FunctionComponent<OnboardingScreenProps> = (props) => {
  const navigation = useNavigation()
  const { height, width } = useWindowDimensions()

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const ref = useRef()
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width
      ref?.current.scrollToOffset({ offset })
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  const skip = () => {
    const lastSlideIndex = slides.length - 1
    const offset = lastSlideIndex * width
    ref?.current.scrollToOffset({ offset })
    setCurrentSlideIndex(lastSlideIndex)
  }

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.2,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: '#87BC23',
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ height: 40 }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('BottomTabs')}
              >
                <Text className='font-ralewayBold text-white' style={{ fontSize: 15 }}>
                  Démarrer
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: '#139DB8',
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}
              >
                <Text
                  className='font-ralewayBold'
                  style={{
                    fontSize: 15,
                    color: '#139DB8',
                  }}
                >
                  Passer
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity activeOpacity={0.8} onPress={goToNextSlide} style={styles.btn}>
                <Text
                  className='font-ralewayBold text-white'
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}
                >
                  Continuer
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.69 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    maxWidth: '80%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: '#272E67',
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: '#272E67',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#139DB8',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
