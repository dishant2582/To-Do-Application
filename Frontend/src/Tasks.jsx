import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TaskTemplate from "./TaskTemplate";
import Loading from "./Loading";

export default function Tasks() {

    const navigate=useNavigate()
    const[task,settask]=useState([])
    const[loading,setloading]=useState(false)
    const user=localStorage.getItem('user')
    const token=localStorage.getItem("token")

    if(!token){
      navigate("/")
    }

    useEffect(()=>{
      setloading(true)
        axios.post("https://latest-xi.vercel.app/task/read",{
          username:user
        })
        .then((res)=>{
          setloading(false)
          settask(res.data.tasks)
        }).catch((err)=>{
          setloading(false)
         
    })
    },[user])

    if(loading){
      return <Loading />
    }


  return (
    <div className="bg-teal-100">
        <div className="h-screen">
        <div className='space-x-6 flex px-2 justify-center pt-4'>
       <Link to="/add"><button className='bg-white sm:p-2 rounded-md p-1 font-bold' >Add task</button></Link>
       <Link to="/search" ><button className="sm:p-2 p-1 rounded-md font-bold bg-white">Search Task</button></Link>
       <Link to="/login" ><button className="sm:p-2 p-1 rounded-md font-bold bg-white">Log out</button></Link>
        </div>
      <div>
        {task.length === 0 && <div className="text-white text-center text-6xl font-bold my-5"> NO task Assigned</div>}
      </div>
      <div>
      {task.length > 0 && task.map((data)=>(
              
              <TaskTemplate key={data.id} data={data} />
             
          ))
        }
      </div>
    </div>
    </div>
  );
}
