import axios from 'axios'
import history from '../history'
import { transferCart } from './cart'

const TOKEN = 'token'
const GET_TOKEN = 'GET_TOKEN'


/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'


/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
const getToken = token => ({type: GET_TOKEN, token})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  console.log(token, 'in thunk')
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    console.log(res.data, ' in thunk data')
    //dispatch(transferCart(res.data.id))
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

// export const fetchUsers = (token) => async (dispatch) => {
//   console.log(token)
//   try {
//     const res = await axios.get('/api/users', {
//       headers: {
//         authorization: token
//       }
//     })
//     dispatch(getToken(res))
//     //return res
//     //console.log(res, 'res')
//   } catch (error) {
//     throw error
//   }
// }

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
