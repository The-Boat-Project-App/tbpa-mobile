import React from 'react'
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import PropTypes from 'prop-types'
import ThemeCard from '@components/ThemeCard/ThemeCard'
import ThemesCard2 from '@components/ThemeCard/ThemesCard2'

import { ScrollView } from 'native-base'

interface ThemesDisplayProps {}

const ThemesDisplay: React.FunctionComponent<ThemesDisplayProps> = ({ setShowModal1 }) => {
  const { width, heigth } = useWindowDimensions()
  return (
    <View className=''>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <Text className='text-lg  color-deepBlue font-ralewayBold  ml-3 mb-6 text-center  '>
          Routes maritimes
        </Text>
        <View style={{ width: width * 0.7 }}>
          <ThemesCard2 themeName='Marseille - Tanger' />
          <ThemesCard2 themeName='Tanger - Barcelone' />
          <ThemesCard2 themeName='Barcelone - Tunis' />
          <ThemesCard2 themeName='Tunis - Bastia' />
          <ThemesCard2 themeName='Bastia - Marseille' />
        </View>
      </ScrollView>
    </View>
  )
}

export default ThemesDisplay
