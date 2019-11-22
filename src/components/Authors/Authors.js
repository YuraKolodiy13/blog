import React from 'react'
import {Link} from  'react-router-dom'

const Authors = props => {
  return(
    <div className="posts__authors">
      {props.posts.map((item, key) =>
        <div className='post__author' key={key}>
          <Link to={`/user/${item.author._id}`} >{item.author.name}</Link>
        </div>
      )}
    </div>
  )
}

export default Authors