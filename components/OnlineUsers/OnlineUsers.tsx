import { useEffect, useState } from 'react'
import { View, Image, Text, useWindowDimensions, Platform, FlatList } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { Spinner, Avatar, useToast, Box } from 'native-base'
import {
  useNewUserConnectedSubscription,
  useNewUserDisconnectedSubscription,
  useConnectToChatMutation,
  useDisconnectFromChatMutation,
} from '../../graphql/graphql'
import { useIsFocused } from '@react-navigation/native'
import { userDataVar } from '../../variables/userData'

interface OnlineUsersProps {}

const OnlineUsers: React.FunctionComponent<OnlineUsersProps> = ({}) => {
  const [usersConnected, setUsersConnected] = useState([])
  const toast = useToast()
  const { data: newUserConnectedData, loading } = useNewUserConnectedSubscription()
  const { data: newUserDisconnectedData, loading: newUserDisconnectedLoading } =
    useNewUserDisconnectedSubscription()

  const [connectToChat] = useConnectToChatMutation()

  const [disconnectFromChat] = useDisconnectFromChatMutation()

  //   if (!loading) {
  //     console.log('nouveau user connecté ! ', newUserConnectedData?.newUserConnected?.firstName)

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
                <Box bg='#139DB8' p={2} rounded='sm' mb={5}>
                  <Text className='text-sm  color-white font-ralewayBold  '>{`${newUserConnectedData?.newUserConnected?.firstName} vient de se connecter`}</Text>
                </Box>
              )
            },
          })
        setUsersConnected(newArray)
      }
    }
  }, [newUserConnectedData])

  useEffect(() => {
    console.log('newUserDisconnectedData a changé de valeur', newUserDisconnectedData)
    console.log('usersConnected juste avant le filter', usersConnected)
    const newArray = usersConnected.filter((user) => {
      console.log('user.id dans le filter', user.id)
      return user.id != newUserDisconnectedData?.newUserDisconnected.id
    })
    console.log('newArray', newArray)
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

  return (
    <View
      className={`flex items-center bg-white  mb-0 ${
        Platform.OS === 'ios' ? 'pb-0' : ''
      } pr-1 bg-white  mx-3`}
      style={{ borderBottomWidth: 1, borderBottomColor: '#bfbfbf' }}
    >
      <Text className='text-lg  color-deepBlue font-ralewayBold mt-2 ml-3 my-2'>Chat</Text>
      <View className='flex flex-row'>
        <Text className='text-md  color-deepBlue font-raleway mt-2 ml-3 '>
          {usersConnected.length > 0
            ? `${usersConnected.length} utilisateurs connectés`
            : 'Personne en ligne'}
        </Text>
        <FlatList
          // ref={chatFlatListRef}
          // onContentSizeChange={() => chatFlatListRef.current?.scrollToEnd({ animated: true })}
          className=' mx-3 mb-1'
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
            <Avatar
              className={`ml-2`}
              bg='green.500'
              alignSelf='center'
              size='sm'
              source={{
                uri: item.avatar,
              }}
            ></Avatar>
          )}
        />
      </View>

      {/* <Text>Users : {usersConnected.length ? usersConnected.join(' - ') : ''}</Text> */}
    </View>
  )
}

export default OnlineUsers
