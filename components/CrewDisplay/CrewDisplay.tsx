import React, { useState } from 'react'
import { Pressable } from 'native-base'
import { Text, ScrollView } from 'react-native'
import { CustomAvatarSmall } from '@components/CustomAvatarSmall/CustomAvatarSmall'
import { useGetAllUsersQuery } from '../../graphql/graphql'
import { userDataVar } from '../../variables/userData'
import { useReactiveVar, gql, useQuery } from '@apollo/client'

const CrewDisplay = ({ likes, postId }) => {
  const { data, refetch } = useGetAllUsersQuery()
  const userDataInApollo = useReactiveVar(userDataVar)

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='mb-3'>
      {data?.usersList.map((user, index) => {
        if (user.status === 'crew' /* && user.email !== userDataInApollo.email */) {
          return (
            <CustomAvatarSmall
              key={index}
              isConnected={false}
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
