import React from 'react';
//import EditReviewForm from '../EditReviewForm/EditReviewForm';

function ReviewDetail(props){
    return(
        <div>
            <br></br>
            <p>{props.review.reviewName}  -  {props.review.peakName} </p>
            <p>{props.review.review}</p>
            <button onClick={props.openEditReview.bind(null, props.review)}>Edit</button>
            <button onClick={props.deleteReview.bind(null, props.review._id)}>Delete</button>
        </div>
    )
}

export default ReviewDetail