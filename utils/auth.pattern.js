// Variables
const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi
const password_pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/gi

// functions

export const validateEmail = (email: string) => {
  if (email_pattern.test(email.trim().toLowerCase())) return true
  setErrorMessage('Email incorrect, verifiez bien votre email et ressayer ')
  return false
}
export const validatePassword = (password: string) => {
  if (password_pattern.test(password)) return true
  setErrorMessage(
    'Mot de passe incorrect, Votre mot de passe doit contenir au moins [8 caracteres avec au moins 1 caractere special]',
  )
  return false
}
