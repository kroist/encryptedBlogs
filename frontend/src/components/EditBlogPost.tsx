import React, {useState, useContext, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {CurrentUserContext} from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import BackendErrorMessages from 'components/backendErrorMessages'
import useLocalStorage from 'hooks/useLocalStorage'
import MDEditor from '@uiw/react-md-editor';


import {dataUriToBlobUrl, transformUrlToBase64, changeUrlToBase64, changeUrlToNormal} from '../hooks/utils.tsx'
import {sendText} from '../hooks/useLogin.tsx'

const EditBlogPost = (props) => {

    const [markdownUI, setMarkdownUI] = useState(null)
    const [inputValue, setInputValue] = useState();
    // Function to handle changes in the input field
    const handleInputChange = (value) => {
        setInputValue(value);
    };
   const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    // This function handles the paste event
    const handlePaste = (event) => {
      const items = event.clipboardData.items;

      for (const item of items) {
        if (item.type.indexOf('image') === 0) {
          const blob = item.getAsFile();

          // Create a URL for the blob object
          const imgURL = URL.createObjectURL(blob);

          console.log("img is " , imgURL)

          setInputValue((current_value)=>{
            let nwValue = current_value + `<img src="${imgURL}" >`;
            return nwValue;
          })
          // setImageURL(imgURL);
          break;
        }
      }
    };

    // Add the paste event listener to the window
    window.addEventListener('paste', handlePaste);

    // Clean up function to remove the event listener
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);


  const [kek, setKek] = useState()
 


    return (<div style={{width: '100%', display: 'flex', flexDirection: 'column',alignItems: 'center', height: '100vh'}}>

     
     
     <div className="container" style={{maxWidth: '1080px', width: '70%', height: '70%', marginTop: '30px'}}>

        <MDEditor 
        height={'70%'}
          value={inputValue}
          onChange={handleInputChange}
        />
    
      
      </div>
  

      <button onClick={async (e)=>{
        
        // const nwText = await changeUrlToBase64(inputValue);
        const nwText = 'huiiiiiiiiiiiiiiii';
        sendText(nwText);
        // setInputValue("hui");
        // console.log("done done done")
        // setTimeout(async()=>{
          
        //   const backText = await changeUrlToNormal(nwText);
        //     console.log("backtext is " , backText);
        //   setInputValue(backText)
          
        // }, 2000);

        // setMarkdownUI(getMarkdownUI(getSemiJSON(nwText)))
      }}>
          Hey there convert
      </button>

</div>
    );
   
}

export default EditBlogPost;