import { BookList } from '@/components/Books/BookList'
import { useAuth } from '@/context/authContext'
import React from 'react'

const Home = () => {
  const {user, accessToken} = useAuth();
  console.log(accessToken)
  return (
    <div>
      <BookList title={"Nuestra Colección"}/>
    </div>
  )
}

export default Home
