export function dataUriToBlobUrl(dataURI) {
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
export function transformUrlToBase64(url) {
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
export const changeUrlToBase64 = async (text)=>{
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
  
export const changeToNormal = async (text)=>{
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
  const prettyDate = (date)=>{
    const options = {
      year: 'numeric',
      month: 'short',  // "short" for abbreviated month name
      day: '2-digit'   // "2-digit" for two-digit day
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
}