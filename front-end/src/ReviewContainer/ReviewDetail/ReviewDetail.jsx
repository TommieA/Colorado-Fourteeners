import React from 'react';
//import EditReviewForm from '../EditReviewForm/EditReviewForm';

function ReviewDetail(props){
    console.log(props.review);


    return(
        <div>
            <br></br>
            <p>{props.review.reviewName}  -  {props.review.peakName} 
            <p>{props.review.review}</p>
            <button onClick={props.editReview.bind(null, props.review)}>Edit</button>
            <button onClick={props.deleteReview.bind(null, props.review._id)}>Delete</button>
            <button onClick={props.peakDetails.bind(null, props.review._id)}>Peak Details</button></p>
        </div>
    )
}

export default ReviewDetail