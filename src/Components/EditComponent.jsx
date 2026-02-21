import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
const EditComponent = () => {

    const { id } = useParams();
    const navigate=useNavigate();

    const [editValues, letEditValues] = useState({
        name: "",
        email: "",
        address: ""
    })

    useEffect(() => {
        const getDetails = async () => {
            const res=await axios.get("http://localhost:8080/students/" + id)
            letEditValues(res.data)
        }
        getDetails();
    }, [id])
    const handleChange = (e) => {
        letEditValues({ ...editValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put("http://localhost:8080/students/edit/" + id,editValues)
        navigate("/")
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
