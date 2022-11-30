import React, { useState } from 'react'
import { Button, Icon, Pressable } from 'native-base'
import { Platform } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useAddLikesMutation } from '../../graphql/graphql'

const Applause = ({ likes, postId }) => {
  const [addLikes] = useAddLikesMutation()
  const [likesDisplay, setLikesDisplay] = useState(likes)
  const applause = async () => {
    const response = await addLikes({
      variables: {
        id: postId,
      },
    })
    if (response && response.data) {
      setLikesDisplay(Number(response.data.addLikes))
    }
  }
  return (
    <Pressable
      className={`${
        Platform.OS === 'ios' ? 'bottom-10' : 'bottom-6'
      } flex-column justify-center align-center absolute   right-8 rounded-full bg-white  p-2 border-green shadow shadow-deepBlue`}
      onPress={applause}
    >
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <>
            <MaterialCommunityIcons
              name='hand-clap'
              color={isPressed ? '#74a318' : '#87BC23'}
              size={40}
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.92 : 1,
                  },
                  { rotate: isPressed ? '10deg' : '0deg' },
                ],
              }}
            />
          </>
        )
      }}
    </Pressable>
  )
}

export default Applause
