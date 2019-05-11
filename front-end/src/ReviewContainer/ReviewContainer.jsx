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
        const reviews = await fetch("http://localhost:9000/reviews", {
            credentials: 'include'
        })
        const parsedReviews = await reviews.json();
        console.log(parsedReviews)
        if(parsedReviews.status === 200){
            this.setState({
                reviews: parsedDrinks.data
            })
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
            return <ReviewDetail drink={drink}></ReviewDetail>
        })
        return <div>
            <h1>Welcome to the drinks app</h1>
            <Link to="/reviews/new">Add a drink</Link>
            <Link to="/reviews">Reviews index</Link>
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