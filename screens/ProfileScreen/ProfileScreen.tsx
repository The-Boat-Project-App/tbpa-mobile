import { Text, TouchableOpacity, View, ScrollView, Image, StyleSheet } from 'react-native'
import {
  UserIcon,
  MicrophoneIcon,
  ListBulletIcon,
  ChevronRightIcon,
  BellAlertIcon,
  MapPinIcon,
  ArrowRightOnRectangleIcon,
  CameraIcon,
} from 'react-native-heroicons/solid'

import { useNavigation, useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { deleteAccessToken, getAccessToken } from '../../accessToken'
import SignInScreen from '@screens/SignInScreen/SignInScreen'
import { useReactiveVar } from '@apollo/client'
import { accessTokenVar } from '../../variables/accessToken'
import { useScrapBoatDataMutation } from '../../graphql/graphql'
import { userDataVar } from '../../variables/userData'
import { SafeAreaView } from 'react-native-safe-area-context'
import DevController from '@components/DevController/DevController'

interface ProfileScreenProps {}

const ProfileScreen: React.FunctionComponent<ProfileScreenProps> = ({}) => {
  const isFocused = useIsFocused()
  const [userToken, setUserToken] = useState<string | null>(null)
  const navigation = useNavigation()
  const tokeninstate = useReactiveVar(accessTokenVar)
  const userDataInApollo = useReactiveVar(userDataVar)

  const emptySecureStore = async () => {
    console.log('suppression de l access token et retour à SignInScreen')
    await deleteAccessToken()
    accessTokenVar('')
    userDataVar({ firstName: '', lastName: '', avatar: '', status: '', email: '' })
    setUserToken(null)
  }

  useEffect(() => {
    const isTokenExisting = async () => {
      const myVariable = await getAccessToken()

      setUserToken(myVariable)
    }
    isTokenExisting()
    // setIsLoggedIn(checkedToken)
  }, [isFocused])

  if (!userToken) {
    return <SignInScreen />
  } else {
    return (
      <SafeAreaView className='flex-1 items-center text-center bg-white '>
        {userDataInApollo.status === 'dev' && <DevController />}
        <View className='flex-row-reverse'>
          <Image
            className='w-40 h-40 rounded-full mt-20'
            source={{
              uri: userDataInApollo.avatar,
            }}
          />
          <TouchableOpacity className='absolute mt-52'>
            <CameraIcon size={40} color={'#87BC23'} />
          </TouchableOpacity>
        </View>
        <Text className='text-center font-bold text-xl mt-5 text-gray-600'>
          {`${userDataInApollo.firstName} ${userDataInApollo.lastName}`}
        </Text>
        {userDataInApollo.status === 'crew' && (
          <Text className='text-center ' selectionColor='#0C617D'>
            Compagnon de la Méditerranée
          </Text>
        )}
        {userDataInApollo.status === 'admin' && (
          <Text className='text-center ' selectionColor='#0C617D'>
            Administrateur
          </Text>
        )}

        {userDataInApollo.status === 'dev' && (
          <Text className='text-center ' selectionColor='#0C617D'>
            Développeur 💻
          </Text>
        )}
        <TouchableOpacity>
          <Text style={styles.colorBlue} className='text-center font-bold text-xl mt-5 '>
            12
          </Text>
          <Text style={styles.colorBlue}>Publications</Text>
        </TouchableOpacity>
        <ScrollView>
          <View className='flex-row mt-10'>
            <TouchableOpacity className='items-center space-y-5 rounded-lg shadow-md  p-10 '>
              <UserIcon size={30} color={'#0C617D'} />
              <Text style={styles.colorBlue}>Éditez votre profil</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center space-y-5 rounded-lg shadow-md  p-10'>
              <MicrophoneIcon size={30} color={'#0C617D'} />
              <Text style={styles.colorBlue}>Enregistrer votre bio vocale !</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className='flex-row items-center space-x-40 shadow-md rounded-lg  p-5'>
            <View className='flex-row items-center'>
              <ListBulletIcon size={30} color={'grey'} />
              <Text> Mes activités</Text>
            </View>
            <ChevronRightIcon size={20} color={'grey'} style={styles.paddingLeft3} />
          </TouchableOpacity>

          <TouchableOpacity className='flex-row items-center space-x-40 mt-5 rounded-lg shadow-md  p-5'>
            <View className='flex-row items-center'>
              <BellAlertIcon size={30} color={'grey'} />
              <Text> Notifications</Text>
            </View>
            <ChevronRightIcon size={20} color={'grey'} style={styles.paddingLeft5} />
          </TouchableOpacity>

          <TouchableOpacity className='flex-row items-center space-x-40 mt-5 rounded-lg shadow-md  p-5'>
            <View className='flex-row items-center'>
              <MapPinIcon size={30} color={'grey'} />
              <Text> Ma localisation</Text>
            </View>
            <ChevronRightIcon size={20} color={'grey'} />
          </TouchableOpacity>

          <TouchableOpacity
            className='flex-row items-center space-x-40 mt-5 rounded-lg shadow-md  p-5 mb-5'
            onPress={() => emptySecureStore()}
          >
            <View className='flex-row items-center'>
              <ArrowRightOnRectangleIcon size={30} color={'red'} />
              <Text className='text-red-600'> Déconnexion</Text>
            </View>
            <ChevronRightIcon size={20} color={'grey'} style={styles.paddingLeft5} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  colorBlue: { color: '#0C617D' },
  paddingLeft5: { paddingLeft: 50 },
  paddingLeft3: { paddingLeft: 30 },
})

export default ProfileScreen
