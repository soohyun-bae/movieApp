import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] =  useState(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  })

  useEffect(() => {
    if(user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user')
    }
  }, [user])
  
  const value = {
    user,
    setUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


const useUser = () => {
  const userData = useContext(UserContext)

  if(!userData) {
    console.error('UserContext가 제공되지 않았습니다.');
    return {user: null, setUser : () => {}};
  }

  return userData
};

export default useUser;