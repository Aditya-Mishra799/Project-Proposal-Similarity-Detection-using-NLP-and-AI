import React from 'react'
import { useState } from 'react'

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' })
  const [error, setError] = useState({ email: '', password: '' })
  const handleChange = (e) => {
    setUser({
      ...user, [e.target.name]: e.target.value
    })
  }
  const handleClick = () => {
    if (validation(user)) {
      setError("")
      console.log(user);
    }
    else console.log("error occured")
  }
  const validation = (user) => {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
    let newError = {}
    if (user.email === "") {
      newError.email = "Email should not be empty"
      setError(newError)
      return false;
    }
    if (user.password === "") {
      newError.password = "Password should not be empty"
      setError(newError)
      return false;
    }
    if (!email_pattern.test(user.email)) {
      newError.email = "Enter a valid email. It should contain @ and '.'"
      setError(newError)
      return false;
    }
    if (!password_pattern.test(user.password)) {
      newError.password = "Password must contains atleast one Uppercase,one special character and a number";
      setError(newError)
      return false;
    }
    return true;
  }
  return (
    <div className='w-[full] h-[fit-content] p-2 flex justify-center items-center bg-slate-50'>
      <div className='md:w-[30%] w-[85%] h-[fit-content] md:p-6 p-2 flex flex-col items-center gap-1 border-t-8 border-cyan-400 rounded-lg shadow-md'>

        <div className='rounded-md px-3 py-7 w-[100%] flex flex-col gap-5 justify-center'>
        <div className='flex flex-col gap-2'>
          <div className='text-center font-bold text-3xl'>Login</div>
          <hr className='w-[10%] border border-black m-auto' />
        </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="Email" className='font-bold'>Email*</label>
            <input type="email" name="email" id="email" placeholder='Enter your Email' className='border border-cyan-400 rounded-md p-2 ' onChange={handleChange} />
            {error.email &&
              <div className='text-sm text-red-600 font-bold h-[0.1em]'>{error.email}</div>
            }
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="Password" className='font-bold'>Password*</label>
            <input type="password" name="password" id="password" placeholder='Enter your Password' className='border border-cyan-400 rounded-md p-2 ' onChange={handleChange} />
            {error.password &&
              <div className='text-sm text-red-600 font-bold h-[0.1em]'>{error.password}</div>
            }
          </div>
        </div>
        <button className='w-[30%] rounded-lg text-white  bg-cyan-400 hover:bg-cyan-100 hover:text-black p-2' onClick={handleClick}>Login</button>
      </div>
    </div>
  )
}

export default Login
