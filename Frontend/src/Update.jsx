import React, { useState }  from 'react'
import { useFormik } from 'formik'
import { useParams } from 'react-router'
import axios from 'axios'
import Loading from './Loading'

export default function Update() {

    const TITLE=useParams().title
    console.log(TITLE)
    const user=localStorage.getItem("user")
    const[loading,setloading]=useState(false)
     
    function submithandle(values){
      setloading(true)
      axios.post("https://latest-xi.vercel.app/task/update",{
        username:user,
        title:TITLE,
        description:values.description,
        Status: values.Status,
        deadline:values.Deadline
      })
      .then((res)=>{
       setloading(false)
        console.log(res)
      }).catch((err)=>{
        setloading(false)
        console.log(err)
    })
    }

    const initialvalues = {
        description:'',
        Status:'',
        Deadline:''
    }

    const formik =useFormik({
        initialValues:initialvalues,
    onSubmit :values =>(
        submithandle(values),
        console.log(values)
    )})
    
      if(loading){
        return <Loading/>
      }

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-teal-100'>
    <div className='  m-4'>
      <form onSubmit={formik.handleSubmit} className='bg-bg border-4 flex justify-center flex-col  border-slate-300 shadow-md shadow-slate-100 p-10 space-y-2 bg-gradient-to-r from-cyan-500 to-teal-200 ...'>
        <p className='text-white'>Title</p>
        <input type='text' className='outline-indigo-400 ' placeholder={TITLE} />
        <p className='text-white'>Deadline</p>
        <input type='date' onChange={formik.handleChange} name='Deadline' className='outline-indigo-400  '  />
        <p className='text-white'>Description:</p>
        <textarea rows="3" cols="25" name='description' onChange={formik.handleChange} className='outline-indigo-400  '  />
        <button  className='bg-white p-2 rounded-md font-bold '>Submit</button>
      </form>
  </div>
  
</div>
  )
}
