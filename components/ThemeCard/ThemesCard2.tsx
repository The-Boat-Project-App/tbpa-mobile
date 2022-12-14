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
        return require('../../assets/drawings/dive.png')
      case 'Marseille - Tanger':
        return require('../../assets/drawings/horizon.png')
      case 'Barcelone - Tunis':
        return require('../../assets/drawings/marseille.png')
      case 'Tunis - Bastia':
        return require('../../assets/drawings/compagnons.jpg')
      case 'Bastia - Marseille':
        return require('../../assets/drawings/horizon_abstrait.png')
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
            ?? vol d'oiseau, 1270 kilom??tres s??parent les ports de Tanger et de Marseille. Sur notre
            voilier moderne, la travers??e devrait durer une semaine.{' '}
          </Text>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            En explorant cette partie de la M??diterran??e occidentale, on d??couvre qu???il existe
            plusieurs g??ographies connues. Depuis la cit??e phoc??enne, nous c??toierons le golfe du
            Lion, les ??les Bal??ares, la Mer du Ponant, le Cap de la Nau, Cap de Palos, la Mer
            d???Arborant et le d??troit de Gibraltar. Peuplements grec, comptoirs ph??niciens,
            occupation romaine, invasions barbares, conqu??te islamiques, la M??diterran??e n???a cess??
            d?????tre au prise de diff??rentes influences culturelles.
          </Text>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            Marseille, ville port, point de d??part et d???arriv??e t??moigne de ces ??changes culturels
            constants. En levant l???ancre du Vieux Port, nous r??p??terons les m??mes gestes que les
            Massaliotes qui sortaient de la calanque de Lacydon. En laissant derri??re nous les ??les
            du Frioul, nous avancerons au-dessus des canyons sous marin du grand Rh??ne et petite
            Rh??ne avant de rejoindre la pleine mer.
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
            Apr??s notre escale de trois semaines ?? Tanger, nous embarquerons ?? nouveau pour prendre
            la direction de la Catalogne. Une petite semaine de navigation est compt?? pour quitter
            le d??troit de Gibraltar et atteindre Barcelone.
          </Text>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            En laissant la c??te espagnole ?? tribord durant la premi??re travers??e, nous la longerons
            cette fois par b??bord. Amarin?? par notre premi??re travers??e depuis Marseille, nous
            aurons l???occasion d???am??liorer nos connaissances autour du voilier avant de faire escale
            au port de Barcelone. L?? bas, le mus??e Maritime participera ?? nous donner des clefs de
            lecture sur la m??diterran??e. Nous pourrons confronter notre exp??rience de navigation ??
            celles que nous d??couvrirons dans ce mus??e.
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
            Quand nous quitterons Barcelone, nous effectuerons notre troisi??me navigation. Pendant
            plusieurs jours, nous traverserons le bassin alg??ro-proven??al. C???est durant cette ??tape
            que nous serons les plus ??loign??s de la terre ferme.
          </Text>
          <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
            Arriv?? ?? Tunis, nous serons accompagn??s par l???association des balades
            solidaires.L???escale tunisienne se d??roulera dans un moment particulier puisque nous
            d??couvrirons la ville durant la p??riode du ramadan. Vivre la ville pendant ce moment
            nous montrera l???activit?? nocturne qui s???y d??roule et nous pourrons aller participer aux
            festivit??s qui accompagnent l???iftar.
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
            Tunis- Bastia, c???est la derni??re ?? remont??e ?? vers le nord. On quitte la c??te africaine
            pour remonter vers Marseille. Cette navigation nous fera longer la Sardaigne orientale
            avant de nous arr??ter ?? Bastia. Nous d??couvrirons la mer Tyrrh??nienne qui nous
            approchera des c??tes fran??aises et italiennes.
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
            120 km, c???est la travers??e la plus courte du voyage. Le bateau charg?? de souvenirs et de
            de message, nous ferons nos derniers quarts. Cette derni??re travers??e nous permettra de
            faire le point sur notre retour ?? Marseille que nous aurons quitt?? cinq mois auparavant.
            En laissant derri??re nous la mer ligurienne, nous d??passerons Cannes, Hy??re, Toulon
            avant de retrouver la cit?? phoc??enne.
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
        m={1}
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
                className='h-32 rounded-md'
                source={displayName(themeName)}
                resizeMode='cover'
              ></ImageBackground>
              <Badge colorScheme='deepBlue' variant='outline' rounded='4' border className='mt-1'>
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
