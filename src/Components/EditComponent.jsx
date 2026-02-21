import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EditComponent = () => {
    
    const[editValues,letEditValues]=useState({
        name:"",
        email:"",
        address:""
    })

    useEffect(()=>{
        const getDetails= async()=>{
            await axios.get("http://localhost:8080/students")
           
        }
        getDetails();
    },[])
    const handleChange=(e)=>{
        letEditValues({...editValues,[e.target.name]:e.target.value})
    }

    const handleSubmit=async()=>{
        await axios.put("http://localhost:8080/students/edit/{id}")
    }



  return (
    <div>
        <form onSubmit={handleSubmit}>
      <input name='name' value={editValues.name} onChange={handleChange} ></input>
      <input name='email' value={editValues.email} onChange={handleChange} ></input>
      <input name='address' value={editValues.address} onChange={handleChange} ></input>
      <button type='submit'>update</button>
      </form>
    </div>
  )
}

export default EditComponent
