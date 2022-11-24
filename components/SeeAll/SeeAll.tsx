import React from 'react'
import { View, Text, Pressable } from 'react-native'
import PropTypes from 'prop-types'
import { ChevronRightIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

interface SeeAllProps {
  target: string
}

const SeeAll: React.FunctionComponent<SeeAllProps> = ({ target }) => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(target)
      }}
      className=' flex-row items-center mr-1 justify-between'
    >
      <Text className='text-lg color-deepBlue font-ralewayBold mt-2 ml-3 my-2'>
        {target === 'Crew' && 'Les Compagnons de la Méditerranée'}
        {target === 'AllPosts' && 'Journal de bord'}
        {target === 'AllNews' && 'Actualités du projet'}
      </Text>
      <ChevronRightIcon size='30' color='#272E67' />
    </Pressable>
  )
}

export default SeeAll
