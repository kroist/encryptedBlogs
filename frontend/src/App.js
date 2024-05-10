import logo from './logo.svg';
import './App.css';


import {Routes, Route} from 'react-router-dom'
import React, {useState} from 'react'

import EditBlogPost from './components/EditBlogPost.tsx';
import MarkDown from './components/MarkDown.tsx';

import Login from './components/Login.tsx';

const App = () => {
  const [img, setImg] = useState('')
  return (
    
       <Routes>
        
        <Route path="/edit" element={<EditBlogPost url={img}/>} />
        <Route path="/login" element={<Login url={img}/>} />
        
        <Route path="/mrk" element={<MarkDown />}/>
    </Routes>
  

)
}

export default App
