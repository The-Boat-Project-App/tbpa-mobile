import { useEffect, useRef, useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  useWindowDimensions,
} from 'react-native'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'
import YoutubePlayer from 'react-native-youtube-iframe'

import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  LinkIcon,
  PencilSquareIcon,
  ListBulletIcon,
  CheckCircleIcon,
  PhotoIcon,
  EyeIcon,
  ArrowLeftCircleIcon as ArrowLeftCircleIconOutline,
  ArchiveBoxIcon,
} from 'react-native-heroicons/outline'
import {
  Input,
  Image,
  TextArea,
  Button,
  Text,
  useToast,
  IconButton,
  Modal,
  Spinner,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { newPostVar } from '../../variables/newPost'
import { flexbox } from 'native-base/lib/typescript/theme/styled-system'
import { useReactiveVar } from '@apollo/client'
import ScreenHeader from '@components/ScreenHeader/ScreenHeader'
import { markChanged } from 'immer/dist/internal'
import * as Clipboard from 'expo-clipboard'
interface AddPostScreenProps {}

const AddPostScreen: React.FunctionComponent<AddPostScreenProps> = ({}) => {
  const introRef = useRef()
  const richText = useRef()
  const navigation = useNavigation()
  const existingNewPostData = useReactiveVar(newPostVar)
  const [formProgress, setFormProgress] = useState(1)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false)
  const [postId, setPostId] = useState(existingNewPostData.id)
  const [descHTML, setDescHTML] = useState(existingNewPostData.content)
  const [title, setTitle] = useState(existingNewPostData.title)
  const [intro, setIntro] = useState(existingNewPostData.intro)
  const [video, setVideo] = useState(null)
  const [parsedVideo, setParsedVideo] = useState(existingNewPostData.video)

  const [isButtonVisible, setIsButtonVisible] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const { height, width } = useWindowDimensions()

  const [showDescError, setShowDescError] = useState(false)
  const [image, setImage] = useState(existingNewPostData.image)
  const toast = useToast()
  const youtubeRegex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm
  const id = 'error'
  const scrollViewRef = useRef(null)
  // copy youtube Link from clipboard
  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync()
    console.log('dans le presse papier', text)
    youtubeParser(text)
    setVideo(text)
  }
  useEffect(() => {
    if (video) {
      youtubeParser(video)
    }
  }, [])

  const youtubeParser = (url: string) => {
    const match = url.match(youtubeRegex)
    console.log('match', match)
    if (match) {
      const videoId = match[0].substr(match[0].length - 11)
      console.log('videoId', videoId)
      setParsedVideo(videoId)
    } else {
      return false
    }
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.6,
    })

    if (result.cancelled) {
    }
    if (!result.cancelled) {
      setIsButtonVisible(false)
      setImage(result.uri)
    }
  }
  console.log('deschtml', descHTML)

  const addImageInRichText = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.2,
    }).then((image) => {
      console.log('image', image)
      if (image.cancelled) {
        return
      }
      if (!image.cancelled) {
        setIsOpen(true)
        const data = new FormData()
        const source = {
          uri: image.uri,
          type: 'image/jpeg',
          name: 'newPic',
        }
        data.append('file', source)
        data.append('upload_preset', 'bk8ems2f')
        data.append('cloud_name', 'matthieudev')
        fetch('https://api.cloudinary.com/v1_1/matthieudev/image/upload', {
          method: 'post',
          body: data,
        })
          .then((res) => res.json())
          .then(async (data) => {
            await richText?.current?.insertImage(data.secure_url, 'style="border-radius: 50%"')

            setIsOpen(false)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }
  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false)
      setDescHTML(descriptionText)
    } else {
      setDescHTML('')
    }
  }

  const pickVideo = () => {
    setIsVideoModalOpen(true)
  }
  const submitContentHandle = () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim()
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim()
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
        intro: intro.trim(),
        video: parsedVideo,
        id: id,
      })
      navigation.navigate('PreviewPost', { postId: postId })
    }
  }
  if (formProgress == 3) {
  }
  if (formProgress === 1) {
    return (
      <SafeAreaView
        className={`flex-1 justify-around bg-white ${
          Platform.OS === 'ios' ? 'pb-0 -mt-2' : 'pb-1 mt-5'
        }  `}
      >
        <ScreenHeader arrowDirection='no-arrow' />
        <ScrollView
          className='mx-3'
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-around',
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, justifyContent: 'space-between' }}
          >
            <Text className={` text-center text-xl  color-deepBlue font-ralewayBold `}>
              Créez votre publication
            </Text>
            {/* <Text className='text-xl color-deepBlue font-ralewayBold  mt-4 ml-3 mb-2 text-center'>
            Proposer une publication
          </Text> */}
            <View className='mb-2 mt-2 flex flex-col justify-end items-end '>
              <Input
                size='lg'
                style={{ color: '#0991b2', fontWeight: 'bold', backgroundColor: 'white' }}
                maxLength={60}
                placeholder='Titre'
                placeholderTextColor='#272E67'
                onChangeText={(val) => setTitle(val)}
                value={title}
                returnKeyType='next'
                onSubmitEditing={() => introRef.current.focus()}
              />
              <View className='flex flex-row justify-center items-center mt-1'>
                {title.length > 5 && <CheckCircleIcon size='20' color='#87BC23' />}
                <Text className='font-raleway  text-xs'>{60 - title.length}/60</Text>
              </View>
            </View>
            <View className='mb-2 mt-2 flex flex-col justify-end items-end '>
              <TextArea
                style={{ color: '#0991b2', fontWeight: 'bold', backgroundColor: 'white' }}
                h={20}
                size='lg'
                ref={introRef}
                maxLength={140}
                placeholder='Introduction'
                placeholderTextColor='#272E67'
                onSubmitEditing={() => {
                  intro.trim(), Keyboard.dismiss()
                }}
                w='100%'
                // fontSize='md'
                onChangeText={(val) => setIntro(val)}
                value={intro}
              />
              <View className='flex flex-row justify-center items-center mt-1'>
                {intro.length > 60 && <CheckCircleIcon size='20' color='#87BC23' />}
                <Text className='font-raleway  text-xs'>{140 - intro.length}/140</Text>
              </View>
            </View>
            <View className='flex items-center bg-lightBlue p-2 rounded-md'>
              <Text
                className={` text-center text-lg  color-deepBlue font-ralewayBold ml-3 mb-3  ${
                  Platform.OS === 'ios' ? 'mt-1' : 'mt-1'
                }`}
              >
                Sélectionnez l'image principale
              </Text>
              {(!image || image == '') && (
                <IconButton
                  w='20%'
                  size='lg'
                  variant='solid'
                  _icon={{
                    as: FontAwesome5,
                    name: 'image',
                  }}
                  onPress={() => pickImage()}
                />
              )}
              {image && image !== '' && (
                <View className='flex flex-row bg-white rounded-md p-1'>
                  <TouchableOpacity onPress={pickImage}>
                    <Image
                      className='self-center rounded-md'
                      width={width * 0.5}
                      alt='uploaded image'
                      height={width * 0.28}
                      resizeMode='cover'
                      source={{
                        uri: image,
                      }}
                    />
                  </TouchableOpacity>
                  <Pressable
                    className='ml-3'
                    onPress={() => {
                      pickImage()
                    }}
                  >
                    <PencilSquareIcon size='24' color={'#0C617D'} />
                  </Pressable>
                </View>
              )}
            </View>
            <View className='flex items-center bg-lightBlue p-1 rounded-md'>
              <Text
                className={` text-center text-lg  color-deepBlue font-ralewayBold ml-3 mb-2  ${
                  Platform.OS === 'ios' ? 'mt-1' : 'mt-1'
                }`}
              >
                Importez une vidéo Youtube
              </Text>
              {!parsedVideo ? (
                <IconButton
                  w='20%'
                  size='lg'
                  variant='solid'
                  _icon={{
                    as: FontAwesome,
                    name: 'youtube-play',
                  }}
                  onPress={() => pickVideo()}
                />
              ) : (
                <View className='flex flex-row justify-center items-center bg-lightBlue p-2 rounded-md'>
                  <View className='flex flex-row justify-center items-center bg-white p-1 rounded-md'>
                    <YoutubePlayer
                      height={width * 0.28}
                      width={width * 0.5}
                      play={false}
                      videoId={parsedVideo}
                    />
                    <View className='flex flex-col items-between'>
                      <Pressable
                        className='ml-3 mb-16'
                        onPress={() => {
                          setIsVideoModalOpen(true)
                        }}
                      >
                        <PencilSquareIcon size='24' color={'#0C617D'} />
                      </Pressable>
                      <Pressable
                        className='ml-3'
                        onPress={() => {
                          setParsedVideo(null), setVideo(null)
                        }}
                      >
                        <ArchiveBoxIcon size='24' color={'grey'} />
                      </Pressable>
                    </View>
                  </View>
                </View>
              )}
            </View>
            {
              <View className='flex flex-row justify-end my-2'>
                <Button
                  onPress={() => {
                    Keyboard.dismiss()
                    setFormProgress(2)
                  }}
                  variant='solid'
                  className='w-1/2 mb-2'
                  isDisabled={
                    image && image !== '' && intro.length > 60 && title.length > 5 ? false : true
                  }
                >
                  <Text className='color-white font-ralewayBold'>Continuer</Text>
                </Button>
              </View>
            }
          </KeyboardAvoidingView>
        </ScrollView>
        {/* Modal to add youtube link */}
        <Modal
          isOpen={isVideoModalOpen}
          safeAreaTop={true}
          onClose={() => setIsVideoModalOpen(false)}
        >
          <Modal.Content maxWidth='350'>
            <Modal.CloseButton />
            <Modal.Header>Importez une vidéo Youtube</Modal.Header>
            <Modal.Body>
              <View
                className='bg-lightBlue flex flex-col justify-around items-center'
                style={{ height: width * 0.7 }}
              >
                <View className='flex flex-row'>
                  <IconButton
                    w='16%'
                    className='mr-3'
                    size='md'
                    variant='outline'
                    _icon={{
                      as: FontAwesome5,
                      name: 'paste',
                    }}
                    onPress={() => fetchCopiedText()}
                  />
                  <Input
                    size='lg'
                    w='70%'
                    style={{ color: '#0991b2', fontWeight: 'bold', backgroundColor: 'white' }}
                    maxLength={20}
                    placeholder='Collez votre lien Youtube ici'
                    placeholderTextColor={parsedVideo ? '#87BC23' : '#494848'}
                    onChangeText={(val) => setVideo(val)}
                    value={video}
                    returnKeyType='next'
                    // onSubmitEditing={() => introRef.current.focus()}
                  />
                  {/* <IconButton
                    w='16%'
                    className='ml-2'
                    size='md'
                    variant='outline'
                    _icon={{
                      as: FontAwesome,
                      name: 'cloud-download',
                    }}
                    onPress={() => youtubeParser(video)}
                  /> */}
                </View>
                {video && parsedVideo ? (
                  <View className='flex justify-center items-center bg-white p-2 rounded-md'>
                    <YoutubePlayer
                      height={width * 0.3}
                      width={width * 0.5}
                      play={false}
                      videoId={parsedVideo}
                    />
                  </View>
                ) : (
                  <Spinner accessibilityLabel='Loading image' />
                )}
                <Button
                  onPress={() => {
                    setIsVideoModalOpen(false)
                  }}
                  variant='solid'
                  className='w-1/2 mb-2 '
                  // isDisabled={video.length < 10 ? false : true}
                >
                  <Text className='color-white font-ralewayBold'>Enregistrer</Text>
                </Button>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </SafeAreaView>
    )
  } else if (formProgress == 2) {
    return (
      <SafeAreaView
        className={`flex-1 justify-around bg-white ${
          Platform.OS === 'ios' ? 'pb-0 -mt-2' : 'pb-1 mt-10'
        }  `}
        edges={['top', 'left', 'right']}
      >
        <View className='mt-2'>
          <TouchableOpacity
            onPress={() => setFormProgress(1)}
            className='mx-3 flex flex-row  justify-between items-center'
          >
            <ArrowLeftCircleIconOutline size='42' color='#0C617D' />

            <Button
              isLoadingText='Chargement...'
              onPress={() => {
                Keyboard.dismiss()
                submitContentHandle()
              }}
            >
              <Text className='color-white font-ralewayBold'>Prévisualiser</Text>
            </Button>
          </TouchableOpacity>
        </View>
        <View className='flex flex-row bg-lightBlue p-2 mx-3 rounded-md mt-3'>
          <TouchableOpacity onPress={pickImage}>
            <Image
              className='rounded-md'
              width='150'
              alt='uploaded image'
              height='100'
              resizeMode='cover'
              source={{
                uri: image,
              }}
            />
          </TouchableOpacity>
          <View className='ml-2' style={{ width: width / 2.05 }}>
            <Text className='color-deepBlue font-ralewayBold '>{title}</Text>
            <Text className='text-xs  color-grey font-raleway text-justify '>{intro}</Text>
          </View>
        </View>
        <View className='mx-3 mt-2'>
          <RichToolbar
            style={styles.richTextToolbarStyle}
            onPressAddImage={() => {
              addImageInRichText()
            }}
            editor={richText}
            actions={[
              actions.undo,
              actions.redo,
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
              actions.insertBulletsList,
              actions.insertLink,
              actions.keyboard,
            ]}
            iconMap={{
              [actions.undo]: ({ tintColor }) => <ArrowUturnLeftIcon size='16' color={tintColor} />,
              [actions.redo]: ({ tintColor }) => (
                <ArrowUturnRightIcon size='16' color={tintColor} />
              ),
              [actions.insertImage]: ({ tintColor }) => <PhotoIcon size='16' color={tintColor} />,
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
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd()
          }}
          showsVerticalScrollIndicator={false}
          className={`bg-white mx-3 ${Platform.OS === 'ios' ? 'pb-0 ' : 'pb-1 mt-8'}`}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 40}
          >
            <View style={styles.richTextContainer}>
              <RichEditor
                ref={richText}
                onChange={richTextHandle}
                placeholder='Rédigez votre publication ici ...'
                androidHardwareAccelerationDisabled={true}
                initialHeight={300}
                placeholderTextColor='#272E67'
                initialContentHTML={descHTML}
              />
            </View>
          </KeyboardAvoidingView>
          {/* Modal during image upload */}
          <Modal isOpen={isOpen} safeAreaTop={true}>
            <Modal.Content maxWidth='350'>
              <Modal.Body>
                <Spinner accessibilityLabel='Loading image' />
                <Text className='text-sm  color-deepBlue font-ralewayBold mt-2  my-2 text-center'>
                  Envoi de l'image en cours ...
                </Text>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    )
  }
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
    backgroundColor: 'white',
    padding: 3,
  },

  richTextEditorStyle: {
    backgroundColor: '#E4F2F5',
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
    backgroundColor: '#E4F2F5',
    borderColor: 'white',
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
