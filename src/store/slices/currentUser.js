import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  name: '',
  photoUrl: '',
  email: '',
  isLoggedIn: false
}

const currentUser = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action)=>{
      const { uid, email, displayName, photoURL } = action.payload
      return {
        ...state,
        id: uid,
        name: displayName,
        email,
        photoUrl: photoURL,
        isLoggedIn: true
      }
    },
    unSetUser: (state)=>{
      return{
        ...state,
        id: null,
        name: '',
        photoUrl: '',
        email: '',
        isLoggedIn: false
      }
    }
  }
}) 

export default currentUser;