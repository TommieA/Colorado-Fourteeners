import React from 'react';

function ReviewDetail(props){
  
    return(<div>
        <br></br>
        <p>{props.review.reviewName}  -  {props.review.mountainName} 
        <p>{props.review.review}</p>
           <button id="editDelete">Edit/Delete</button></p>
    </div>)
}

export default ReviewDetail