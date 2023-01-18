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

import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import CustomAvatar from '@components/CustomAvatar/CustomAvatar'
import Toggle from '@components/Toggle/Toggle'
import { useGetUsersByEmailQuery } from '../../graphql/graphql'
import moment from 'moment'
import localization from 'moment/locale/fr'
import LoadingView from '@components/LoadingView/LoadingView'

import { useNavigation } from '@react-navigation/native'
import { useReactiveVar } from '@apollo/client'
import { TextArea, Button, Checkbox, FormControl, Input, Modal } from 'native-base'

import { userDataVar } from '../../variables/userData'

import PostCard from '@components/PostCard/PostCard'

import { HomeModernIcon, ChatBubbleLeftIcon } from 'react-native-heroicons/outline'

interface EditProfileScreenProps {}

const EditProfileScreen: React.FunctionComponent<EditProfileScreenProps> = (props) => {
  const navigation = useNavigation()
  const userDataInApollo = useReactiveVar(userDataVar)
  const [modalVisible, setModalVisible] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userBio, setUserBio] = useState(data?.userEmail.bio)
  const [isLanguagesModalOpen, setIsLanguagesModalOpen] = useState(false)
  const [isFrenchSelected, setIsFrenchSelected] = useState(false)
  const [isEnglishSelected, setIsEnglishSelected] = useState(false)
  const [isSpanishSelected, setIsSpanishSelected] = useState(false)
  const [isArabicSelected, setIsArabicSelected] = useState(false)
  const [isItalianSelected, setIsItalianSelected] = useState(false)

  const { height, width } = useWindowDimensions()

  // if (!data) {
  //   return <LoadingView />
  // }
  const { data, refetch } = useGetUsersByEmailQuery({
    variables: { email: props.route.params.userEmail },
  })
  const availableLanguages = [
    { symbol: 'FR', fullName: 'Français' },
    { symbol: 'EN', fullName: 'English' },
    { symbol: 'SP', fullName: 'Español' },
    { symbol: 'AR', fullName: 'عربى' },
    { symbol: 'IT', fullName: 'Italiano' },
  ]
  useEffect(() => {
    if (data) {
      for (let language of availableLanguages) {
        if (data?.userEmail.lang.includes(language.symbol)) {
          if (language.symbol == 'FR') {
            setIsFrenchSelected(true)
          } else if (language.symbol == 'EN') {
            setIsEnglishSelected(true)
          } else if (language.symbol == 'SP') {
            setIsSpanishSelected(true)
          } else if (language.symbol == 'AR') {
            setIsArabicSelected(true)
          } else if (language.symbol == 'IT') {
            setIsItalianSelected(true)
          }
        }
      }
    }
  }, [])

  const saveData = async () => {
    setIsLoading(true)
    try {
      if (validateEmail(email)) {
        const response = await login({
          variables: {
            UsersLoginInput: {
              email: email.trim().toLowerCase(),
              password,
            },
          },
        })

        if (response && response.data) {
          setAccessToken(
            response.data.loginUsers.accessToken,
            response.data.loginUsers.refreshToken,
          )
          accessTokenVar(response.data.loginUsers.accessToken)
          userDataVar({
            firstName: response.data.loginUsers.firstName,
            lastName: response.data.loginUsers.lastName,
            avatar: response.data.loginUsers.avatar,
            email: response.data.loginUsers.email,
            status: response.data.loginUsers.status,
          })
          setIsLoading(false)

          toast.show({
            placement: 'bottom',
            render: () => {
              return (
                <Box bg='#139DB8' p={2} rounded='sm' mb={5}>
                  <Text className='text-sm  color-white font-ralewayBold  '>{`👋 Bienvenue ${response.data?.loginUsers.firstName}`}</Text>
                </Box>
              )
            },
          })
          navigation.navigate('BottomTabs', { screen: 'Profile' })
        }
      }
    } catch (error) {
      if (!toast.isActive(id)) {
        toast.show({
          id,
          description: ` 🤔 E-mail ou mot de passe incorrect`,
        })
      }
      setIsLoading(false)

      // setErrorMessage('Votre e-mail ou mot de passe incorrect')
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
          <Text className='text-xl color-deepBlue font-ralewayBold mb-2'>À propos</Text>
          <TextArea h={20} placeholder={data?.userEmail.bio} w='100%' h='200px' />
          <View className='flex flex-row items-center mb-6 mt-6 justify-between'>
            <ChatBubbleLeftIcon size={24} color='#272E67' />
            <Text className='text-sm color-grey font-raleway ml-1'>Langues :</Text>
            {availableLanguages.map((language, index) => {
              let formattedLanguage = ''
              if (language === 'FR') {
                formattedLanguage = 'Français'
              }
              if (language === 'EN') {
                formattedLanguage = 'English'
              }
              if (language === 'ES') {
                formattedLanguage = 'Español'
              }
              if (language === 'AR') {
                formattedLanguage = 'عربى'
              }

              if (language === 'IT') {
                formattedLanguage = 'Italiano'
              }

              return (
                <Text className='text-sm color-grey font-raleway ml-1'>{`${formattedLanguage} |`}</Text>
              )
            })}
            <TouchableOpacity
              onPress={() => setIsLanguagesModalOpen(true)}
              className='flex flex-row p-1 bg-lightBlue rounded-md items-center justify-between mb-1'
            >
              <PencilSquareIcon size='18' color={'#0C617D'} />
            </TouchableOpacity>
          </View>
          <View className='flex flex-row items-center mb-6'>
            <HomeModernIcon size={24} color='#272E67' />
            <Text className='text-sm color-grey font-raleway ml-1'>
              Vient de :{' '}
              {data?.userEmail.city != null && data?.userEmail.country != null
                ? `${data?.userEmail.city}, ${data?.userEmail.country}`
                : ''}
            </Text>
          </View>
          <Button onPressIn={() => saveData()} mt='2' isLoading={isLoading}>
            Enregistrer
          </Button>
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
            {availableLanguages.map((language, index) => {
              if (data?.userEmail.lang.includes(language.symbol)) {
                return (
                  <Checkbox isChecked colorScheme='green' className='mb-2'>
                    <Text className='text-sm color-grey font-raleway ml-1'>
                      {language.fullName}
                    </Text>
                  </Checkbox>
                )
              } else {
                return (
                  <Checkbox isChecked={false} colorScheme='green' className='mb-2'>
                    <Text className='text-sm color-grey font-raleway ml-1'>
                      {language.fullName}
                    </Text>
                  </Checkbox>
                )
              }
              let formattedLanguage = ''
              if (language === 'FR') {
                formattedLanguage = 'Français'
              }
              if (language === 'EN') {
                formattedLanguage = 'English'
              }
              if (language === 'ES') {
                formattedLanguage = 'Español'
              }
              if (language === 'AR') {
                formattedLanguage = 'عربى'
              }

              if (language === 'IT') {
                formattedLanguage = 'Italiano'
              }
            })}
          </Modal.Body>
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
    </SafeAreaView>
  )
}

export default EditProfileScreen
