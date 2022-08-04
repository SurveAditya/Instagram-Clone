import React , { useState,useEffect } from "react";
import './App.css';
import Post from './Post';
import { db,auth } from './firebase.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input,Avatar } from '@mui/material';
import ImageUpload from './ImageUpload';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


function App() {
  const [posts , setPosts] = useState([]);

  const usersCollectionRef = collection(db, "posts");
  useEffect(() => {
  const getPost = async () => {
    const data = await getDocs(usersCollectionRef);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  getPost();
}, []);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const [registerOpen, setRegisterOpen] = useState(false);
const handleRegisterOpen = () => setRegisterOpen(true);
const handleRegisterClose = () => setRegisterOpen(false);

const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

 const [user, setUser] = useState(null);

//this code will be active whenever there is change in the user or username
 useEffect(() => {
   //onAuthStateChanged states that when you change the user that is login in or log out
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in...
        console.log(authUser);
        //below line of code keeps you logged in even when you refresh
        setUser(authUser);

        //now we say if the user already has a username then do not update the setUsername
        //else update the display name and make it equal to the user name
        if (authUser.displayName) {
          // dont update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      //perform cleanup
      unsubscribe();
    };
  }, [user, username]);


const handleLogin = (e) => {
  e.preventDefault();
  //this email and password are from the state
    signInWithEmailAndPassword(auth,email, password)
    .catch((error) => alert(error.message));

  setOpen(false);
};

const handleRegister = (e) => {
  e.preventDefault();
    createUserWithEmailAndPassword(auth,email, password)
    .catch((error) => alert(error.message));

  setRegisterOpen(false);
};







  return (
    <div className="app">
          <Modal
              open={open}
              onClose={handleClose}
          >
          <Box sx={style}>
                <form className="app__login">
                <center>
                  <img
                      className="app__headerImage"
                      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                      alt=""
                  />
                </center>
                  <Input
                    placeholder="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button onClick={handleLogin}>Login</Button>
                </form>
          </Box>
        </Modal>
          <Modal
                open={registerOpen}
                onClose={handleRegisterClose}
          >
              <Box sx={style}>
              <form className="app__login">
              <center>
              <img
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
                />
              </center>
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  <Button onClick={handleRegister}>Register</Button>
              </form>

              </Box>
              </Modal>
            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt=""
                />
            </div>
            {user?.displayName ? (
                  <div className="app__headerRight">
                  <Button onClick={() => auth.signOut()}>Logout</Button>
                  <Avatar
                      className="app__headerAvatar"
                      alt={user.displayName}
                      src="/static/images/avatar/1.jpg"
                    />
                  </div>
                ) : (
                  <form className="app__loginHome">
                  <Button onClick={() => setOpen(true)}>Login</Button>
                  <Button onClick={() => setRegisterOpen(true)}>Sign Up</Button>
              </form>
)}
              {
                  posts.map(post => (
                      <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
                  ))
              }

              {user?.displayName ? (
                  <div className="app__upload">
                      <ImageUpload username={user.displayName} />
                  </div>
                  ) : (
                    <center>
                        <h3>Login to upload</h3>
                    </center>
                )}
    </div>
  );
}

export default App;
