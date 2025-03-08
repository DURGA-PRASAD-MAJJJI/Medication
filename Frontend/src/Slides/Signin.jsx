import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const Signin = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [position, setPosition] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      if (position == 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)

        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/signIn', { name, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)

        } else {
          toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={onSubmit} className='min-h-[80vh] flex item-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-10 w-full max-w-[500px] min-h-[10px] sm:min-h-[200px] md:min-h-[100px] lg:min-h-[500px] border rounded-xl text-zinc-600 text-base shadow-xl'>
        <div className="flex justify-center w-full">
          <p className="text-3xl font-semibold">{position === 'Sign Up' ? "Create Account" : "Sign In"}</p>
        </div>
        <p className='w-full text-center'>Please {position === 'Sign Up' ? "Sign Up" : "Sign In"} to Book appointment</p>
        {
          position === "Sign Up" && <div className="flex gap-4 w-full">
            <p className="w-1/4 text-left">Full Name</p>
            <input className="border border-zinc-300 rounded w-3/4 p-2 mt-2" type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }

        <div className="flex gap-4 w-full">
          <p className="w-1/4 text-left">Email</p>
          <input className="border border-zinc-300 rounded w-3/4 p-2 mt-2" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className="flex gap-4 w-full">
          <p className="w-1/4 text-left">Password</p>
          <input className="border border-zinc-300 rounded w-3/4 p-2 mt-2" type="Password" onChange={(e) => setPassword(e.target.value)} value={ password } required />
        </div>
        <button type='submit' className="w-full bg-primary text-white font-semibold py-3 px-5 rounded-lg text-lg shadow-lg hover:shadow-xl hover:text-black  transition-all duration-300 mt-8">{position === 'Sign Up' ? "Create Account" : "Sign In"}
        </button>
        {
          position === "Sign Up"
            ? <p >Already have an account? <span onClick={() => setPosition('Sign In')} className='text-primary underline cursor-pointer'>Sign In</span></p>
            : <p>Create a New Account ? <span onClick={() => setPosition('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Signin
