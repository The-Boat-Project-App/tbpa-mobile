import React, { useState } from 'react'
import { Button, Icon, View, Avatar } from 'native-base'
import { Text } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useAddLikesMutation } from '../../graphql/graphql'
interface MessageCardProps {
  content: string
  author: Object
}
export const MessageCard: React.FunctionComponent<MessageCardProps> = ({ content, author }) => {
  //   const [addLikes] = useAddLikesMutation()
  //   const [likesDisplay, setLikesDisplay] = useState(likes)
  //   const applause = async () => {
  //     const response = await addLikes({
  //       variables: {
  //         id: postId,
  //       },
  //     })
  //     if (response && response.data) {
  //       setLikesDisplay(Number(response.data.addLikes))
  //     }
  //   }

  return (
    <View className='flex flex-row my-1 items-center'>
      <Avatar
        bg='green.500'
        alignSelf='center'
        size='sm'
        source={{
          uri: author.avatar,
        }}
      >
        AJ
      </Avatar>
      <Text>{`${author.firstName}: ${content}`}</Text>
    </View>
  )
}

export default MessageCard
