import React,{useState} from 'react';
import './App.css';
import image from './assets/images/C.png'
import Post from './component/Post';
import video1 from './assets/videos/Struggler.mp4'

function App() {
  const [posts,setPosts]=useState([
    {
      username:"Mandeep Punia", 
      caption:"Wow", 
      videoUrl:`${video1}`
    },
    {
      username:"Mandeep Punia", 
      caption:"Wow", 
      videoUrl:`${video1}`
    }
    
  ]);

  return (
    <div className="app">
      {/*Header */}
      <div className="app_header">
        <img src={image} alt="logo" class="app_headerImage" id="logo"/>
      </div>

    {
      posts.map(post=>(
        <Post username={post.username} caption={post.caption} videoUrl={post.videoUrl}/>
      ))
    }
      
    </div>
  );
}

export default App;
