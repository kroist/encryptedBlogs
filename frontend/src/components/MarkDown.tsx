import React, {useState, useContext, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {CurrentUserContext} from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import BackendErrorMessages from 'components/backendErrorMessages'
import useLocalStorage from 'hooks/useLocalStorage'
import MDEditor from '@uiw/react-md-editor';

const MarkDown = (props) => {

    const [value, setValue] = React.useState(`**Hello world!!!**  />`);
    return (
        
      <div className="container">
         <img src="http://localhost:3000/img" />
        <MDEditor
          value={value}
          onChange={setValue}
        />
        <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
      </div>
    );
}

export default MarkDown;