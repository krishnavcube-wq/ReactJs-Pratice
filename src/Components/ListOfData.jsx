import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const ListOfData = () => {

    const [details, setDetails] = useState([])


    // useEffect(() => {
    //     fetch("http://localhost:8080/students")
    //         .then((res) => res.json())
    //         .then((data) => setDetails(data))
    //         .catch((error) => console.error("error", error))
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:8080/students")
                const data = await res.json();
                setDetails(data);
            }catch(error){
                console.log("error",error)
            }
        }
        fetchData();
    },[])

   const navigate= useNavigate();
    return (
        <div>
            
            <h2>User List</h2>
            <h2 onClick={()=>navigate("/edit:id")}>Edit Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>EmailId</th>
                        <th>Address</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {details.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ListOfData
