import { useState, useRef } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native'
import { useReactiveVar } from '@apollo/client'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '@components/CustomButton/CustomButton'
import { useRegisterMutation } from '../../graphql/graphql'
import { setAccessToken } from '../../accessToken'
import { accessTokenVar } from '../../variables/accessToken'
import { userDataVar } from '../../variables/userData'
// Native Base
import {
  NativeBaseProvider,
  Input,
  Stack,
  Icon,
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Link,
  HStack,
  Text,
  ScrollView,
  Modal,
  Button,
  useToast,
} from 'native-base'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

interface SignUpScreenProps {}

const SignUpScreen: React.FunctionComponent<SignUpScreenProps> = ({}) => {
  const { height, width } = useWindowDimensions()
  const toast = useToast()
  const id = 'error'
  const [email, setEmail] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [verifiedPassword, setVerifiedPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [register] = useRegisterMutation()

  const navigation = useNavigation()
  const goHome = () => navigation.navigate('BottomTabs')
  const goDev = () => navigation.navigate('Dev')
  // Variables
  const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi
  const password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/gi

  const validateEmail = (email: string) => {
    if (email_pattern.test(email.trim().toLowerCase())) return true
    if (!toast.isActive(id)) {
      toast.show({
        id,
        description: ` 🤔 L'email est incorrect.`,
      })
    }
    return false
  }

  const validatePassword = (passwd: string) => {
    if (password_pattern.test(passwd) && password === verifiedPassword) return true

    if (!toast.isActive(id)) {
      toast.show({
        id,
        description: ` 🤔 Mot de passe incorrect : le mot de passe doit contenir au moins 8 caractères dont 1 caractère spécial.`,
      })
    }
    return false
  }
  const signUp = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsLoading(true)

      const response = await register({
        variables: {
          newUsersInput: {
            email,
            password,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
          },
        },
      })
      if (response && response.data) {
        console.log('REPONSE', response)
        setAccessToken(
          response.data.createUsers.accessToken,
          response.data.createUsers.refreshToken,
        )
        accessTokenVar(response.data.createUsers.accessToken)
        userDataVar({
          firstName: response.data.createUsers.firstName,
          lastName: response.data.createUsers.lastName,
          avatar: response.data.createUsers.avatar,
          status: response.data.createUsers.status,
          email: response.data.createUsers.email,
        })
        setIsLoading(false)

        toast.show({
          placement: 'bottom',
          render: () => {
            return (
              <Box bg='#139DB8' p={2} rounded='sm' mb={5}>
                <Text className='text-sm  color-white font-ralewayBold  '>{`👋 Bienvenue ${response.data?.createUsers.firstName}`}</Text>
              </Box>
            )
          },
        })
        navigation.navigate('BottomTabs')
      }
    }
  }
  // references to jump from one input to another
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const verifiedPasswordRef = useRef()
  const scrollRef = useRef()

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScreenHeader arrowDirection='left' />

      <ScrollView ref={scrollRef}>
        <Text className='text-xl  color-deepBlue font-ralewayBold  ml-3  text-center'>
          Créer un compte
        </Text>
        <KeyboardAvoidingView
          // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          behavior='padding'
        >
          <Center w='100%'>
            <Box safeArea w='90%' maxWidth='290'>
              <Center>
                <Text className='text-sm  color-deepBlue font-raleway  ml-3 my-4 text-center'>
                  Inscrivez-vous pour utiliser toutes les fonctionnalités de l'application et
                  intéragir avec les Compagnons de la Méditerranée.
                </Text>
              </Center>
              <VStack space={3} mt='5'>
                <FormControl>
                  <Input
                    spellCheck={false}
                    style={{ color: '#0991b2', fontWeight: 'bold', fontFamily: 'Open-Sans' }}
                    autoCorrect={false}
                    value={firstName}
                    onFocus={() =>
                      scrollRef.current?.scrollTo({
                        y: 50,
                        animated: true,
                      })
                    }
                    placeholder='Prénom*'
                    onChangeText={(text) => setFirstName(text)}
                    returnKeyType='next'
                    onSubmitEditing={() => lastNameRef.current.focus()}
                    blurOnSubmit={false}
                    size='lg'
                    InputLeftElement={
                      <Icon as={<Ionicons name='person' />} size={5} ml='2' color='muted.400' />
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    spellCheck={false}
                    style={{ color: '#0991b2', fontWeight: 'bold' }}
                    autoCorrect={false}
                    value={lastName}
                    onFocus={() =>
                      scrollRef.current?.scrollTo({
                        y: 100,
                        animated: true,
                      })
                    }
                    ref={lastNameRef}
                    onSubmitEditing={() => emailRef.current.focus()}
                    placeholder='Nom*'
                    onChangeText={(text) => setLastName(text)}
                    size='lg'
                    InputLeftElement={
                      <Icon as={<Ionicons name='person' />} size={5} ml='2' color='muted.400' />
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    spellCheck={false}
                    style={{ color: '#0991b2', fontWeight: 'bold', fontFamily: 'Open-Sans' }}
                    autoCorrect={false}
                    onFocus={() =>
                      scrollRef.current?.scrollTo({
                        y: 150,
                        animated: true,
                      })
                    }
                    value={email}
                    autoCapitalize='none'
                    ref={emailRef}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    placeholder='E-mail*'
                    onChangeText={(text) => setEmail(text)}
                    size='lg'
                    InputLeftElement={
                      <Icon as={<Ionicons name='mail' />} size={5} ml='2' color='muted.400' />
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    spellCheck={false}
                    style={{ color: '#0991b2', fontWeight: 'bold', fontFamily: 'Open-Sans' }}
                    autoCorrect={false}
                    onFocus={() =>
                      scrollRef.current?.scrollTo({
                        y: 200,
                        animated: true,
                      })
                    }
                    value={password}
                    ref={passwordRef}
                    onSubmitEditing={() => verifiedPasswordRef.current.focus()}
                    placeholder='Mot de passe*'
                    onChangeText={(password) => setPassword(password)}
                    size='lg'
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
                </FormControl>
                <FormControl>
                  <Input
                    spellCheck={false}
                    style={{ color: '#0991b2', fontWeight: 'bold', fontFamily: 'Open-Sans' }}
                    autoCorrect={false}
                    value={verifiedPassword}
                    ref={verifiedPasswordRef}
                    onSubmitEditing={() => {
                      Keyboard.dismiss()
                      scrollRef.current?.scrollTo({
                        y: 0,
                        animated: true,
                      })
                    }}
                    placeholder='Confirmer le mot de passe*'
                    onChangeText={(password) => setVerifiedPassword(password)}
                    size='lg'
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
                </FormControl>
                <Button onPressIn={() => signUp()} mt='4' isLoading={isLoading}>
                  <Text className='color-white font-ralewayBold'>S'inscrire</Text>
                </Button>
                {errorMessage && <Text color='red.900'>{errorMessage}</Text>}
                <HStack mt='6' mb='6' justifyContent='center'>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    className='flex flex-row'
                  >
                    <Text className='text-sm  color-deepBlue font-raleway  ml-3 '>
                      Déjà inscrit ?
                    </Text>
                    <Text className='text-sm  color-deepBlue   ml-2 font-ralewayBold '>
                      Se connecter
                    </Text>
                  </TouchableOpacity>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 10,
    width: '95%',
    height: 80,
    backgroundSize: 'cover',
  },
})

export default SignUpScreen
