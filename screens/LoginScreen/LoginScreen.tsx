import { useState } from 'react'
import { View, TextInput, StyleSheet, Dimensions, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '@components/CustomButton/CustomButton'
import { useRegisterMutation } from '../../graphql/graphql'
//Icons
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

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
  Badge,
  Button,
} from 'native-base'

interface LoginScreenProps {}

const LoginScreen: React.FunctionComponent<LoginScreenProps> = ({}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [verifiedPassword, setVerifiedPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [register] = useRegisterMutation()
  const [show, setShow] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const navigation = useNavigation()
  const handleSubmitForm = () => {
    console.log(email, password)
  }
  const goHome = () => navigation.navigate('BottomTabs')
  const goDev = () => navigation.navigate('Dev')
  const signUp = async () => {
    const response = await register({
      variables: {
        newUsersInput: {
          email,
          password,
          firstName,
          lastName,
        },
      },
    })
    console.log('response', response)
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={require('../../assets/logoTBP.png')} style={styles.logo} />
        <Center w='100%'>
          <Box safeArea w='90%' maxW='290'>
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
                Bienvenue dans chez boatProject
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
                Connectez-vous pour continuer
              </Heading>
            </Center>

            <VStack space={3} mt='5'>
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
                <Link
                  _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: 'orange.500',
                  }}
                  alignSelf='flex-end'
                  mt='1'
                >
                  Mot de passe oublié?
                </Link>
              </FormControl>
              <Button
                bg='blue.500'
                _text={{
                  fontSize: 'lg',
                  fontWeight: '500',
                }}
                onPressIn={() => handleSubmitForm()}
                mt='2'
              >
                Se connecter
              </Button>
              {errorMessage && <Text color='red.900'>{errorMessage}</Text>}
              <HStack mt='1' justifyContent='center'>
                <Text
                  fontSize='sm'
                  color='coolGray.600'
                  _dark={{
                    color: 'warmGray.200',
                  }}
                >
                  Pas encore de compte?{' '}
                </Text>
                <Link
                  onPress={() => navigation.navigate('SignUp')}
                  _text={{
                    color: 'orange.500',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                  href='#'
                >
                  Créer un compte
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </View>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: Dimensions.get('window').width * 0.1,
    paddingBottom: Dimensions.get('window').width * 0.1,
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    objectFit: 'cover',
    borderRadius: 100,
  },
})
