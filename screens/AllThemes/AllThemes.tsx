import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView,
  SafeAreaView,
  View,
  useWindowDimensions,
  Text,
  RefreshControl,
  Image,
} from 'react-native'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import PostCard from '@components/PostCard/PostCard'
import LoadingView from '@components/LoadingView/LoadingView'
import { Button, Modal } from 'native-base'
import { useGetValidatedPostsQuery } from '../../graphql/graphql'
import { useGetAllUsersQuery } from '../../graphql/graphql'

interface AllThemesScreenProps {}

const AllThemesScreen: React.FunctionComponent<AllThemesScreenProps> = (props) => {
  const { data, refetch } = useGetAllUsersQuery()

  // const { data, refetch } = useGetPostsByIdQuery({
  //   variables: { id: props.route.params.postId },
  // })
  // console.log(props.route.params.postId)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [showModal1, setShowModal1] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [showModal3, setShowModal3] = useState(false)
  const [showModal4, setShowModal4] = useState(false)
  const [showModal5, setShowModal5] = useState(false)

  const { data: postsData, refetch: refetchPostsData } = useGetValidatedPostsQuery()
  console.log('data dans crewscreen', data)
  const { height, width } = useWindowDimensions()
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      refetchPostsData(), setRefreshing(false)
    })
  }, [])
  if (!postsData) {
    return <LoadingView />
  }
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScreenHeader arrowDirection={'left'} />

      <ScrollView
        className='mx-3 flex flex-col'
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor='#87BC23'
            colors={['#87BC23', '#139DB8']}
          />
        }
      >
        <View className='flex flex-col justify-center mb-4  items-center'>
          <Text className='text-lg  color-deepBlue font-ralewayBold  ml-3 mb-6 text-center  '>
            Thèmes & routes maritimes
          </Text>
          <Button
            className='rounded-sm mb-4'
            style={{ width: width * 0.6 }}
            onPress={() => setShowModal1(true)}
          >
            <Text className='text-md font-ralewayBold text-center text-white mx-8 leading-6'>
              Marseille - Tanger
            </Text>
          </Button>
          <Button
            className='rounded-sm mb-4'
            style={{ width: width * 0.6 }}
            onPress={() => setShowModal2(true)}
          >
            <Text className='text-md font-ralewayBold text-center text-white mx-8 leading-6'>
              Tanger - Barcelone
            </Text>
          </Button>
          <Button
            className='rounded-sm mb-4'
            style={{ width: width * 0.6 }}
            onPress={() => setShowModal3(true)}
          >
            <Text className='text-md font-ralewayBold text-center text-white mx-8 leading-6'>
              Barcelone - Tunis
            </Text>
          </Button>
          <Button
            className='rounded-sm mb-4'
            style={{ width: width * 0.6 }}
            onPress={() => setShowModal4(true)}
          >
            <Text className='text-md font-ralewayBold text-center text-white mx-8 leading-6'>
              Tunis - Bastia
            </Text>
          </Button>
          <Button
            className='rounded-sm mb-4'
            style={{ width: width * 0.6 }}
            onPress={() => setShowModal5(true)}
          >
            <Text className='text-md font-ralewayBold text-center text-white mx-8 leading-6'>
              Bastia - Marseille
            </Text>
          </Button>
          {/* Modal Marseille Tanger */}
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
                  À vol d'oiseau, 1270 kilomètres séparent les ports de Tanger et de Marseille. Sur
                  notre voilier moderne, la traversée devrait durer une semaine.{' '}
                </Text>
                <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
                  En explorant cette partie de la Méditerranée occidentale, on découvre qu’il existe
                  plusieurs géographies connues. Depuis la citée phocéenne, nous côtoierons le golfe
                  du Lion, les Îles Baléares, la Mer du Ponant, le Cap de la Nau, Cap de Palos, la
                  Mer d’Arborant et le détroit de Gibraltar. Peuplements grec, comptoirs phéniciens,
                  occupation romaine, invasions barbares, conquête islamiques, la Méditerranée n’a
                  cessé d’être au prise de différentes influences culturelles.
                </Text>
                <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
                  Marseille, ville port, point de départ et d’arrivée témoigne de ces échanges
                  culturels constants. En levant l’ancre du Vieux Port, nous répéterons les mêmes
                  gestes que les Massaliotes qui sortaient de la calanque de Lacydon. En laissant
                  derrière nous les îles du Frioul, nous avancerons au-dessus des canyons sous marin
                  du grand Rhône et petite Rhône avant de rejoindre la pleine mer.
                </Text>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          {/* Modal Tanger - Barcelone */}
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
                  Après notre escale de trois semaines à Tanger, nous embarquerons à nouveau pour
                  prendre la direction de la Catalogne. Une petite semaine de navigation est compté
                  pour quitter le détroit de Gibraltar et atteindre Barcelone.
                </Text>
                <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
                  En laissant la côte espagnole à tribord durant la première traversée, nous la
                  longerons cette fois par bâbord. Amariné par notre première traversée depuis
                  Marseille, nous aurons l’occasion d’améliorer nos connaissances autour du voilier
                  avant de faire escale au port de Barcelone. Là bas, le musée Maritime participera
                  à nous donner des clefs de lecture sur la méditerranée. Nous pourrons confronter
                  notre expérience de navigation à celles que nous découvrirons dans ce musée.
                </Text>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          {/* Modal Barcelone tunis */}
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
                  Quand nous quitterons Barcelone, nous effectuerons notre troisième navigation.
                  Pendant plusieurs jours, nous traverserons le bassin algéro-provençal. C’est
                  durant cette étape que nous serons les plus éloignés de la terre ferme.
                </Text>
                <Text className='mb-2 text-xs text-justify font-raleway text-deepBlue'>
                  Arrivé à Tunis, nous serons accompagnés par l’association des balades
                  solidaires.L’escale tunisienne se déroulera dans un moment particulier puisque
                  nous découvrirons la ville durant la période du ramadan. Vivre la ville pendant ce
                  moment nous montrera l’activité nocturne qui s’y déroule et nous pourrons aller
                  participer aux festivités qui accompagnent l’iftar.
                </Text>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          {/* Modal Tunis Bastia */}
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
                  Tunis- Bastia, c’est la dernière « remontée » vers le nord. On quitte la côte
                  africaine pour remonter vers Marseille. Cette navigation nous fera longer la
                  Sardaigne orientale avant de nous arrêter à Bastia. Nous découvrirons la mer
                  Tyrrhénienne qui nous approchera des côtes françaises et italiennes.
                </Text>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          {/* Modal Bastia - Marseille */}
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
                  120 km, c’est la traversée la plus courte du voyage. Le bateau chargé de souvenirs
                  et de de message, nous ferons nos derniers quarts. Cette dernière traversée nous
                  permettra de faire le point sur notre retour à Marseille que nous aurons quitté
                  cinq mois auparavant. En laissant derrière nous la mer ligurienne, nous
                  dépasserons Cannes, Hyère, Toulon avant de retrouver la cité phocéenne.
                </Text>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </View>
      </ScrollView>

      <Image
        className='rounded-md'
        source={require('../../assets/images/project_map.png')}
        style={{
          height: '40%',
          width: width,
          resizeMode: 'contain',
          margin: 0,
          backgroundColor: 'white',
        }}
      />
    </SafeAreaView>
  )
}

export default AllThemesScreen
