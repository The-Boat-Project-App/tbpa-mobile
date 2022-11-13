import { makeVar } from '@apollo/client'

export const newPostVar = makeVar({
  title: '',
  image: '',
  content: '',
  intro: '',
})
