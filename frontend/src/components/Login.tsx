import React, {useState, useContext, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {CurrentUserContext} from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import BackendErrorMessages from 'components/backendErrorMessages'
import useLocalStorage from 'hooks/useLocalStorage'
import MDEditor from '@uiw/react-md-editor';


import {dataUriToBlobUrl, transformUrlToBase64, changeUrlToBase64, changeUrlToNormal} from '../hooks/utils.tsx'


import {tryLogin} from '../hooks/useLogin.tsx'

const Login = (props) => {



    return (<div style={{width: '100%', display: 'flex', flexDirection: 'column',alignItems: 'center', height: '100vh'}}>

<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" onClick={(e)=>{
    tryLogin();
}}>
  Connect MetaMask
</button>

</div>
    );
   
}

export default Login;