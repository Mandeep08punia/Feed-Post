import React from 'react';
import './App.css';
import image from './assets/images/C.png'
import Post from './component/Post';

function App() {
  return (
    <div className="app">
      {/*Header */}
      <div className="app_header">
        <img src={image} alt="logo" class="app_headerImage" id="logo"/>
      </div>
      <Post/>

      {/* Posts*/}
      {/* */}
    </div>
  );
}

export default App;
