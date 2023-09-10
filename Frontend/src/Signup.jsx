import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import Loading from "./Loading"
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'

export default function Signup() {

  const navigate = useNavigate()

  const [loading,setloading] = useState(false)

    const initialvalues = {
        username: "",
        password: "",
        email:""
      };
    
      const formik = useFormik({
        initialValues: initialvalues,
        onSubmit:values => {
          submit(values)
        },
      });


      function submit(values){
        setloading(true);
        axios.post("https://latest-xi.vercel.app/user/signup",{
            username:values.username,
            password:values.password,
            email: values.email
        }).then((data)=>{
            setloading(false)
            navigate("/login")
            console.log(data)
        }).catch((err) => {
            setloading(false)
            console.log(err)
          })
      }

      if(loading){
        return <Loading />
      }


  return (
    <>
    <div className='bg-bg flex h-screen justify-center items-center bg-teal-200'>
      <h1 className='text-white text-8xl font-bold mr-5'>Trello</h1>
        <form onSubmit={formik.handleSubmit} className='bg-bg max-w-fit space-y-2 border-2 border-slate-200 p-4 flex flex-col justify-center bg-gradient-to-r from-cyan-500 to-teal-200 ...'>
            <p className='text-white font-semibold'>Username</p>
            <input type='text' 
            name='username'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            required
             className='outine-indigo-500 '  />
            <p className='text-white font-semibold' >Password</p>
            <input type='pwd'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required className='outine-indigo-500 '  />
            <p className='text-white font-semibold' >Email</p>
            <input type='email'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required className='outine-indigo-500 '  />
            <button
                  type="submit"
                  className="  rounded-sm border-2 border-slate-200  font-semibold text-white"
                >
                  Submit
                </button>
                <Link to="/login" ><button className="sm:p-2 p-1 rounded-md font-bold bg-white">Already have acccount? Login</button></Link>
        </form>
    </div>
    </>
  )
}
