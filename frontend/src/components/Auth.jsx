import { Button, Input, InputGroup, InputLeftAddon, InputRightElement, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
const Auth = () => {
    const [show, setShow] = useState(false)
    const handleShowPassword = () => setShow(!show)
    return (
        <VStack
            alignItems={'center'}
            justifyContent={'center'}
            width={'max-content'}
        >
            <Text>Login to your account</Text>
            <InputGroup>
                <InputLeftAddon><MdEmail /></InputLeftAddon>
                <Input type='email' placeholder='Email Id' />
            </InputGroup>

            <InputGroup>
                <InputLeftAddon><RiLockPasswordFill /></InputLeftAddon>
                <Input type={show ? 'text' : 'password'} placeholder='Password' />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowPassword}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </VStack>
    )
}

export default Auth