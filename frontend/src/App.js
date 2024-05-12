import logo from './logo.svg';
import './App.css';


import {Routes, Route, Navigate} from 'react-router-dom'
import React, {useState} from 'react'

import EditBlogPost from './components/EditBlogPost.tsx';
import MarkDown from './components/MarkDown.tsx';

import Login from './components/Login.tsx';
import Feed from './components/Feed.tsx'
import NavBar from './components/NavBar.tsx';
import useFetchBlogs from './hooks/useFetchBlogs.tsx';

import BlogCheckout from './components/BlogCheckout.tsx';
const App = () => {
  const [img, setImg] = useState('')
  const [blogs, error, fetchBlogs, loading] = useFetchBlogs();


  return (
    <>
    <NavBar />
       <Routes>
        
        <Route path="/edit" element={<EditBlogPost url={img}/>} />
        <Route path="/login" element={<Login url={img}/>} />
        
        <Route path="/mrk" element={<MarkDown />}/>
        <Route path="/feed" element={<Feed blogs={blogs} error={error} loading={loading}/>} />
        
        <Route path="/blog/*" element={<BlogCheckout />} />
        <Route path="/*" element={<Navigate to="/edit" replace />} />
    </Routes>
    </>

  

)
}

export default App
