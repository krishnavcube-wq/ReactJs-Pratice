import React, { useState } from 'react'
import axios from "axios"
const PostDataUsing = () => {
const[enterDetails,setEnterDetails]=useState({
    name:"",
    email:"",
    address:""
})


const handleSubmit=async(e)=>{
    try{
    e.preventDefault();
       await axios.post("http://localhost:8080/students/save",enterDetails)
       alert("inserted")
    }catch(error){
        console.error("not inserted data",error);
    }

}

const handleChange= (e)=>{
    setEnterDetails({...enterDetails,[e.target.name]:e.target.value})
}

  return (
    <div>
      <h2>Enter Details </h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={enterDetails.name} onChange={handleChange}  placeholder='enter name' type='name'></input>
        <input name="email" value={enterDetails.email} onChange={handleChange} placeholder='enter email' type='email'></input>
        <input name="address" value={enterDetails.address} onChange={handleChange}  placeholder='enter address' type='address'></input>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default PostDataUsing
