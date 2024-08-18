import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  VStack,
  Link,
  FormErrorMessage,
  FormLabel,
  FormControl,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import userValidationSchema from '../../validation/userValidation';
import { useNavigate } from 'react-router-dom';
import { useToastService } from '../../hooks/toastService';
import { apiRequest } from '../../utils/apiRequest';

const Login = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate();
  const {showToast} = useToastService()
  const handleShowPassword = () => setShow(!show)

  const { handleSubmit, register, reset, formState: { isSubmitting, errors } } = useForm({
    resolver: yupResolver(userValidationSchema),
    context: { isRegistration: false }, // Pass context to the schema
  });

  const onSubmit = async (data) => {
    console.log(data)
    const { data: responseData, error } = await apiRequest('/auth/login', data, 'POST');

    if (error) {
        showToast({
            title: 'Error',
            description: error,
            status: 'error',
            duration: 5000,
        });
    } else {
        showToast({
            title: 'Success',
            description: 'Login successful!',
            status: 'success',
            duration: 5000,
        });
        reset();
        setTimeout(() => {
            navigate('/')
        }, 1000);
    }
};



  return (
      <form onSubmit={handleSubmit(onSubmit)}>
          <VStack
              alignItems={'center'}
              justifyContent={'center'}
              width={'max-content'}
              p={'10'}
              bg={'white'}
              borderRadius={'lg'}
              gap={'4'}
              boxShadow={'md'}
          >
              <Text fontSize={'xl'} fontWeight={'medium'}>Login to your account</Text>

              {/* Email Field */}
              <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <InputGroup>
                      <InputLeftAddon><MdEmail /></InputLeftAddon>
                      <Input
                          type='email'
                          {...register("email")}
                          autoComplete={'username'}
                      />
                  </InputGroup>
                  <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>

              {/* Password Field */}
              <FormControl isInvalid={errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                      <InputLeftAddon><RiLockPasswordFill /></InputLeftAddon>
                      <Input
                          type={show ? 'text' : 'password'}
                          {...register("password")}
                          autoComplete={'current-password'}
                      />
                      <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={handleShowPassword}>
                              {show ? 'Hide' : 'Show'}
                          </Button>
                      </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>

              {/* Submit Button */}
              <Button type="submit" colorScheme="teal" width="full" isLoading={isSubmitting}>
                  Submit
              </Button>

              <Text>Don't have an account? <Link href="/auth/register" color={'teal.500'}>Register</Link></Text>
          </VStack>
      </form>
  )
}

export default Login;
