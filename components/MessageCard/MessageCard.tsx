import React, { useState, useRef } from 'react'
import { Button, Icon, View, Avatar, AlertDialog, useToast, Box } from 'native-base'
import { Text, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { userDataVar } from '../../variables/userData'
import { useReactiveVar } from '@apollo/client'
import { useDeleteMessagesMutation } from '../../graphql/graphql'

interface MessageCardProps {
  content: string
  author: Object
  isAuthor: boolean
  messageId: String
}
export const MessageCard: React.FunctionComponent<MessageCardProps> = ({
  content,
  author,
  isAuthor,
  messageId,
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

  //* Alerte de confirmation de suppression
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef(null)
  const toast = useToast()

  const userDataInApollo = useReactiveVar(userDataVar)
  const { width, height } = useWindowDimensions()
  const [deleteMessage] = useDeleteMessagesMutation()
  const navigation = useNavigation()

  const handleLongPressDeleteMessage = async () => {
    const response = await deleteMessage({
      variables: {
        messageId: messageId,
      },
    })
    onClose()
    toast.show({
      placement: 'bottom',
      render: () => {
        return (
          <Box bg='#059669' p={2} rounded='sm' mb={5}>
            <Text className='text-xs color-white  font-raleway  '>{`✅ Le message a bien été supprimé.`}</Text>
          </Box>
        )
      },
    })
    console.log('apres supp', response)
  }

  const deleteAlert = (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>
          <Text className='font-ralewayBold  text-md'>Supprimer le message</Text>
        </AlertDialog.Header>
        <AlertDialog.Body>
          <Text className='font-ralewayBold  text-xs mb-2'>
            {isAuthor
              ? `Êtes-vous sûr de vouloir supprimer votre message ?`
              : `Êtes-vous sûr de vouloir supprimer le message de ${author.firstName} ?`}
          </Text>
          {content.slice(-5) === '.gif ' ||
          content.slice(-5) === '.gif' ||
          content.slice(-4) === '.jpg' ? (
            <TouchableOpacity onPress={() => navigation.navigate('Picture', { imageUrl: content })}>
              <Image
                style={{
                  width: width * 0.6,
                  height: height * 0.3,
                  resizeMode: 'cover',
                  borderRadius: 5,
                }}
                source={{ uri: content }}
              />
            </TouchableOpacity>
          ) : (
            <Text
              className='font-raleway  text-xs'
              style={{ maxWidth: width * 0.7 }}
            >{`${content}`}</Text>
          )}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant='outline' onPress={onClose} ref={cancelRef}>
              <Text className='font-raleway text-xs color-deepBlue '>Annuler</Text>
            </Button>
            <Button colorScheme='danger' onPress={handleLongPressDeleteMessage}>
              <Text className='font-raleway  text-xs color-white'> Supprimer</Text>
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )

  if (isAuthor) {
    return (
      <TouchableOpacity
        className='flex flex-row self-end my-1  p-2 rounded-md bg-lightGreen  max-w-xs'
        onLongPress={() =>
          (userDataInApollo.status === 'crew' || userDataInApollo.status === 'dev') &&
          setIsOpen(!isOpen)
        }
      >
        {content.slice(-5) === '.gif ' ||
        content.slice(-5) === '.gif' ||
        content.slice(-4) === '.jpg' ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Picture', { imageUrl: content })}
            onLongPress={() =>
              (userDataInApollo.status === 'crew' || userDataInApollo.status === 'dev') &&
              setIsOpen(!isOpen)
            }
          >
            <Image
              style={{
                width: width * 0.6,
                height: height * 0.3,
                resizeMode: 'cover',
                borderRadius: 5,
              }}
              source={{ uri: content }}
            />
          </TouchableOpacity>
        ) : (
          <Text
            className='font-raleway  text-xs'
            style={{ maxWidth: width * 0.7 }}
          >{`${content}`}</Text>
        )}
        <TouchableOpacity
          className='flex flex-col flex-end h-full'
          onPress={() => navigation.navigate('User', { userId: author.id })}
        >
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
        </TouchableOpacity>
        {deleteAlert}
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity
      className={`flex flex-row self-start my-1  p-2 rounded-md ${
        author.status === 'crew' || author.status === 'dev' ? 'bg-lightBlue' : 'bg-clearGrey'
      } `}
      onLongPress={() =>
        (userDataInApollo.status === 'crew' || userDataInApollo.status === 'dev') &&
        setIsOpen(!isOpen)
      }
    >
      <TouchableOpacity
        className='flex flex-start'
        onPress={() => navigation.navigate('User', { userId: author.id })}
        onLongPress={() =>
          (userDataInApollo.status === 'crew' || userDataInApollo.status === 'dev') &&
          setIsOpen(!isOpen)
        }
      >
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
      </TouchableOpacity>

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
        {content.slice(-5) === '.gif ' ||
        content.slice(-5) === '.gif' ||
        content.slice(-4) === '.jpg' ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Picture', { imageUrl: content })}
            onLongPress={() =>
              (userDataInApollo.status === 'crew' || userDataInApollo.status === 'dev') &&
              setIsOpen(!isOpen)
            }
          >
            <Image
              style={{
                width: width * 0.6,
                height: height * 0.3,
                resizeMode: 'cover',
                borderRadius: 5,
              }}
              source={{ uri: content }}
            />
          </TouchableOpacity>
        ) : (
          <Text
            className='font-raleway  text-xs'
            style={{ maxWidth: width * 0.7 }}
          >{`${content}`}</Text>
        )}
      </View>
      {deleteAlert}
    </TouchableOpacity>
  )
}

export default MessageCard
