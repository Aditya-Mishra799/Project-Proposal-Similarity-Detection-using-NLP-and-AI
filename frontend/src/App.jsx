import React, { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Main from './components/Main'
function App() {
  return (
    <>
    <ChakraProvider>
      <Navbar/>
      <Main/>
      <Footer/>
    </ChakraProvider>
    </>
  )
}

export default App
