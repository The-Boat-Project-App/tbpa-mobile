import { makeVar } from '@apollo/client'

export const newPostVar = makeVar({
  id: null,
  title: '',
  image: '',
  content: '',
  intro: '',
  video: null,
})
