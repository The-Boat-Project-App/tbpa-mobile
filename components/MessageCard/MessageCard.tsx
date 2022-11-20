import React, { useState } from 'react'
import { Button, Icon, View, Avatar } from 'native-base'
import { Text } from 'react-native'

import { userDataVar } from '../../variables/userData'
import { useReactiveVar } from '@apollo/client'

interface MessageCardProps {
  content: string
  author: Object
  isAuthor: boolean
}
export const MessageCard: React.FunctionComponent<MessageCardProps> = ({
  content,
  author,
  isAuthor,
}) => {
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
  const userDataInApollo = useReactiveVar(userDataVar)

  if (isAuthor) {
    return (
      <View className='flex flex-row self-end justify-end my-1 items-center bg-lightGreen p-2 rounded-md max-w-xs'>
        <Text className='font-raleway max-w-3/4 max-w-max break-normal w-1/2'>{`${content}`}</Text>
        <View className='flex flex-col flex-end h-full'>
          <Avatar
            className='ml-2'
            bg='green.500'
            alignSelf='center'
            size='sm'
            source={{
              uri: author.avatar,
            }}
          >
            AJ
          </Avatar>
        </View>
      </View>
    )
  }
  return (
    <View
      className={`flex flex-row self-start my-1  p-2 rounded-md ${
        author.status === 'crew' || author.status === 'dev' ? 'bg-lightBlue' : 'bg-clearGrey'
      } `}
    >
      <View className='flex flex-start'>
        <Avatar
          className='mr-2'
          bg='green.500'
          alignSelf='center'
          size='sm'
          source={{
            uri: author.avatar,
          }}
        >
          AJ
        </Avatar>
      </View>

      <View className='mx-1'>
        <Text
          className={`text-sm  ${
            author.status === 'crew' || author.status === 'dev'
              ? ' color-deepBlue font-ralewayBold'
              : 'font-raleway'
          } `}
        >
          {author.firstName}
        </Text>
        <Text className={`font-raleway `}>{content}</Text>
      </View>
    </View>
  )
}

export default MessageCard
