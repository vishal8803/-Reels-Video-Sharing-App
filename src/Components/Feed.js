import React, {useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'

function Feed() {
    const {logout} = useContext(AuthContext);
    
    
  return (
      <>
    <div>Feed</div>
    <button onClick={logout} >Logout</button>
    </>
  )
}

export default Feed