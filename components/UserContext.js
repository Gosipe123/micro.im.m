import React from 'react'

export const UserContext = React.createContext()

export function UserProvider(props) {
  console.log(props);
  
  let [username, setUsername] = React.useState({
    username: 'superawesome'
  })
  return (
    <UserContext.Provider value={username}>
      {props.children}
    </UserContext.Provider>
  )
}