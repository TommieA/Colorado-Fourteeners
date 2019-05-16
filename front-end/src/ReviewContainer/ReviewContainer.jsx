import React, {Component} from 'react';
import ReviewDetail from './ReviewDetail/ReviewDetail';
import {Switch, Route, Link, withRouter} from 'react-router-dom';
import NewReviewForm from './NewReviewForm/NewReviewForm.jsx';
import EditReviewForm from './EditReviewForm/EditReviewForm.jsx';
import PeakDetailsForm from './PeakDetailsForm/PeakDetailsForm.jsx';

class ReviewContainer extends Component{
    constructor(){
        super();
        this.state = {
            reviews: [],
            reviewToEdit: {}
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
    openEditReview = async (review) =>{
        this.setState({
            reviewToEdit: review
        })
        this.props.history.push('/reviews/edit');
    }
    editReview = async (data, id) => {
        try {
            const editReview = await fetch('http://localhost:9000/reviews/' + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
         
        const parsedResponse = await editReview.json();
        console.log(parsedResponse.data);
        const editedReviewArray = this.state.reviews.map((review) => {
       
        if(review._id === this.state.reviewToEdit._id){
            review = parsedResponse.data;
        }
        return review
        });
       console.log(editedReviewArray);
        this.setState({
            reviews: editedReviewArray
        })

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
        };
    };

    peakDetails = async (id, e) => {
        console.log("peakDetails");
        e.preventDefault();
   
        const searchURL = `https://cors-anywhere.herokuapp.com/https://colorado-14ers-api.herokuapp.com/api/v1/peaks/14`
        const result = await fetch (searchURL);
        const parsedResult = await result.json();
        this.setState({
            fourteenerArray: await parsedResult
        });        
    };

    render(){
        console.log(this.state);
        const reviewsList = this.state.reviews.map((review)=>{
            return <ReviewDetail review={review} openEditReview={this.openEditReview} 
                    deleteReview={this.deleteReview} peakDetails={this.peakDetails}></ReviewDetail>
        })
        return <div>
            <h1>Colorado Fourteeners</h1>
            <Link to="/reviews"><button>Show Reviews</button></Link>
            <Link to="/reviews/new"><button>Add a new Review</button></Link>
            <Switch>
                <Route exact path="/reviews" render={() => {
                    return <div>{reviewsList}</div>
                }}/>
                <Route exact path="/reviews/new" render={() => {
                    return <NewReviewForm createReview={this.createReview}></NewReviewForm>
                }}/>
                <Route exact path="/reviews/edit" render={() => {
                    return <EditReviewForm review={this.state.reviewToEdit} editReview={this.editReview}></EditReviewForm>
                }}/>
                <Route exact path="/reviews/peakDetails" render={() => {
                    return <PeakDetailsForm peakDetails={this.peakDetails}></PeakDetailsForm>
                }}/>
            </Switch>
        </div>
    }
}

export default withRouter(ReviewContainer)