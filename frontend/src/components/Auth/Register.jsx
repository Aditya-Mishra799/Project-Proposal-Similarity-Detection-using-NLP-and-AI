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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import userValidationSchema from '../../validation/userValidation';
import { apiRequest } from '../../utils/apiRequest';
import { useNavigate } from 'react-router-dom';
import { useToastService } from '../../hooks/toastService';

const Register = () => {
    const [show, setShow] = useState(false)
    const {showToast} = useToastService()
    const handleShowPassword = () => setShow(!show)
    const navigate = useNavigate();
    const { handleSubmit, register, control,reset, formState: { isSubmitting, errors } } = useForm({
        resolver: yupResolver(userValidationSchema),
        context: { isRegistration: false }, // Pass context to the schema
    });

    const onSubmit = async (data) => {
        console.log(data)
        const { data: responseData, error } = await apiRequest('/auth/register', data, 'POST');
    
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
                description: 'Registration successful!',
                status: 'success',
                duration: 5000,
            });
            reset();  // Reset form after successful registration.
            setTimeout(() => {
                navigate('/auth/login')
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
                <Text fontSize={'xl'} fontWeight={'medium'}>Create new account</Text>

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
                            autoComplete={'new-password'}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleShowPassword}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>

                {/* Role Field */}
                <FormControl isInvalid={errors.role}>
                    <FormLabel htmlFor="role">Select your role</FormLabel>
                    <Controller
                        name="role"
                        control={control}
                        defaultValue="student"
                        render={({ field }) => (
                            <RadioGroup {...field}>
                                <Stack spacing={4} direction='row'>
                                    <Radio value='student'>Student</Radio>
                                    <Radio value='teacher'>Teacher</Radio>
                                    <Radio value='admin'>Admin</Radio>
                                </Stack>
                            </RadioGroup>
                        )}
                    />
                    <FormErrorMessage>{errors.role && errors.role.message}</FormErrorMessage>
                </FormControl>

                {/* Submit Button */}
                <Button type="submit" colorScheme="teal" width="full" isLoading={isSubmitting}>
                    Register
                </Button>

                <Text>Already have an account? <Link href="/auth/login" color={'teal.500'}>Login</Link></Text>
            </VStack>
        </form>
    )
}

export default Register;
