import axios from 'axios'
export const BIN_ID = '6640870fe41b4d34e4f27e70';

export const getCurrentPublicView = async()=>{
    try{
        const info = (await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`))?.data;
        
        const bin = info.record;

        return bin.blogPreviews
    }catch(error){
        console.log("error while fetching blogs " , error);
        throw error;
    }
}
export const getBlogPreview = async (addr)=>{
    const getBlogs = await getCurrentPublicView();
    return getBlogs.find((blog)=> blog.address == addr);
}
export const publishPublicPreview = async (blog)=>{

    let currentBlogs = await getCurrentPublicView();
    console.log(" CURRENT BLOGS ARE ", currentBlogs);

    currentBlogs = currentBlogs || [];
    const newThing = {
        blogPreviews: [...currentBlogs, blog]
    }
    try{
        const res = await axios.put(`https://api.jsonbin.io/v3/b/${BIN_ID}`, newThing, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(" the result is " , res);
        return res;
    }catch(error){
        console.log("error is " , error);
        throw error;
    }
}