import React, { useEffect, useState } from 'react'


const GetExample1 = () => {

    const [values, setValues] = useState();

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then((res)=>res.json())
        .then((data)=>setValues(data))
    }, [])





    return (
        <div>

          
          {values && (
            <div >
                <ul>
                    <li>ID : {values.id}</li>
                    <li>Title : {values.title}</li>
                    <li>Body : {values.body}</li>
                </ul>
            </div>
          )} 

        </div>
    )
}

export default GetExample1
