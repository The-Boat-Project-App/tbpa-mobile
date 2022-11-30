import React from 'react'
import { View, Text, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import ThemeCard from '@components/ThemeCard/ThemeCard'
import ThemesCard2 from '@components/ThemeCard/ThemesCard2'

import { ScrollView } from 'native-base'

interface ThemesDisplayProps {}

const ThemesDisplay: React.FunctionComponent<ThemesDisplayProps> = ({}) => {
  return (
    <View className='mx-3'>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ThemesCard2 themeName='Éducation' />
        <ThemesCard2 themeName='Écologie' />
        <ThemesCard2 themeName='Éducation' />
        <ThemesCard2 themeName='La place des femmes' />
      </ScrollView>
    </View>
  )
}

export default ThemesDisplay
