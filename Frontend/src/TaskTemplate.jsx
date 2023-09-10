import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function TaskTemplate({data}) {

  const user=localStorage.getItem("user")
  const navigate = useNavigate();

  function searchandler(){
     axios.post("https://latest-xi.vercel.app/task/dlt",{
      username:user,
      title:data.title
     }).then((res)=>{
      navigate("/tasks");
     }).catch((err)=>{
  
  })
  
  }

  return (
    <div className='flex justify-center m-10 p-5 '>
        <div className='bg-white  text-bold max-w-max rounded-md shadow-md shadow-slate-200 p-4 bg-gradient-to-r from-cyan-500 to-teal-200 ...'>
            <p>Title : {data.title}</p>
            <p>Description : {data.description}</p>
          <Link to={"/update/"+data.title}> <button className=' p-1 mx-2 rounded-md text-white my-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...'>Update task</button></Link>
          <button onClick={searchandler} className=' p-1 mx-2 rounded-md text-white my-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...'>Delete task</button>
        </div>
    </div>
  )
}
