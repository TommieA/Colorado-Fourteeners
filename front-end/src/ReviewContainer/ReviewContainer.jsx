import React, {Component} from 'react';
import ReviewDetail from './ReviewDetail/ReviewDetail';
import {Switch, Route, Link} from 'react-router-dom';
import NewReviewForm from './NewReviewForm/NewReviewForm';

export default class ReviewContainer extends Component{
    constructor(){
        super();
        this.state = {
            reviews: []
        }
    }
    
    componentDidMount(){
        this.getReviews();
    }

    getReviews = async ()=>{

        try {
            const reviews = await fetch("http://localhost:9000/reviews", {
                credentials: 'include'
            })

            const parsedReviews = await reviews.json();
            console.log(parsedReviews.data)
            if(parsedReviews.status === 200){
                this.setState({reviews: parsedReviews.data})
            }
            }
            catch (err){
                console.log(err)
            }
    }

    createReview = async (formData)=>{
        console.log(formData);
        const newReview = await fetch("http://localhost:9000/reviews", {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const parsedResponse = await newReview.json();
        console.log(parsedResponse);
        if(parsedResponse.status === 200){
            this.setState({
                reviews: [...this.state.reviews, parsedResponse.data]
            }, ()=>{
                this.props.history.push("/reviews")
            })
        }
    }

    render(){
        const reviewsList = this.state.reviews.map((review)=>{
            return <ReviewDetail review={review}></ReviewDetail>
        })
        return <div>
            <h1>Colorado Fourteeners</h1>
            <Link to="/reviews"><button>Show Reviews</button></Link>
            <Link to="/reviews"><button>Add a new Review</button></Link>
            {/* <button onClick={showFourteeners}>14ers Website</button> */}
            <Switch>
                <Route exact path="/reviews" render={()=>{
                    return <div>{reviewsList}</div>
                }}/>
                <Route exact path="/reviews/new" render={()=>{
                    return <NewReviewForm createReview={this.createReview}></NewReviewForm>
                }}/>
            </Switch>
        </div>
    }
}