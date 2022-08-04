import React , { useState } from "react";
import firebase from 'firebase/compat/app';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { storage,db,auth } from "./firebase";
import "./ImageUpload.css";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


const ImageUpload = ({username}) =>
{

  const [caption,setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) =>
  {
        if (e.target.files[0])
        {
              setImage(e.target.files[0]);
        }
  };
  const handleUpload = async() =>
  {
            //using this we are storing the image in the database
            //image name is basically the file name that we selected
           const imageRef = ref(storage,`images/${image.name}`);
           uploadBytes(imageRef,image).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) =>
                    {
                          alert("Image uploaded");
                          setUrl(url);
                    }
                  );
           });
          const usersCollectionRef = collection(db, "posts");
            console.log(url);
           //we are saying on state change give me a snapshot
          await addDoc(usersCollectionRef, {
                            caption: caption,
                            imageUrl: url,
                            username: username
                            // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                    console.log(url);
                    setProgress(0);
                    setCaption("");
                    setImage(null);

 };



        return(
            <div className="imageupload">
                <Input
                    placeholder="Enter a caption"
                    value ={caption}
                    onChange={ e => setCaption(e.target.value)}
                />
                <div>
                      <Input
                          type="file"
                          onChange={handleChange}
                       />
                       <Button className="imageupload__button" onClick={handleUpload}>
                              Upload
                       </Button>
                </div>
                <br />

            </div>
        );
};

export default ImageUpload;
