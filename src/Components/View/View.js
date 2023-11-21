import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

function View() {
  const [userDetails,setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  useEffect(() => {
    const {userId} = postDetails
    const userDetail = async()=>{
      const data = query(collection(db,"users").where("id", "==", userId))
      const user = await getDocs(data)
      user.forEach((doc)=>{
        setUserDetails(doc.data());
      })
    }
    userDetail()
  }, [])
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.category}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.name}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
