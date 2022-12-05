import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import ThemeCard from '@components/ThemeCard/ThemeCard'
import ThemesCard2 from '@components/ThemeCard/ThemesCard2'

import { ScrollView } from 'native-base'

interface ThemesDisplayProps {}

const ThemesDisplay: React.FunctionComponent<ThemesDisplayProps> = ({ setShowModal1 }) => {
  return (
    <View className=''>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <Text className='text-lg  color-deepBlue font-ralewayBold  ml-3 mb-6 text-center  '>
          Routes maritimes
        </Text>

        <ThemesCard2 themeName='Marseille - Tanger' />

        <View className='flex flex-row'>
          <ThemesCard2 themeName='Tanger - Barcelone' />
          <ThemesCard2 themeName='Barcelone - Tunis' />
        </View>
        <View className='flex flex-row'>
          <ThemesCard2 themeName='Tunis - Bastia' />
          <ThemesCard2 themeName='Bastia - Marseille' />
        </View>
      </ScrollView>
    </View>
  )
}

export default ThemesDisplay
