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
import ThemeContext from './ThemeContext.tsx';
import Loading from './components/Loading.tsx';
import MainFeed from './components/MainFeed.tsx';
import MyFeed from './components/MyFeed.tsx';
const App = () => {
  const [img, setImg] = useState('')
  const [shadowLoading, setShadowLoading] = useState(false);

  return (
    <>
      <ThemeContext.Provider value={{setShadowLoading: setShadowLoading}} >

        {shadowLoading == true ? 
          <div className="w-full h-full fixed flex items-center justify-center inset-0 bg-black bg-opacity-50 lg:bg-opacity-25">
          <Loading loading={shadowLoading} />
      </div>: <></>} 
         <NavBar />
          <Routes>
            
            <Route path="/edit" element={<EditBlogPost url={img}/>} />
            <Route path="/login" element={<Login url={img}/>} />
            
            <Route path="/mrk" element={<MarkDown />}/>
            <Route path="/feed" element={<MainFeed />} />
            <Route path="/myfeed" element={<MyFeed />} />
            
            <Route path="/blog/*" element={<BlogCheckout />} />
            <Route path="/*" element={<Navigate to="/edit" replace />} />
        </Routes>

       
      </ThemeContext.Provider>
    </>
  

)
}

export default App
