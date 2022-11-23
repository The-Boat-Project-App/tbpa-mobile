import { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity, Platform, FlatList } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { useToast, Box, Spinner } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import CustomAvatarExtraSmall from '@components/CustomAvatarExtraSmall/CustomAvatarExtraSmall'

import {
  useNewUserConnectedSubscription,
  useNewUserDisconnectedSubscription,
  useConnectToChatMutation,
  useDisconnectFromChatMutation,
} from '../../graphql/graphql'
import { useIsFocused } from '@react-navigation/native'
import { userDataVar } from '../../variables/userData'
import { iteratorSymbol } from 'immer/dist/internal'

interface OnlineUsersProps {}

const OnlineUsers: React.FunctionComponent<OnlineUsersProps> = ({}) => {
  const [usersConnected, setUsersConnected] = useState([])
  const navigation = useNavigation()

  const toast = useToast()
  const { data: newUserConnectedData, loading } = useNewUserConnectedSubscription()
  const { data: newUserDisconnectedData, loading: newUserDisconnectedLoading } =
    useNewUserDisconnectedSubscription()

  const [connectToChat] = useConnectToChatMutation()

  const [disconnectFromChat] = useDisconnectFromChatMutation()

  //   if (!loading) {
  //     console.log('nouveau user connecté ! ', newUserConnectedData?.newUserConnected?.firstName)
  //
  //     // const copy = [...usersConnected, newUserConnectedData?.newUserConnected?.firstName]
  //     // setUsersConnected(copy)
  //   }
  const isFocused = useIsFocused()
  const userDataInApollo = useReactiveVar(userDataVar)

  useEffect(() => {
    if (!loading) {
      const alreadyConnected = usersConnected.some(
        (user) => user.id === newUserConnectedData?.newUserConnected.id,
      )
      if (!alreadyConnected) {
        const newArray = [...usersConnected, newUserConnectedData?.newUserConnected]

        if (newUserConnectedData?.newUserConnected.email != userDataInApollo.email)
          toast.show({
            placement: 'top',
            render: () => {
              return (
                <Box bg='#f4f4f4' p={2} rounded='sm' mb={5}>
                  <Text className='text-xs   font-raleway  '>{`👤 ${newUserConnectedData?.newUserConnected?.firstName} a rejoint le chat`}</Text>
                </Box>
              )
            },
          })
        setUsersConnected(newArray)
      }
    }
  }, [newUserConnectedData])

  useEffect(() => {
    const newArray = usersConnected.filter((user) => {
      return user.id != newUserDisconnectedData?.newUserDisconnected.id
    })

    setUsersConnected(newArray)
  }, [newUserDisconnectedData])

  useEffect(() => {
    const updateConnectionToChat = async () => {
      if (isFocused) {
        await connectToChat()
      } else {
        await disconnectFromChat()
      }
    }
    updateConnectionToChat()
  }, [isFocused])

  let usersList = (
    <FlatList
      // ref={chatFlatListRef}
      // onContentSizeChange={() => chatFlatListRef.current?.scrollToEnd({ animated: true })}
      className='py-1'
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      data={usersConnected}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={onRefresh}
      //     tintColor='#87BC23'
      //     colors={['#87BC23', '#139DB8']}
      //   />
      // }
      renderItem={({ item, index }) => (
        <CustomAvatarExtraSmall avatarPicture={item.avatar} iConnected={true} userId={item.id} />
      )}
    />
  )
  let usersCounter = (
    <View className='h-16 flex flex-row items-center justify-center'>
      <Spinner size='sm' />
    </View>
  )

  if (usersConnected.length > 1) {
    usersCounter = (
      <>
        {usersList}
        <Text className='text-md  color-deepBlue font-raleway  ml-3 w-1/4 text-right'>
          {`${usersConnected.length} utilisateurs connectés`}
        </Text>
      </>
    )
  }
  if (usersConnected.length == 1) {
    usersCounter = (
      <>
        {usersList}
        <Text className='text-md  color-deepBlue font-raleway  ml-3 '>
          {`1 utilisateur est en ligne`}
        </Text>
      </>
    )
  }

  return (
    <View
      className={`flex items-center bg-white  mb-0 ${
        Platform.OS === 'ios' ? 'pb-0' : ''
      } pr-1 bg-white  mx-3`}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#bfbfbf',
        borderTopWidth: 1,
        borderTopColor: '#bfbfbf',
      }}
    >
      <View className='flex flex-row items-center'>{usersCounter}</View>

      {/* <Text>Users : {usersConnected.length ? usersConnected.join(' - ') : ''}</Text> */}
    </View>
  )
}

export default OnlineUsers
