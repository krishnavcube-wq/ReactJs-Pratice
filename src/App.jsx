import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ListOfData from './Components/ListOfData'
import EditComponent from './Components/EditComponent'
import PostDataUsing from './Components/PostDataUsing'



function App() {
  

  return (
    <>
    
      <Router>
        <Routes>
          <Route path='/' element={<ListOfData/>}></Route>
          <Route path='/edit/:id' element={<EditComponent/>}></Route>
          <Route path='/insert' element={<PostDataUsing/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
