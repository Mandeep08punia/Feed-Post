import React,{useState,useEffect} from 'react';
import './App.css';
import image from './assets/images/C.png'
import image1 from './assets/images/ModalImage.jpeg'
import Post from './component/Post';
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles';
import {db,auth} from './firebase';
import { Button, Input } from '@material-ui/core';
import VideoUpload from './component/VideoUpload';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [posts,setPosts]=useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [openSignIn,setOpenSignIn]=useState('');
  const [user,setUser]=useState(false);
  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()})))
    })
  },[posts]);
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //user has logged in
        console.log(authUser);
        setUser(authUser);
      }
      else{
        //user has logged out
        setUser(null);
      }
    })
    return ()=>{
      
      unsubscribe();
    }

  },[user,username]);
  const signUp=(event)=>{
    event.preventDefault()
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error)=>alert(error.message))
    setOpen(false);
  };  

  const signIn=(event)=>{
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message));
    setOpenSignIn(false);
  }


  return (
    <div className="app">
    
    

      <div className="app_header">
        <img src={image} alt="logo" class="app_headerImage" id="logo"/>
        {
        user?(
          <Button color="primary"  type="button" onClick={()=>auth.signOut()}>
        Log Out
        </Button>    
        ):(
          <div className="app_loginContainer">
          <Button color="primary"  type="button" onClick={()=>setOpenSignIn(true)}>SIGN In</Button>
          <Button color="primary"  type="button" onClick={()=>setOpen(true)}>SIGN Up</Button>
          </div>
        )
      }
      
      </div>
      
      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
      <center>
      <img src={image1} alt="logo"/>
      </center>
      
        <Input placeholder="email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
     <Button color="primary" variant="contained" onClick={signIn}>SIGN In</Button>  
      </form>
      
    </div>
      </Modal>

      <Modal
        open={open}
        onClose={()=>setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
      <center>
      <img src={image1} alt="logo"/>
      </center>
      <Input placeholder="username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <Input placeholder="email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
     <Button color="primary" variant="contained" onClick={signUp}>SIGN UP</Button>  
      </form>
      
    </div>
      </Modal>
    <div className="app_posts">
            
    {
      posts.map(({id,post})=>(
        <Post key={id} username={post.username} caption={post.caption} videoUrl={post.videoUrl}/>
      ))
    }

  
    </div>
    {user?.displayName ?(
      <VideoUpload username={user.displayName}/>
    ):(
      <h3>Login to Upload</h3>
    )
    }


    </div>
  );
}

export default App;
