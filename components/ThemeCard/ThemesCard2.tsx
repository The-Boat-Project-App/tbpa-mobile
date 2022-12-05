import React, { useState } from 'react'
import { ImageBackground, useWindowDimensions, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { Pressable, Badge, Box, Modal } from 'native-base'

interface ThemesCard2Props {
  themeName: string
}

const ThemesCard2: React.FunctionComponent<ThemesCard2Props> = ({ themeName }) => {
  const [showModal1, setShowModal1] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [showModal3, setShowModal3] = useState(false)
  const [showModal4, setShowModal4] = useState(false)
  const [showModal5, setShowModal5] = useState(false)
  const { width, height } = useWindowDimensions()
  const displayName = (themeReference: string) => {
    switch (themeReference) {
      case 'Tanger - Barcelone':
        return require('../../assets/drawings/horizon.png')
      case 'Marseille - Tanger':
        return require('../../assets/drawings/horizon.png')
      case 'Barcelone - Tunis':
        return require('../../assets/drawings/compagnons.jpg')
      case 'Tunis - Bastia':
        return require('../../assets/drawings/horizon.png')
      default:
        return 'voilier.jpg'
    }
  }
  const imageSource = '../../assets/drawings/' + displayName(themeName)
  const showModal = (theme) => {
    console.log('themeReference', theme)

    if (theme == 'Tanger - Barcelone') {
      setShowModal2(true)
    } else if (theme == 'Marseille - Tanger') {
      setShowModal1(true)
    } else if (theme == 'Barcelone - Tunis') {
      setShowModal3(true)
    } else if (theme == 'Tunis - Bastia') {
      setShowModal4(true)
    } else if (theme == 'Bastia - Marseille') {
      setShowModal5(true)
    }
  }

  const modal1 = (
    <Modal
      isOpen={showModal1}
      onClose={() => setShowModal1(false)}
      _backdrop={{
        bg: 'warmGray.900',
      }}
    >
      <Modal.Content maxWidth={width} maxH={height * 0.8}>
        <Modal.CloseButton />
        <Modal.Header>
          <Text className='text-md text-justify font-ralewayBold text-deepBlue'>
            Marseille - Tanger
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            À vol d'oiseau, 1270 kilomètres séparent les ports de Tanger et de Marseille. Sur notre
            voilier moderne, la traversée devrait durer une semaine.{' '}
          </Text>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            En explorant cette partie de la Méditerranée occidentale, on découvre qu’il existe
            plusieurs géographies connues. Depuis la citée phocéenne, nous côtoierons le golfe du
            Lion, les Îles Baléares, la Mer du Ponant, le Cap de la Nau, Cap de Palos, la Mer
            d’Arborant et le détroit de Gibraltar. Peuplements grec, comptoirs phéniciens,
            occupation romaine, invasions barbares, conquête islamiques, la Méditerranée n’a cessé
            d’être au prise de différentes influences culturelles.
          </Text>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            Marseille, ville port, point de départ et d’arrivée témoigne de ces échanges culturels
            constants. En levant l’ancre du Vieux Port, nous répéterons les mêmes gestes que les
            Massaliotes qui sortaient de la calanque de Lacydon. En laissant derrière nous les îles
            du Frioul, nous avancerons au-dessus des canyons sous marin du grand Rhône et petite
            Rhône avant de rejoindre la pleine mer.
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
  const modal2 = (
    <Modal
      isOpen={showModal2}
      onClose={() => setShowModal2(false)}
      _backdrop={{
        bg: 'warmGray.900',
      }}
    >
      <Modal.Content maxWidth={width} maxH={height * 0.8}>
        <Modal.CloseButton />
        <Modal.Header>
          <Text className='text-md text-justify font-ralewayBold text-deepBlue'>
            Tanger - Barcelone
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            Après notre escale de trois semaines à Tanger, nous embarquerons à nouveau pour prendre
            la direction de la Catalogne. Une petite semaine de navigation est compté pour quitter
            le détroit de Gibraltar et atteindre Barcelone.
          </Text>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            En laissant la côte espagnole à tribord durant la première traversée, nous la longerons
            cette fois par bâbord. Amariné par notre première traversée depuis Marseille, nous
            aurons l’occasion d’améliorer nos connaissances autour du voilier avant de faire escale
            au port de Barcelone. Là bas, le musée Maritime participera à nous donner des clefs de
            lecture sur la méditerranée. Nous pourrons confronter notre expérience de navigation à
            celles que nous découvrirons dans ce musée.
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
  const modal3 = (
    <Modal
      isOpen={showModal3}
      onClose={() => setShowModal3(false)}
      _backdrop={{
        bg: 'warmGray.900',
      }}
    >
      <Modal.Content maxWidth={width} maxH={height * 0.8}>
        <Modal.CloseButton />
        <Modal.Header>
          <Text className='text-md text-justify font-ralewayBold text-deepBlue'>
            Barcelone - Tunis
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            Quand nous quitterons Barcelone, nous effectuerons notre troisième navigation. Pendant
            plusieurs jours, nous traverserons le bassin algéro-provençal. C’est durant cette étape
            que nous serons les plus éloignés de la terre ferme.
          </Text>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            Arrivé à Tunis, nous serons accompagnés par l’association des balades
            solidaires.L’escale tunisienne se déroulera dans un moment particulier puisque nous
            découvrirons la ville durant la période du ramadan. Vivre la ville pendant ce moment
            nous montrera l’activité nocturne qui s’y déroule et nous pourrons aller participer aux
            festivités qui accompagnent l’iftar.
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
  const modal4 = (
    <Modal
      isOpen={showModal4}
      onClose={() => setShowModal4(false)}
      _backdrop={{
        bg: 'warmGray.900',
      }}
    >
      <Modal.Content maxWidth={width} maxH={height * 0.8}>
        <Modal.CloseButton />
        <Modal.Header>
          <Text className='text-md text-justify font-ralewayBold text-deepBlue'>
            Tunis - Bastia
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            Tunis- Bastia, c’est la dernière « remontée » vers le nord. On quitte la côte africaine
            pour remonter vers Marseille. Cette navigation nous fera longer la Sardaigne orientale
            avant de nous arrêter à Bastia. Nous découvrirons la mer Tyrrhénienne qui nous
            approchera des côtes françaises et italiennes.
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
  const modal5 = (
    <Modal
      isOpen={showModal5}
      onClose={() => setShowModal5(false)}
      _backdrop={{
        bg: 'warmGray.900',
      }}
    >
      <Modal.Content maxWidth={width} maxH={height * 0.8}>
        <Modal.CloseButton />
        <Modal.Header>
          <Text className='text-md text-justify font-ralewayBold text-deepBlue'>
            Bastia - Marseille
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            120 km, c’est la traversée la plus courte du voyage. Le bateau chargé de souvenirs et de
            de message, nous ferons nos derniers quarts. Cette dernière traversée nous permettra de
            faire le point sur notre retour à Marseille que nous aurons quitté cinq mois auparavant.
            En laissant derrière nous la mer ligurienne, nous dépasserons Cannes, Hyère, Toulon
            avant de retrouver la cité phocéenne.
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
  return (
    <>
      <Pressable
        onPress={() => showModal(themeName)}
        rounded='12'
        overflow='hidden'
        borderWidth='0'
        borderColor='coolGray.300'
        maxW='96'
        shadow='5'
        bg='white'
        p='1'
        mr={0}
      >
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              bg={isPressed ? 'white' : isHovered ? 'white' : 'white'}
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
              p='6'
              rounded='6'
              shadow={2}
              borderWidth='1'
              borderColor='coolGray.300'
              alignContent={'center'}
            >
              <ImageBackground
                className='h-32 '
                source={displayName(themeName)}
                resizeMode='cover'
              ></ImageBackground>
              <Badge colorScheme='deepBlue' variant='outline' rounded='4' border>
                {themeName}
              </Badge>
            </Box>
          )
        }}
      </Pressable>
      {modal1}
      {modal2}
      {modal3}
      {modal4}
      {modal5}
    </>
  )
}

export default ThemesCard2
