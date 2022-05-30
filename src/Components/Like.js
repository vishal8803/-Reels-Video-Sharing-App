import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';

function Like({user,post}) {
  const [like, setLike] = useState(null);

  useEffect(()=>{
      let check = post.likes.includes(user.userId)?true : false;
      setLike(check);
  },[post])

  const handleLike = ()=>{
    if(like){
        let narr = post.likes.filter((el)=>el != user.userId)
        database.posts.doc(post.postId).update({
            likes: narr
        })
    }else{
        let narr = [...post.likes,user.userId]
        database.posts.doc(post.postId).update({
            likes: narr
        })
    }
  }

  return (
      <>
    {
        
        like!=null?
        like==true?<FavoriteIcon className='like-styling like' onClick={handleLike} fontSize="large" /> : <FavoriteIcon className='like-styling dislike' onClick={handleLike} fontSize='large' />
        :<></>
    }
    </>
  )
}

export default Like