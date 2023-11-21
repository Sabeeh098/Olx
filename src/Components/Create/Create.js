import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getAuth } from 'firebase/auth';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { setDoc,doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Create = () => {
  const auth = getAuth()
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const [error,setError] = useState('')
  const {app,db} = useContext(FirebaseContext)
  const date = new Date()
  const navigate = useNavigate()
  const handleSubmit = ()=> {
    if(!user){
      setError('please login to add product');
      return
    }
    const storage = getStorage();
    const storageRef = ref(storage, `/image/${image.name}`);
    uploadBytes(storageRef, image)
    .then(()=>{
      return getDownloadURL(storageRef)
    }).then(async(url)=>{
      await setDoc(doc(db, 'products', Date.now().toString()),{
       name,
       category,
       price,
       url,
       userId:user.uid,
       createdAt:Date.toString()
      }).then(()=>{
        navigate('/')
      }).catch((error)=>{
        console.error("Error uploading image: ",error)
      })
    })
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
            type="number" 
            id="fname" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
        
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
