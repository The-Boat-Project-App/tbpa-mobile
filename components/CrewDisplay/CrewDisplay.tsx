import React, { useState } from 'react'
import { Pressable } from 'native-base'
import { Text, ScrollView } from 'react-native'
import { CustomAvatar } from '@components/CustomAvatar/CustomAvatar'
import { useGetAllUsersQuery } from '../../graphql/graphql'
import { userDataVar } from '../../variables/userData'
import { useReactiveVar, gql, useQuery } from '@apollo/client'

const CrewDisplay = ({ likes, postId }) => {
  const { data, refetch } = useGetAllUsersQuery()
  const userDataInApollo = useReactiveVar(userDataVar)

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {data?.usersList.map((user, index) => {
        if (user.status === 'crew' && user.email !== userDataInApollo.email) {
          return (
            <CustomAvatar
              key={index}
              isConnected={true}
              avatarPicture={user.avatar}
              userId={user.id}
            />
          )
        }
      })}
    </ScrollView>
  )
}

export default CrewDisplay
