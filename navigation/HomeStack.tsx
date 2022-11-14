import { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeStackNavigatorParamList } from './types'
import { getAccessToken } from '../accessToken'

import SignUpScreen from '@screens/SignUpScreen/SignUpScreen'
import SignInScreen from '@screens/SignInScreen/SignInScreen'
import UserScreen from '@screens/UserScreen/UserScreen'
import PostScreen from '@screens/PostScreen/PostScreen'
import PreviewPostScreen from '@screens/PreviewPostScreen/PreviewPostScreen'
import NewsScreen from '@screens/NewsScreen/NewsScreen'
import AllPostsScreen from '@screens/AllPostsScreen/AllPostsScreen'
import AllNewsScreen from '@screens/AllNewsScreen/AllNewsScreen'
import PartnerScreen from '@screens/PartnerScreen/PartnerScreen'
import AddPostScreen from '@screens/AddPostScreen/AddPostScreen'
import BottomTabs from './Tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

//* DEV SCREENS
import DevScreen from '@screens/DevScreen/DevScreen'
import AllanScreen from '@screens/DevScreens/AllanScreen/AllanScreen'
import CamilleScreen from '@screens/DevScreens/CamilleScreen/CamilleScreen'
import MatthieuScreen from '@screens/DevScreens/MatthieuScreen/MatthieuScreen'
import PierreScreen from '@screens/DevScreens/PierreScreen/PierreScreen'
import AboubacarScreen from '@screens/DevScreens/AboubacarScreen/AboubacarScreen'
import MikaScreen from '@screens/DevScreens/MikaScreen/MikaScreen'
//* DEV SCREENS
const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>()
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
}

const HomeStackNavigator = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style='dark' backgroundColor='white' />

      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <HomeStack.Screen name='BottomTabs' component={BottomTabs} />
        <HomeStack.Screen
          name='AddNewPost'
          component={AddPostScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
          }}
        />
        <HomeStack.Screen name='SignIn' component={SignInScreen} />
        <HomeStack.Screen name='SignUp' component={SignUpScreen} />
        <HomeStack.Screen
          name='Post'
          component={PostScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <HomeStack.Screen
          name='AllPosts'
          component={AllPostsScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <HomeStack.Screen
          name='AllNews'
          component={AllNewsScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        <HomeStack.Screen
          name='PreviewPost'
          component={PreviewPostScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />

        <HomeStack.Screen
          name='News'
          component={NewsScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <HomeStack.Screen
          name='User'
          component={UserScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <HomeStack.Screen
          name='Partner'
          component={PartnerScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_bottom',
          }}
        />
        <HomeStack.Screen name='Dev' component={DevScreen} />
        <HomeStack.Screen name='Mika' component={MikaScreen} />
        <HomeStack.Screen name='Aboubacar' component={AboubacarScreen} />
        <HomeStack.Screen name='Pierre' component={PierreScreen} />
        <HomeStack.Screen name='Matthieu' component={MatthieuScreen} />
        <HomeStack.Screen name='Allan' component={AllanScreen} />
        <HomeStack.Screen name='Camille' component={CamilleScreen} />
      </HomeStack.Navigator>
    </SafeAreaProvider>
  )
}

export default HomeStackNavigator
