import React, {useState, useContext, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {CurrentUserContext} from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import BackendErrorMessages from 'components/backendErrorMessages'
import useLocalStorage from 'hooks/useLocalStorage'
import MDEditor from '@uiw/react-md-editor';


// import {dataUriToBlobUrl, transformUrlToBase64, changeUrlToBase64, changeUrlToNormal} from '../hooks/utils.tsx'
import {sendText} from '../hooks/useLogin.tsx'


function dataUriToBlobUrl(dataURI) {
  // Split the base64 string into parts to extract the data and the encoding
  const parts = dataURI.split(';base64,');
  const contentType = parts[0].split(':')[1]; // Get the content type from the first part (e.g., 'image/jpeg')
  const raw = window.atob(parts[1]); // Decode the base64 data part to binary data
  const rawLength = raw.length;

  // Convert the binary data to an array of 8-bit unsigned integers
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  // Create a new Blob object using the binary data array
  const blob = new Blob([uInt8Array], {type: contentType});

  // Create a URL for the Blob object
  const blobUrl = URL.createObjectURL(blob);

  // Return the URL
  return blobUrl;
}
  function transformUrlToBase64(url) {
    return new Promise((resolve, reject) => {
      // Fetch the image from the URL
      fetch(url)
        .then(response => {
          // Check if the fetch was successful
          if (response.ok) return response.blob();
          throw new Error('Network response was not ok.');
        })
        .then(blob => {
          // Use FileReader to convert the Blob into a Base64 string
          const reader = new FileReader();
          reader.onloadend = () => {
            // When the file reader finishes, it contains a data URL
            const base64data = reader.result;
            resolve(base64data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(error => {
          reject(error);
        });
    });
  }  
const changeUrlToBase64 = async (text)=>{
  const regex = /<img [^>]*src="[^"]+"[^>]*>/gi;
  let match;
  let newText = text;
  let shift = 0;
  while ((match = regex.exec(text)) !== null) {
    let ind = match.index;

    let src_regex = /src="[^"]+"/gi;

    let src_match = src_regex.exec(match[0]);

    let src_pos = src_match.index;
    let url = src_match[0];
    url = url.slice(5, url.length - 1);

    let len = url.length;
    ind = ind + src_pos + 5;

    try{
    let newPart = await transformUrlToBase64(url); // should catch
    
    newText = newText.slice(0, ind + shift) + newPart + newText.slice(ind + len + shift);
    shift += newPart.length - len;
    }catch(error){
      console.log("gg while transformUrlToBase64 ", error);
    }
  }
  return newText;
}

const changeToNormal = async (text)=>{
  const regex = /data:image\/([a-zA-Z]+);base64,([A-Za-z0-9+/=]+)/gi;
  let match;
  let newText = text;
  let shift = 0;
  while ((match = regex.exec(text)) !== null) {
    let ind = match.index;

    let url = match[0];
    let len = url.length;

    console.log(" new base64 ", ind , ' ' , len, ' ', text.slice(ind , ind + 5))

    try{
      let newPart = await dataUriToBlobUrl(url); // should catch
      
      newText = newText.slice(0, ind + shift) + newPart + newText.slice(ind + len + shift);
      shift += newPart.length - len;
    }catch(error){
      console.log("gg while transformUrlToBase64 ", error);
    }
  }
  return newText;
}

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
        
        const nwText = await changeUrlToBase64(inputValue);
        
        console.log(" text is " , nwText);

        const backText = await changeToNormal(nwText);

        console.log(backText);

        setInputValue(backText);
        //sendText(nwText);

        

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