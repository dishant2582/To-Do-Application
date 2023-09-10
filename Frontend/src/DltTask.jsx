import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import Loading from './Loading'

export default function DltTask() {
    const[value,setvalue]=useState("")
    const user=localStorage.getItem("user")
    const [work,setwork]=useState(false)
    const[error,seterror]=useState("")
    const [loading,setloading]=useState(false)

    function searchandler(){
      setloading(true)
       axios.post("https://latest-xi.vercel.app/task/dlt",{
        username:user,
        title:value
       }).then((res)=>{
        setloading(false)
        setwork(true)
       }).catch((err)=>{
        setloading(false)
        seterror(err.response.data.error)
    })
    }
    if(loading){
      return <Loading/>
    }
  return (

    <div className='bg-bg h-screen'>
        <div className='pt-10'><div className='bg-white rounded-md flex max-w-max border-2 mx-auto border-slate-100'>
        <input type='text' placeholder='title ' onChange={(e)=>setvalue(e.target.value)} value={value} className='outline-indigo-500' />
        <button onClick={searchandler} className='bg-bg p-2 text-white'>delete</button>
        </div>
        </div>
        {work && setTimeout(
          <div>Deleted Successfully</div>
        ,100)}
        {!work&&<h3 className='text-center m-auto text-white'>{error}</h3>}
    </div>
  )
}
