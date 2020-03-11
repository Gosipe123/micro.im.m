import React from 'react'
import Provider from '@ant-design/react-native/lib/provider';

export const UserContext = React.createContext()

export const UPDATE_USER = "UPDATE_USER"
const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return action.userData
    default:
      return state
  }
}

export function UserProvider(props) {
  const [user, dispatch] = React.useReducer(reducer, props.data)

  React.useEffect(()=>{
    window.token = user
  },[user])

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <Provider>
        {props.children}
      </Provider>
    </UserContext.Provider>
  )
}