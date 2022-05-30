import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import { CircularProgress } from '@mui/material';
import { Avatar } from '@mui/material';
import Like from './Like';
import Video from './Video';
import "./Post.css"

function Post({user}) {
  const [posts, setPosts] = useState(null);

  useEffect(()=>{
    let parr = []
    
    const unsub = database.posts.orderBy('createdAt','desc').onSnapshot((snapshot)=>{
        parr = []
        snapshot.forEach((obj)=>{
            let data = {...obj.data(), postId:obj.id};
            parr.push(data);
        })
        setPosts(parr);
    })

    return ()=>unsub();

  },[])

  console.log(posts) 

  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        {
            posts==null || user==null ? <CircularProgress /> : 
            <div className='video-container'>
                {
                    posts.map((post,index)=>(
                        <React.Fragment key={index}>
                            <div className='videos'>
                                <Video src={post.pUrl} />
                                <div className="fa" style={{display:'flex'}}>
                                    <Avatar style={{marginRight:'1rem'}} src={post.userImage} />
                                    <h4>{post.user}</h4>
                                    <Like user={user} post={post}/>
                                </div>
                            </div>
                            
                        </React.Fragment>
                    ))
                }
            </div>
        }
    </div>
  )
}

export default Post