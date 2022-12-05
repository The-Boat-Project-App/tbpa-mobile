import { Text, TouchableOpacity, View, ScrollView, Image, StyleSheet } from 'react-native'
import {
  UserIcon,
  MicrophoneIcon,
  ListBulletIcon,
  ChevronRightIcon,
  BellAlertIcon,
  MapPinIcon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon,
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
  }, [isFocused, userDataInApollo.firstName])

  if (!userToken) {
    return <SignInScreen />
  } else {
    return (
      <SafeAreaView className='flex-1  bg-white '>
        {userDataInApollo.status === 'dev' && <DevController />}
        <ScrollView className='mx-3' horizontal={false} showsVerticalScrollIndicator={false}>
          <View className='flex flex-col items-center'>
            <Image
              className='w-40 h-40 rounded-full mt-16'
              source={{
                uri: userDataInApollo.avatar,
              }}
            />

            <Text className='text-center font-ralewayBold text-xl mt-5 text-deepBlue'>
              {`${userDataInApollo.firstName} ${userDataInApollo.lastName}`}
            </Text>
            {userDataInApollo.status === 'crew' && (
              <Text className='text-center font-ralewayBold text-clearBlue'>
                Compagnon de la Méditerranée
              </Text>
            )}
            {userDataInApollo.status === 'admin' && (
              <Text className='text-center font-ralewayBold text-clearBlue'>Administrateur</Text>
            )}

            {userDataInApollo.status === 'dev' && (
              <Text className='text-center font-ralewayBold text-clearBlue'>Développeur 💻</Text>
            )}
          </View>

          <View className='flex-row justify-around rounded-lg mt-10 mb-10'>
            <TouchableOpacity className='items-center space-y-4 p-4'>
              <UserIcon size={30} color={'#0C617D'} />
              <Text className='text-center font-ralewayBold text-mainBlue'>Mon profil public</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center space-y-4 p-4  '>
              <PencilSquareIcon size={30} color={'#0C617D'} />
              <Text className='text-center font-ralewayBold text-mainBlue'>Éditer mon profil</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className='flex-row items-center justify-between space-x-40 mt-5  rounded-lg shadow-md  p-2 mb-5 '>
            <View className='flex-row items-center'>
              <ListBulletIcon size={30} color={'#0C617D'} />
              <Text className='text-center font-ralewayBold ml-3 text-mainBlue'>
                Mes publications
              </Text>
            </View>
            <ChevronRightIcon size={20} color={'grey'} />
          </TouchableOpacity>

          <TouchableOpacity
            className='flex-row items-center space-x-40 mt-5 justify-between shadow-md  p-2 mb-5  '
            onPress={() => emptySecureStore()}
          >
            <View className='flex-row items-center '>
              <ArrowRightOnRectangleIcon size={30} color={'red'} />
              <Text className='text-center font-ralewayBold  ml-3' style={{ color: 'red' }}>
                Déconnexion
              </Text>
            </View>
            <ChevronRightIcon size={20} color={'red'} />
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
