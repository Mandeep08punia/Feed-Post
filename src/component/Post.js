import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import '../styles/Post.css'
function Post({username,caption,videoUrl}) {
    
    return (
        <div className="post">
            <div className="post_header">
            <Avatar className="post_avatar" alt="Mandeep Punia" src="/static/images/avatar/1.jpg">
                {username.charAt(0)}
            </Avatar>
            <h3>{username}</h3>
            </div>
            {
                
                (videoUrl.includes(".mp4")==true)?(    
                           <video src={videoUrl} controls  className="post_video"/>       
                ):(
                        <img src={videoUrl} className="post_video"/> 
                )  
            }
            
            <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
        </div>
    )
}

export default Post
