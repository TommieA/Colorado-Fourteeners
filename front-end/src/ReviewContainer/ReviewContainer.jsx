import React, {Component} from 'react';
import ReviewDetail from './ReviewDetail/ReviewDetail';
import {Switch, Route, Link} from 'react-router-dom';
import NewReviewForm from './NewReviewForm/NewReviewForm.jsx';
import EditReviewForm from './EditReviewForm/EditReviewForm.jsx';

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

    getReviews = async () => {

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

    editReview = async (id, e) => {
        console.log('editReview', id);
        e.preventDefault();
        try {
            const editReview = await fetch('http://localhost:9000/reviews/edit' + id, {
            method: 'PUT',
            body: JSON.stringify(this.state.reviewToEdit),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          
        const parsedResponse = await editReview.json();
        
        this.setState({reviews:[...this.state.reviews, parsedResponse.data]})
        
        const editedReviewArray = this.state.reviews.map((review) => {
        
        if(review._id === this.state.reviewToEdit._id){
            review = parsedResponse.data;
        }
        return review
        });

        this.setState({reviews: editedReviewArray})

        }
        catch(err){
        console.log(err);
        }
    }

    deleteReview = async (id, e) => {   
        e.preventDefault();
        try {
            const deleteReview = await fetch('http://localhost:9000/reviews/' + id, {
                method: 'DELETE'
                });
                
                const deleteReviewJson = await deleteReview.json();
                this.setState({reviews: this.state.reviews.filter((review, i) => review._id !== id)});
            } 
            catch(err) {
            console.log(err)
            }
        }

    createReview = async (formData) => {
        const newReview = await fetch("http://localhost:9000/reviews", {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const parsedResponse = await newReview.json();
        if(parsedResponse.status === 200){
            this.setState({reviews: [...this.state.reviews, parsedResponse.data]})
        }
    }

    peakDetails = async (id, e) => {
        console.log("peakDetails");
        e.preventDefault();
        <link to="colorado-14ers-api"></link>
    }

    render(){
        console.log(this.state);
        const reviewsList = this.state.reviews.map((review)=>{
            return <ReviewDetail review={review} editReview={this.editReview} 
                    deleteReview={this.deleteReview} peakDetails={this.peakDetails}></ReviewDetail>
        })
        return <div>
            <h1>Colorado Fourteeners</h1>
            <Link to="/reviews"><button>Show Reviews</button></Link>
            <Link to="/reviews/new"><button>Add a new Review</button></Link>
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