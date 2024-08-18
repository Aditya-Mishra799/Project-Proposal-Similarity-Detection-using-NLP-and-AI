import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Auth/Login'
import Register from './Auth/Register'
import { Box } from '@chakra-ui/react'
const Main = () => {
  return (
    <Box
    width={'100%'}
    minHeight={'90vh'}
    display={'flex'}
    alignItems={'center'}
    justifyContent={'center'}
    background={'gray.50'}
    >
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="auth/login" element={<Login/>} />
      <Route exact path="auth/register" element={<Register/>} />
    </Routes>
    </BrowserRouter>
    </Box>
  )
}

export default Main