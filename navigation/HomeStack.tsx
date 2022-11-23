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
import PictureScreen from '@screens/PictureScreen/PictureScreen'
import CrewScreen from '@screens/CrewScreen/CrewScreen'
import BottomTabs from './Tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

//* DEV SCREENS
import DevScreen from '@screens/DevScreen/DevScreen'

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
        <HomeStack.Screen
          name='SignUp'
          component={SignUpScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
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
          name='Crew'
          component={CrewScreen}
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
          name='Picture'
          component={PictureScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation: 'slide_from_bottom',
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
      </HomeStack.Navigator>
    </SafeAreaProvider>
  )
}

export default HomeStackNavigator
