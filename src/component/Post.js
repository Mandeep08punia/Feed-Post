import React, { useState ,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import '../styles/Post.css'
import {db} from '../firebase'
import firebase from 'firebase'
function Post({postId,user,username,caption,videoUrl}) {
    const [comments,setComments]=useState([]);
    const [comment,setComment]=useState('');

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe=db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp','asc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()));
            });
        }
        return ()=>{
            unsubscribe();
        }
    }, [postId])
    const postComment=(event)=>{
        event.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text:comment,
            username:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('');
    }
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
            {
                <div className="post_comments">
                    {
                        comments.map((comment)=>(
                            <p>
                                <strong><b>{comment.username}</b></strong>{comment.text}
                            </p>
                        ))
                    }
                </div>
            }
            {user && (
                <form className="post_commentBox">
                <input className="post_input" type="text" placeholder="add a comment..."
                    value={comment} onChange={(e)=>setComment(e.target.value)}
                />
                <button
                    disabled={!comment}
                    className="post_button"
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </button>
            </form>
            )}
            
        </div>
    )
}

export default Post
