import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Platform,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { PencilSquareIcon, CameraIcon } from 'react-native-heroicons/outline'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import CustomAvatar from '@components/CustomAvatar/CustomAvatar'
import Toggle from '@components/Toggle/Toggle'
import {
  useGetUsersByEmailQuery,
  useUpdateUserPasswordMutation,
  useUpdateUserDataMutation,
} from '../../graphql/graphql'
import moment from 'moment'
import localization from 'moment/locale/fr'
import LoadingView from '@components/LoadingView/LoadingView'

import { useNavigation } from '@react-navigation/native'
import { useReactiveVar } from '@apollo/client'
import {
  TextArea,
  Button,
  Checkbox,
  FormControl,
  Input,
  Modal,
  useToast,
  Icon,
  Box,
} from 'native-base'

import { userDataVar } from '../../variables/userData'

import PostCard from '@components/PostCard/PostCard'

import { HomeModernIcon, ChatBubbleLeftIcon } from 'react-native-heroicons/outline'

interface EditProfileScreen2Props {}

const EditProfileScreen2: React.FunctionComponent<EditProfileScreen2Props> = (props) => {
  const navigation = useNavigation()
  const toast = useToast()
  const userDataInApollo = useReactiveVar(userDataVar)
  const [modalVisible, setModalVisible] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLanguagesModalOpen, setIsLanguagesModalOpen] = useState(false)
  const [isCityModalOpen, setIsCityModalOpen] = useState(false)
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false)

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [text, setText] = useState(data?.userEmail.bio)
  const { height, width } = useWindowDimensions()
  const languages = ['Français', 'English', 'Español', 'عربى', 'Italiano']
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [password, setPassword] = useState('')
  const [verifiedPassword, setVerifiedPassword] = useState('')
  const [show, setShow] = useState<boolean>(false)
  const [city, setCity] = useState(null)
  const [newCity, setNewCity] = useState(data?.userEmail.city)
  const [country, setCountry] = useState(null)
  const [newCountry, setNewCountry] = useState(data?.userEmail.country)
  const [updatePassword] = useUpdateUserPasswordMutation()
  const [updateAllData] = useUpdateUserDataMutation()

  // if (!data) {
  //   return <LoadingView />
  // }
  const { data, refetch } = useGetUsersByEmailQuery({
    variables: { email: props.route.params.userEmail },
  })

  useEffect(() => {
    // on set selectedLanguages avec ce qui vient du back

    console.log('data dans usefeect', data)
    const langArray = []
    if (data) {
      for (let lang of data?.userEmail.lang) {
        let langName
        if (lang == 'FR') {
          langName = 'Français'
        } else if (lang == 'EN') {
          langName = 'English'
        } else if (lang == 'IT') {
          langName = 'Italiano'
        } else if (lang == 'ES') {
          langName = 'Español'
        } else if (lang == 'AR') {
          langName = 'عربى'
        }
        langArray.push(langName)
      }
      console.log('langArray before setting state', langArray)
      setSelectedLanguages([...langArray])
      setNewCity(data?.userEmail.city)
      setNewCountry(data?.userEmail.country)
    }
  }, [data])

  //   function handleLanguageSelection(languageIndex) {
  //     console.log(
  //       'selectedLanguages on press sur la checbox ' +
  //         languageIndex +
  //         '===> ' +
  //         selectedLanguages.join('-'),
  //     )
  //     const selected = [...selectedLanguages]
  //     const language = languages[languageIndex]
  //     console.log('🔥language clické', language)
  //     if (selected.includes(language)) {
  //       setSelectedLanguages(selected.filter((l) => l !== language))
  //     } else {
  //       setSelectedLanguages([...selected, language])
  //     }
  //   }

  //   const handleLanguageSelection = (language: String) => {
  //     if (selectedLanguages.includes(language)) {
  //       setSelectedLanguages(selectedLanguages.filter((l) => l !== language))
  //     } else {
  //       setSelectedLanguages([...selectedLanguages, language])
  //     }
  //   }

  if (!data) {
    return <LoadingView />
  }
  const password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/gi
  const validatePassword = (passwd: string) => {
    if (password_pattern.test(passwd) && password === verifiedPassword) {
      //Envoi du nouveau mdp vers le back
      setIsPasswordModalOpen(false)

      return true
    }

    if (!toast.isActive(id)) {
      toast.show({
        id,
        description: ` 🤔 Mot de passe incorrect : le mot de passe doit contenir au moins 8 caractères dont 1 caractère spécial.`,
      })
    }
    return false
  }
  const validateNewCity = () => {
    setNewCity(city)
    setIsCityModalOpen(false)
  }
  const validateNewCountry = () => {
    setNewCountry(country)

    setIsCountryModalOpen(false)
  }
  const saveAllChanges = async () => {
    // envoyer text, languages, newCity, newCountry
    setIsLoading(true)
    const response = await updateAllData({
      variables: {
        UsersUpdateInput: {
          bio: text,
          city: newCity,
          country: newCountry,
          avatar: userDataInApollo.avatar,
        },
      },
    })
    if (response && response.data) {
      console.log('REPONSE', response)
      setIsPasswordModalOpen(false)
      setPassword('')
      setVerifiedPassword('')

      toast.show({
        placement: 'top',
        render: () => {
          return (
            <Box bg='#139DB8' p={2} rounded='sm' mb={5}>
              <Text className='text-sm  color-white font-ralewayBold  '>
                Vos modifications ont été enregistrées.
              </Text>
            </Box>
          )
        },
      })
      setIsLoading(false)
      navigation.navigate('Profile')
    }
    try {
    } catch (error) {
      toast.show({
        placement: 'top',
        render: () => {
          return (
            <Box bg='#139DB8' p={2} rounded='sm' mb={5}>
              <Text className='text-sm  color-white font-ralewayBold  '>Erreur</Text>
            </Box>
          )
        },
      })
      setIsLoading(false)
    }
    setIsLoading(false)
    navigation.pop()
  }

  const saveNewPassword = async () => {
    console.log('savenewpassword')
    if (validatePassword(password)) {
      const response = await updatePassword({
        variables: {
          UsersUpdateInput: {
            password,
          },
        },
      })
      if (response && response.data) {
        console.log('REPONSE', response)
        setIsPasswordModalOpen(false)
        setPassword('')
        setVerifiedPassword('')

        toast.show({
          placement: 'top',
          render: () => {
            return (
              <Box bg='#139DB8' p={2} rounded='sm' mb={5}>
                <Text className='text-sm  color-white font-ralewayBold  '>
                  Votre mot de passe a bien été modifié.
                </Text>
              </Box>
            )
          },
        })
      }
    }
  }
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScreenHeader />
      <ScrollView className='px-2' showsVerticalScrollIndicator={false}>
        <View className=' bg-white flex flex-row mb-4 mt-2 px-2'>
          {data?.userEmail.firstName && (
            <View className='w-1/2 justify-center '>
              <Text className='text-xl color-deepBlue font-ralewayBold'>
                👋 Bonjour !{'\n'}Je m'appelle{'\n'}
                {data?.userEmail.firstName}
              </Text>
              <Text className='text-sm color-grey font-raleway mb-8'>
                Membre depuis {moment(data?.userEmail.createdAt).format('MMMM YYYY')}
              </Text>
            </View>
          )}

          <Image
            onLoadEnd={() => setModalVisible(false)}
            className='rounded-full w-32 h-32'
            source={{
              uri: data?.userEmail.avatar,
            }}
          />
        </View>
        <View className={`${Platform.OS === 'ios' ? 'px-3' : 'px-2'}`}>
          {/* <View className='flex-row justify-center'>
            <Toggle isEnabled={false} />
          </View> */}
          <Text className='text-xl color-deepBlue font-ralewayBold'>
            Adresse email de connexion
          </Text>
          <Text className='text-sm color-grey font-raleway mb-8'>{data?.userEmail.email}</Text>
          <View className='flex flex-row items-start'>
            <View>
              <Text className='text-xl color-deepBlue font-ralewayBold'>Mot de passe</Text>
              <Text className='text-sm color-grey font-raleway mb-8'>********</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsPasswordModalOpen(true)
                console.log('selectedLanguages au moment de louverture du modal', selectedLanguages)
              }}
              className='flex flex-row p-1 bg-lightBlue rounded-md items-center justify-between mb-1 ml-2'
            >
              <PencilSquareIcon size='18' color={'#0C617D'} />
            </TouchableOpacity>
          </View>

          <Text className='text-xl color-deepBlue font-ralewayBold mb-2'>À propos</Text>
          <TextArea
            placeholder={
              data?.userEmail.bio ? data?.userEmail.bio : 'Parlez-nous de vous et de vos passions !'
            }
            w='100%'
            h={200}
            size='md'
            maxLength={400}
            onChangeText={(text) => setText(text)}
            value={text}
          />
          {/* <View className='flex flex-row items-center mb-6 mt-6 justify-between'> */}
          {/* <View className='flex flex-row'>
              <ChatBubbleLeftIcon size={24} color='#272E67' />
              <Text className='text-sm color-grey font-raleway ml-1'>Langues :</Text>
              {selectedLanguages.map((language, index) => {
                return (
                  <Text className='text-sm color-grey font-raleway ml-1'>{`${language} |`}</Text>
                )
              })}
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsLanguagesModalOpen(true)
                console.log('selectedLanguages au moment de louverture du modal', selectedLanguages)
              }}
              className='flex flex-row p-1 bg-lightBlue rounded-md items-center justify-between mb-1'
            >
              <PencilSquareIcon size='18' color={'#0C617D'} />
            </TouchableOpacity>
          </View> */}
          <View className='flex flex-row items-center mb-6'>
            <HomeModernIcon size={24} color='#272E67' />
            <Text className='text-sm color-grey font-raleway ml-1'>
              Ville :{newCity == null ? ` ${data?.userEmail.city}` : ` ${newCity}`}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsCityModalOpen(true)
              }}
              className='flex flex-row p-1 bg-lightBlue rounded-md items-center justify-between mb-1 ml-2'
            >
              <PencilSquareIcon size='18' color={'#0C617D'} />
            </TouchableOpacity>
            <Text className='text-sm color-grey font-raleway ml-1'>
              Pays :
              {newCountry == data?.userEmail.country
                ? `${data?.userEmail.country}`
                : `  ${newCountry}`}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsCountryModalOpen(true)
              }}
              className='flex flex-row p-1 bg-lightBlue rounded-md items-center justify-between mb-1 ml-2'
            >
              <PencilSquareIcon size='18' color={'#0C617D'} />
            </TouchableOpacity>
          </View>
          <View className='flex flex-row justify-between'>
            <Button onPressIn={() => navigation.pop()} mt='2'>
              Retour
            </Button>
            <Button onPressIn={() => saveAllChanges()} mt='2' isLoading={isLoading}>
              Enregistrer
            </Button>
          </View>
        </View>
      </ScrollView>
      {/* Languages Modal */}
      <Modal
        isOpen={isLanguagesModalOpen}
        safeAreaTop={true}
        onClose={() => setIsLanguagesModalOpen(false)}
      >
        <Modal.Content maxWidth='350'>
          <Modal.Header>
            <Text className='text-lg color-deepBlue font-ralewayBold ml-1'>Langues</Text>
          </Modal.Header>

          <Modal.Body>
            {languages.map((language) => {
              return (
                <>
                  <View className='flex flex-row my-2'>
                    <Checkbox
                      key={language}
                      value={selectedLanguages.includes(language)}
                      isChecked={selectedLanguages.includes(language)}
                      onValueChange={() => handleLanguageSelection(language)}
                      onPress={() => handleLanguageSelection(language)}
                      aria-label={`Select ${language} as a language`}
                    />
                    <Text className='ml-2'>{language}</Text>
                  </View>
                </>
              )
            })}
          </Modal.Body>
          <View className='flex flex-row justify-end mb-2 mr-2'>
            <Button onPress={() => setIsLanguagesModalOpen(false)} className='w-1/2'>
              Valider
            </Button>
          </View>
        </Modal.Content>
      </Modal>
      {/* Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        safeAreaTop={true}
        onClose={() => setIsPasswordModalOpen(false)}
      >
        <Modal.Content maxWidth='350'>
          <Modal.Header>
            <Text className='text-lg color-deepBlue font-ralewayBold ml-1'>
              Modifier le mot de passe
            </Text>
          </Modal.Header>

          <Modal.Body>
            <View
              style={{
                height: height * 0.15,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <Input
                placeholder='Nouveau mot de passe'
                size={'md'}
                onChangeText={(password) => setPassword(password)}
                value={password}
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Icon
                    as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
                    size={5}
                    mr='2'
                    color='muted.400'
                    onPress={() => setShow(!show)}
                  />
                }
              ></Input>
              <Input
                placeholder='Confirmez votre nouveau mot de passe'
                size={'md'}
                onChangeText={(verifiedPassword) => setVerifiedPassword(verifiedPassword)}
                value={verifiedPassword}
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Icon
                    as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
                    size={5}
                    mr='2'
                    color='muted.400'
                    onPress={() => setShow(!show)}
                  />
                }
              ></Input>
            </View>
          </Modal.Body>
          <View className='flex flex-row justify-between mb-2 mx-2'>
            <Button
              onPress={() => {
                setIsPasswordModalOpen(false)
                setPassword('')
                setVerifiedPassword('')
              }}
              className='w-1/3'
            >
              Annuler
            </Button>
            <Button
              onPress={() => {
                saveNewPassword()
              }}
              className='w-1/3'
            >
              Valider
            </Button>
          </View>
        </Modal.Content>
      </Modal>
      {/* <Modal
        transparent={true}
        className='flex justify-center items-center'
        visible={isLanguagesModalOpen}
        onRequestClose={() => {
          setIsLanguagesModalOpen(!isLanguagesModalOpen)
        }}
      >
        <View
          className='border-1'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.8,
            height: height * 0.5,
            backgroundColor: 'white',
          }}
        >
          <Text className='text-xl color-deepBlue font-ralewayBold'>Hello</Text>
        </View>
      </Modal> */}
      {/* City Modal */}
      <Modal isOpen={isCityModalOpen} safeAreaTop={true} onClose={() => setIsCityModalOpen(false)}>
        <Modal.Content maxWidth='350'>
          <Modal.Header>
            <Text className='text-lg color-deepBlue font-ralewayBold ml-1'>
              Modifier votre ville
            </Text>
          </Modal.Header>

          <Modal.Body>
            <View
              style={{
                height: height * 0.15,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <Input
                placeholder='Ville'
                size={'md'}
                maxLength={30}
                onChangeText={(city) => setCity(city)}
                value={city}
              ></Input>
            </View>
          </Modal.Body>
          <View className='flex flex-row justify-between mb-2 mx-2'>
            <Button
              onPress={() => {
                setIsCityModalOpen(false)
              }}
              className='w-1/3'
            >
              Annuler
            </Button>
            <Button
              onPress={() => {
                validateNewCity()
              }}
              className='w-1/3'
            >
              Valider
            </Button>
          </View>
        </Modal.Content>
      </Modal>
      {/* Country Modal */}
      <Modal
        isOpen={isCountryModalOpen}
        safeAreaTop={true}
        onClose={() => setIsCountryModalOpen(false)}
      >
        <Modal.Content maxWidth='350'>
          <Modal.Header>
            <Text className='text-lg color-deepBlue font-ralewayBold ml-1'>
              Modifier votre Pays
            </Text>
          </Modal.Header>

          <Modal.Body>
            <View
              style={{
                height: height * 0.15,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <Input
                placeholder='Pays'
                size={'md'}
                maxLength={30}
                onChangeText={(country) => setCountry(country)}
                value={country}
              ></Input>
            </View>
          </Modal.Body>
          <View className='flex flex-row justify-between mb-2 mx-2'>
            <Button
              onPress={() => {
                setIsCountryModalOpen(false)
              }}
              className='w-1/3'
            >
              Annuler
            </Button>
            <Button
              onPress={() => {
                validateNewCountry()
              }}
              className='w-1/3'
            >
              Valider
            </Button>
          </View>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  )
}

export default EditProfileScreen2
