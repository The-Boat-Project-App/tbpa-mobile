import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, SafeAreaView, View, useWindowDimensions, Text } from 'react-native'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import LoadingView from '@components/LoadingView/LoadingView'
import { useNavigation } from '@react-navigation/native'

interface ProjectDescriptionScreenProps {}

const ProjectDescriptionScreen: React.FunctionComponent<ProjectDescriptionScreenProps> = (
  props,
) => {
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
          <Text className='text-lg  color-deepBlue font-ralewayBold  ml-3 mb-6 text-center mt-6'>
            Le projet
          </Text>
          <Text className='text-md font-raleway text-justify text-deepBlue mx-4 leading-6 mt-4'>
            L’association The Beit Project France, dans le cadre de son nouveau projet The Boat
            Project, organise une traversée en mer de 6 mois. Des jeunes naviguent entre les 5
            villes méditerranéennes dont ils sont originaires. L’objectif ? Organiser à chaque
            escale des ateliers pour des classes de collégiens. Développés à travers leur expérience
            en mer, ces ateliers rassemblent des élèves venant de contextes différents et traitent
            de sujets variés, aussi bien sociaux que culturels.
          </Text>
          <Text className='text-md font-raleway text-justify text-deepBlue mx-4 leading-6 mt-4'>
            Au cœur du projet un voilier, avec à son bord un équipage formé par 8 jeunes adultes en
            Service Civique recrutés tout autour de la Méditerranée : les Compagnons de la
            Méditerranée. Ils/elles traversent la mer de janvier à juin 2022 et s’arrêtent à
            Marseille, Tanger, Barcelone, Tunis et Bastia pour 3 semaines.
          </Text>
          <Text className='text-lg  color-deepBlue font-ralewayBold  ml-3 mb-6 text-center mt-6'>
            The Boat Project App
          </Text>
          <Text className='text-md font-raleway text-justify text-deepBlue mx-4 leading-6 mt-4'>
            L’association, en partenariat avec des développeurs indépendants, a mis en place The
            Boat Project App pour suivre le projet de manière différente. À la différence du site
            internet ou des réseaux sociaux, l’app vous emmènera, en temps réel, dans les coulisses
            de The Boat Project, sur terre comme sur mer. L'équipage vous partagera son voyage, ses
            expériences et ses actualités. Il vous sera même possible de discuter directement avec
            les membres du projet, pour les plus curieux d’entre vous.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProjectDescriptionScreen
