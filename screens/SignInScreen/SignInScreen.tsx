import { useState, useRef } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '@components/CustomButton/CustomButton'
import { useLoginMutation } from '../../graphql/graphql'
import { useRegisterMutation } from '../../graphql/graphql'

import { setAccessToken } from '../../accessToken'
import { accessTokenVar } from '../../variables/accessToken'
import { userDataVar } from '../../variables/userData'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
// Native Base
import {
  Input,
  Icon,
  Center,
  Box,
  VStack,
  FormControl,
  Link,
  HStack,
  Text,
  ScrollView,
  Button,
  useToast,
} from 'native-base'

interface SignInScreenProps {}

const SignInScreen: React.FunctionComponent<SignInScreenProps> = ({}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { height, width } = useWindowDimensions()
  const toast = useToast()
  const id = 'error'

  const [login] = useLoginMutation()

  const navigation = useNavigation()

  const signIn = async () => {
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

  // Variables
  const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi
  const password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/gi

  // functions
  const validateEmail = (email: string) => {
    if (email_pattern.test(email.trim().toLowerCase())) return true
    setErrorMessage('Email incorrect, verifiez bien votre email et ressayer ')
    return false
  }

  const goSignUp = () => navigation.navigate('SignUp')
  const emailRef = useRef()
  const passwordRef = useRef()
  const scrollRef = useRef()

  return (
    <View
      className='text-xl  color-deepBlue font-ralewayBold'
      style={{ backgroundColor: '#fff', height: '100%' }}
    >
      <ScrollView ref={scrollRef}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/logoTBP.png')}
            className='w-4'
            style={{ width: width * 0.5, height: width * 0.2, resizeMode: 'contain' }}
          />
          <Center w='100%'>
            <Box safeArea w='90%' maxW='290'>
              <Center>
                <Text className='text-xl  color-deepBlue font-ralewayBold  mt-2  text-center'>
                  Se connecter
                </Text>

                <Text className='text-sm  color-deepBlue font-raleway  ml-3 my-4 text-center'>
                  Connectez-vous pour utiliser toutes les fonctionnalités de l'application et
                  intéragir avec les Compagnons de la Méditerranée.
                </Text>
              </Center>

              <VStack space={3} mt='5'>
                <FormControl>
                  <Input
                    autoCapitalize='none'
                    value={email}
                    placeholder='E-mail'
                    returnKeyType='next'
                    onSubmitEditing={() => passwordRef.current.focus()}
                    style={{ color: '#0991b2', fontWeight: 'bold', fontFamily: 'Open-Sans' }}
                    onChangeText={(text) => setEmail(text)}
                    size='lg'
                    InputLeftElement={
                      <Icon as={<Ionicons name='mail' />} size={5} ml='2' color='muted.400' />
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    value={password}
                    style={{ color: '#0991b2', fontWeight: 'bold', fontFamily: 'Open-Sans' }}
                    placeholder='Mot de passe'
                    onChangeText={(password) => setPassword(password)}
                    size='lg'
                    ref={passwordRef}
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
                  />
                  <Link alignSelf='flex-end' mt='2'>
                    <Text className='text-xs  color-deepBlue font-raleway  ml-3 '>
                      Mot de passe oublié ?
                    </Text>
                  </Link>
                </FormControl>
                <Button onPressIn={() => signIn()} mt='2' isLoading={isLoading}>
                  <Text className='color-white font-ralewayBold'>Se connecter</Text>
                </Button>
                {errorMessage && (
                  <Text style={{ textAlign: 'center' }} color='red.900'>
                    {errorMessage}
                  </Text>
                )}
                <HStack mt='6' justifyContent='center'>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className='flex'>
                    <Text className='text-sm  color-deepBlue font-raleway text-center  '>
                      Pas encore inscrit ?
                    </Text>
                    <Text className='text-sm  color-deepBlue   font-ralewayBold  text-center'>
                      Créer un compte
                    </Text>
                  </TouchableOpacity>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </View>
      </ScrollView>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: Dimensions.get('window').width * 0.1,
    paddingBottom: Dimensions.get('window').width * 0.1,
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: "center",
  },
})
