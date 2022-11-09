import { useRef, useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
// import Icon from 'react-native-vector-icons/FontAwesome5'
import { FontAwesome5 } from '@expo/vector-icons'

import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  LinkIcon,
  ListBulletIcon,
  PhotoIcon,
} from 'react-native-heroicons/outline'
import { Input, Image, TextArea, Button, Text, Icon, useToast, Box } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { newPostVar } from '../../variables/newPost'
import { flexbox } from 'native-base/lib/typescript/theme/styled-system'

interface AddPostScreenProps {}

const AddPostScreen: React.FunctionComponent<AddPostScreenProps> = ({}) => {
  const richText = useRef()
  const navigation = useNavigation()

  const [descHTML, setDescHTML] = useState('')
  const [title, setTitle] = useState('')
  const [intro, setIntro] = useState('')
  const [isButtonVisible, setIsButtonVisible] = useState(true)

  const [showDescError, setShowDescError] = useState(false)
  const [image, setImage] = useState('')
  const toast = useToast()
  const id = 'test-toast'

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log('🖍🖍', result)

    if (result.cancelled) {
    }
    if (!result.cancelled) {
      setIsButtonVisible(false)
      setImage(result.uri)
    }
  }
  const richTextHandle = (descriptionText) => {
    if (
      descriptionText &&
      title &&
      title !== '' &&
      intro &&
      intro !== '' &&
      image &&
      image !== ''
    ) {
      setShowDescError(false)
      setDescHTML(descriptionText)
    } else {
      setDescHTML('')
    }
  }

  const submitContentHandle = () => {
    console.log('title.length', title.length)
    console.log('title', title)
    console.log('intro', intro)
    console.log('image', image)

    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim()
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim()
    console.log('replaceWhiteSpace', replaceWhiteSpace)
    if (
      replaceWhiteSpace.length <= 0 ||
      !title ||
      title.length === 0 ||
      (!intro && intro.length === 0) ||
      !image ||
      image.length === 0
    ) {
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: '🤔 Veuillez remplir tous les champs',
        })
      }
    } else {
      newPostVar({
        title: title,
        image: image,
        content: descHTML,
        intro: intro,
      })
      navigation.navigate('PreviewPost')
    }
  }
  return (
    <SafeAreaView className={` bg-white ${Platform.OS === 'ios' ? 'pb-0 -mt-4' : 'pb-1 -mt-1'}  `}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={`bg-white mx-3 ${Platform.OS === 'ios' ? 'pb-0 ' : 'pb-1 mt-8'}`}
      >
        <Text className='text-md color-deepBlue font-ralewayBold  mt-4 ml-3 mb-2 text-center'>
          Proposer une publication
        </Text>
        <Input
          size='xl'
          maxLength={40}
          placeholder='Titre'
          onChangeText={(val) => setTitle(val)}
          value={title}
        />
        <View className='mb-2 mt-2'>
          <TextArea
            h={20}
            size='lg'
            maxLength={150}
            placeholder='Introduction'
            w='100%'
            // fontSize='md'
            onChangeText={(val) => setIntro(val)}
            value={intro}
          />
        </View>

        {isButtonVisible && (
          <Button variant='outline' onPress={pickImage}>
            <View className='flex flex-row items-center justify-center'>
              <Text className='color-grey '>
                <PhotoIcon size='24' color='grey' />
                Sélectionnez l'image principale
              </Text>
            </View>
          </Button>
        )}
        {image && image !== '' && (
          <>
            <TouchableOpacity onPress={pickImage}>
              <Image
                className='self-center m-2 rounded-md'
                width='200'
                alt='uploaded image'
                height='100'
                resizeMode='cover'
                source={{
                  uri: image,
                }}
              />
            </TouchableOpacity>
            <Button onPress={submitContentHandle}>
              <Text className='color-white'>Prévisualiser votre publication</Text>
            </Button>
          </>
        )}
        {/* {showDescError && (
          <Text style={styles.errorTextStyle}>Veuillez remplir tous les champs 🤔</Text>
        )} */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <View style={styles.richTextContainer}>
            <RichEditor
              ref={richText}
              onChange={richTextHandle}
              placeholder='Rédigez votre publication ici ...'
              androidHardwareAccelerationDisabled={true}
              initialHeight={400}
            />
            <RichToolbar
              editor={richText}
              actions={[
                actions.undo,
                actions.redo,
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.heading1,
                actions.insertBulletsList,
                actions.insertLink,
              ]}
              iconMap={{
                [actions.undo]: ({ tintColor }) => (
                  <ArrowUturnLeftIcon size='16' color={tintColor} />
                ),
                [actions.redo]: ({ tintColor }) => (
                  <ArrowUturnRightIcon size='16' color={tintColor} />
                ),
                [actions.heading1]: ({ tintColor }) => (
                  <Text style={[{ color: tintColor, textAlign: 'center' }]}>Sous-titre</Text>
                ),
                [actions.setBold]: ({ tintColor }) => (
                  <Text style={[{ color: tintColor, fontWeight: 'bold' }]}>B</Text>
                ),
                [actions.setItalic]: ({ tintColor }) => (
                  <Text style={[{ color: tintColor, fontStyle: 'italic' }]}>i</Text>
                ),
                [actions.setUnderline]: ({ tintColor }) => (
                  <Text style={[{ color: tintColor, textDecorationLine: 'underline' }]}>U</Text>
                ),
                [actions.insertBulletsList]: ({ tintColor }) => (
                  <ListBulletIcon size='16' color={tintColor} />
                ),
                [actions.insertLink]: ({ tintColor }) => <LinkIcon size='16' color={tintColor} />,
              }}
            />
          </View>
          {/* {showDescError && (
            <Text style={styles.errorTextStyle}>Veuillez remplir tous les champs 🤔</Text>
          )} */}
          <Button onPress={submitContentHandle}>
            <Text className='color-white'>Prévisualiser votre publication</Text>
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#ccaf9b',
    padding: 20,
    alignItems: 'center',
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#312921',
    marginBottom: 10,
  },

  htmlBoxStyle: {
    height: 200,
    width: 330,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },

  richTextContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },

  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#ccaf9b',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    backgroundColor: '#c6c3b3',
    borderColor: '#c6c3b3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },

  errorTextStyle: {
    color: '#FF0000',
    marginBottom: 10,
  },

  saveButtonStyle: {
    backgroundColor: '#c6c3b3',
    borderWidth: 1,
    borderColor: '#c6c3b3',
    borderRadius: 10,
    padding: 10,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  textButtonStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#312921',
  },
})

export default AddPostScreen
