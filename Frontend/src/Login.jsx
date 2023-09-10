import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import Loading from './Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'

export default function Login() {



  const [loading,setloading] = useState(false)
  const navigate=useNavigate()

    const initialvalues = {
        username: "",
        password: "",
      };
    
      const formik = useFormik({
        initialValues: initialvalues,
        onSubmit:values => {
          submitlogin(values)
        },
      });

      function submitlogin(values){
        setloading(true)
        axios.post("https://latest-xi.vercel.app/user/login",{
            username:values.username,
            password:values.password,
        }).then((res)=>{
            setloading(false)
            localStorage.clear()
            const {token,username}=res.data
            localStorage.setItem('user',username )
            localStorage.setItem('token',token )
            navigate("/tasks")
        }).catch((err) => {
          setloading(false)
            console.log(err)
      })
      }

      if(loading){
        return <Loading />
      }

  return (
    <div className='bg-bg flex h-screen justify-center items-center bg-teal-200'>
      <h1 className='text-white text-8xl font-bold mr-5'>Trello</h1>
        <form onSubmit={formik.handleSubmit} className='bg-bg max-w-max space-y-2 flex flex-col border-2 border-slate-200 justify-center p-5 bg-gradient-to-r from-cyan-500 to-teal-200 ...'>
            <p className='text-white font-semibold'>Username</p>
            <input type='text'
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            required 
             className='outine-indigo-500 '  />
            <p className='text-white font-semibold'>Password</p>
            <input type='text'
            name="password"
             required 
             onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
             className='outine-indigo-500 '  />
             <button
                  type="submit"
                  className="  rounded-sm border-2 border-slate-200  font-semibold text-white"
                >
                  Submit
                </button>
                <Link to="/" ><button className="sm:p-2 p-1 rounded-md font-bold bg-white">Create account</button></Link>
        </form>
    </div>
  )
}
