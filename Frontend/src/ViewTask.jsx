import React, {  useState } from 'react'
import axios from 'axios'
import TaskTemplate from './TaskTemplate'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Loading from './Loading'


export default function ViewTask() {

  const navigate=useNavigate()
  const token=localStorage.getItem("token")

  if(!token){
    navigate("/")
  }
    
    const[value,setvalue]=useState("")
    const [task,settask]=useState([])
    const [loading,setloading]=useState(false)
    const user=localStorage.getItem("user")
    

    function searchandler(){
      setloading(true)
      axios.post("https://latest-xi.vercel.app/task/read",{
      username:user,
      title: value
      }).then((res)=>{
        console.log(res)
        settask(res.data.tasks)

        setloading(false)
      }).catch((err)=>{
        setloading(false)
        console.log(err)
    })
    }

    

    if(loading){
      return <Loading/>;
    }
  return (
    <div className='h-screen bg-teal-100'>
        <div className='pt-10'>
          <div className='max-w-fit mx-auto my-2'>
        <Link to="/tasks"><button  className='max-w-fit bg-white  p-2' >Dashboard</button></Link>
        </div>
            <div className='bg-white rounded-md flex max-w-max  border-2 mx-auto border-slate-100'>
                <input type='text' placeholder='title ' onChange={(e)=>setvalue(e.target.value)} value={value} className=' p-2 outline-indigo-500' />
                <button onClick={searchandler} className='bg-bg p-2 text-white'>Search</button>
            </div>
        </div>
        {   task.length===0 && <div className='text-white text-center'>
           <h1 className='text-white text-center text-6xl font-bold my-5'>No Task Found!</h1> 
            </div>
        }
        {
          task && task.length>0 && task.map((data)=>(
            <TaskTemplate key={data.id} data={data} />
          ))
        }
    </div>
  )
}
