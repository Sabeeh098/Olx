import { createContext, useState } from "react";

export const PostContext = createContext(null)

function Post({children}){
    const [postDetailes,setPostDetails] = useState('cxv')
    return(
        <PostContext.Provider value={{postDetailes,setPostDetails}}>
            {children}
        </PostContext.Provider>
    )
}

export default Post