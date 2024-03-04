import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '~/plugins/firebase.js';

export default function({ route, redirect }) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user && route.path !== '/login') {
        redirect('/login')
      }
      resolve()
    })
  })
}