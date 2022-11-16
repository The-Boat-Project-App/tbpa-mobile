import { useState } from 'react'
import { View, TextInput, StyleSheet, Image } from 'react-native'
import { useReactiveVar } from '@apollo/client'

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
} from 'native-base'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

interface SignUpScreenProps {}

const SignUpScreen: React.FunctionComponent<SignUpScreenProps> = ({}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [verifiedPassword, setVerifiedPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const [register] = useRegisterMutation()

  const navigation = useNavigation()
  const goHome = () => navigation.navigate('BottomTabs')
  const goDev = () => navigation.navigate('Dev')

  const signUp = async () => {
    if (validateEmail(email) && validatePassword(password)) {
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

        navigation.navigate('BottomTabs')
      }
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
  const validatePassword = (password: string) => {
    if (password_pattern.test(password)) return true
    setErrorMessage(
      'Mot de passe incorrect, Votre mot de passe doit contenir au moins [8 caracteres avec au moins 1 caractere special]',
    )
    return false
  }
  return (
    <View
      className='text-xl  color-deepBlue font-ralewayBold
      '
      style={{ backgroundColor: '#fff', height: '100%' }}
    >
      <ScrollView>
        <View style={styles.container}>
          <Image source={require('../../assets/logoTBP.png')} style={styles.logo} />
          <Center w='100%'>
            <Box safeArea w='90%' maxWidth='290'>
              <Center>
                <Heading
                  size='lg'
                  fontWeight='600'
                  color='coolGray.800'
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  textAlign='center'
                >
                  Bienvenue Boat Project
                </Heading>
                <Heading
                  mt='1'
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  color='coolGray.600'
                  fontWeight='medium'
                  size='xs'
                >
                  Inscrivez-vous pour continuer
                </Heading>
              </Center>
              <VStack space={3} mt='5'>
                <FormControl>
                  <FormControl.Label>Prenom</FormControl.Label>
                  <Input
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                    size='2xl'
                    InputLeftElement={
                      <Icon as={<Ionicons name='person' />} size={5} ml='2' color='muted.400' />
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Nom</FormControl.Label>
                  <Input
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                    size='2xl'
                    InputLeftElement={
                      <Icon as={<Ionicons name='person' />} size={5} ml='2' color='muted.400' />
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    size='2xl'
                    InputLeftElement={
                      <Icon as={<Ionicons name='mail' />} size={5} ml='2' color='muted.400' />
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Mot de passe</FormControl.Label>
                  <Input
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    size='2xl'
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
                  <FormControl.Label>Confirmer le mot de passe</FormControl.Label>
                  <Input
                    value={verifiedPassword}
                    onChangeText={(password) => setVerifiedPassword(password)}
                    size='2xl'
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
                <Button
                  onPressIn={() => signUp()}
                  mt='2'
                  bg='blue.500'
                  _text={{
                    fontSize: 'lg',
                    fontWeight: '500',
                  }}
                >
                  Creer mon compte
                </Button>
                {errorMessage && <Text color='red.900'>{errorMessage}</Text>}
                <HStack mt='6' mb='6' justifyContent='center'>
                  <Text
                    fontSize='sm'
                    color='coolGray.600'
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    J'ai dejà un compte?{' '}
                  </Text>
                  <Link
                    onPress={() => navigation.navigate('Profile')}
                    _text={{
                      color: 'blue.800',
                      fontWeight: 'medium',
                      fontSize: 'sm',
                    }}
                    href='#'
                  >
                    Se connecter
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: "center",
  },
  logo: {
    marginTop: 10,
    width: '95%',
    height: 80,
    backgroundSize: 'cover',
  },
})

export default SignUpScreen
