import { useState } from 'react'
import { View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '@components/CustomButton/CustomButton'
import { useRegisterMutation } from '../../graphql/graphql'

interface LoginScreenProps {}

const LoginScreen: React.FunctionComponent<LoginScreenProps> = ({}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [verifiedPassword, setVerifiedPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [register] = useRegisterMutation()

  const navigation = useNavigation()
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
    <View className='flex-1 items-center justify-center bg-blue-100'>
      <CustomButton buttonTitle='Go Home' onPress={goHome} />
      <CustomButton buttonTitle='Dev' onPress={goDev} />
      <View className='mt-10 '>
        <TextInput
          className='bg-red-300'
          onChangeText={(val) => setEmail(val)}
          value={email}
          placeholder='Adresse Email'
        />
        <TextInput
          className='bg-red-300'
          onChangeText={(val) => setPassword(val)}
          value={password}
          secureTextEntry={true}
          placeholder='Mot de passe'
        />
        <TextInput
          className='bg-red-300'
          onChangeText={(val) => setVerifiedPassword(val)}
          value={verifiedPassword}
          secureTextEntry={true}
          placeholder='Mot de passe'
        />
        <TextInput
          className='bg-red-300'
          onChangeText={(val) => setFirstName(val)}
          value={firstName}
          placeholder='First Name'
        />
        <TextInput
          className='bg-red-300'
          onChangeText={(val) => setLastName(val)}
          value={lastName}
          placeholder='Last Name'
        />
        <CustomButton buttonTitle='Sign-up' onPress={signUp} />

        <CustomButton buttonTitle='Sign-in' onPress={() => navigation.navigate('SignIn')} />
      </View>
    </View>
  )
}

export default LoginScreen
