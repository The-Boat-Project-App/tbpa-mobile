import { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackNavigatorParamList } from './types'
import { getAccessToken } from '../accessToken'

import SignUpScreen from '@screens/SignUpScreen/SignUpScreen'
import SignInScreen from '@screens/SignInScreen/SignInScreen'
import UserScreen from '@screens/UserScreen/UserScreen'
import MyUserScreen from '@screens/MyUserScreen/MyUserScreen'
import EditProfileScreen2 from '@screens/EditProfileScreen2/EditProfileScreen2'
import PostScreen from '@screens/PostScreen/PostScreen'
import PreviewPostScreen from '@screens/PreviewPostScreen/PreviewPostScreen'
import NewsScreen from '@screens/NewsScreen/NewsScreen'
import AllPostsScreen from '@screens/AllPostsScreen/AllPostsScreen'
import AllNewsScreen from '@screens/AllNewsScreen/AllNewsScreen'
import PartnerScreen from '@screens/PartnerScreen/PartnerScreen'
import AddPostScreen from '@screens/AddPostScreen/AddPostScreen'
import PictureScreen from '@screens/PictureScreen/PictureScreen'
import AllThemesScreen from '@screens/AllThemes/AllThemes'
import PartnersScreen from '@screens/PartnersScreen/PartnersScreen'
import CrewScreen from '@screens/CrewScreen/CrewScreen'
import ProjectDescriptionScreen from '@screens/ProjectDescriptionScreen/ProjectDescriptionScreen'
import BottomTabs from './Tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

//* DEV SCREENS
import DevScreen from '@screens/DevScreen/DevScreen'
import OnboardingScreen from '@screens/OnboardingScreen/OnboardingScreen'

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
        <HomeStack.Screen
          name='Onboarding'
          component={OnboardingScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <HomeStack.Screen name='BottomTabs' component={BottomTabs} />
        <HomeStack.Screen
          name='ProjectDescription'
          component={ProjectDescriptionScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <HomeStack.Screen name='AddNewPost' component={AddPostScreen} />
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
          name='Partners'
          component={PartnersScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <HomeStack.Screen
          name='AllThemes'
          component={AllThemesScreen}
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
          name='MyUser'
          component={MyUserScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <HomeStack.Screen
          name='EditProfile'
          component={EditProfileScreen2}
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
