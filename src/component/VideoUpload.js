import { Button } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import {storage,db} from '../firebase'
import firebase from 'firebase';
import '../styles/VideoUpload.css'
function VideoUpload({username}) {
    const [caption,setCaption]=useState('');
    const [progress,setProgress]=useState(0);
    const [video,setVideo]=useState(null);
    
    const handleChange=(e)=>{
        if(e.target.files[0]){
            setVideo(e.target.files[0]);
        }
    }
    
    const handleUpload=()=>{
        const uploadTask=storage.ref(`videos/${video.name}`).put(video);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                //progress function..
                const progress=Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress)
            },
            (error)=>{
                //Error
                console.log(error);
                alert(error.message);
            },
            ()=>{
                //main logic
                storage
                .ref("videos")
                .child(video.name)
                .getDownloadURL()
                .then(url=>{
                    //post video inside of the db
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        videoUrl:url,
                        username:username,
                        
                    });
                    setProgress(0);
                    setCaption("");
                    setVideo(null);
                })
            }
        )
        
    }
    return (
        <div className="videoUpload">
            <progress className="videoUpload_progress" value={progress} max="100"/>        
            <input type="text" placeholder='Enter a caption' onChange={event=>setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange}/>
            <Button className="videoUrl" onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default VideoUpload
