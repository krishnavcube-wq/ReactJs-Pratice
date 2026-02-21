import React, { useEffect, useState } from 'react'

const Component2 = () => {
    const [studentData, setStudentData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try{
            const res = await fetch("http://localhost:8080/students")
            const data = await res.json();
            setStudentData(data);
            }catch(error){
                console.error("error occur",error)
            }
            
        }
        fetchData();
    },[])

    return (
        <div>

            <h1>Student Student Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {studentData.map((details) => (
                        <tr key={details.id}>
                            <td>{details.id}</td>
                            <td>{details.name}</td>
                            <td>{details.email}</td>
                            <td>{details.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Component2
