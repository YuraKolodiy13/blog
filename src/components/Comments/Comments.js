import React from 'react'
import './Comments.scss'

const Comments = props => {
  return(
    <div className='comments'>
      <h2>{props.comments.length} Comments</h2>
      <div className="comments__items">
        {props.comments.map((item, key) =>
          <div key={key} className='comments__item'>
            <h4>{item.author.name} says: {item.author._id === props.post.author._id ? <span>author</span> : null}</h4>
            <p>{item.text}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comments