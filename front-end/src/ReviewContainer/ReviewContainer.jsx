import React, {Component} from 'react';
import ReviewDetail from './ReviewDetail/ReviewDetail';
import {Switch, Route, Link, withRouter} from 'react-router-dom';
import NewReviewForm from './NewReviewForm/NewReviewForm.jsx';
import EditReviewForm from './EditReviewForm/EditReviewForm.jsx';
import WeatherForm from './WeatherForm/WeatherForm.jsx';


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
        this.weatherDenver();
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

    weatherDenver = async (e) => {
        console.log("weatherDenver");
   
        const searchURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/de065688f218744f9923500ef3357a38/39.7392358,-104.990251`
        const result = await fetch (searchURL);
        const parsedResult = await result.json();   
         
        this.setState({
            temperature: parsedResult.currently.temperature,
            forecast: parsedResult.currently.summary
        });          
    };

    render(){
        console.log(this.state);
        const reviewsList = this.state.reviews.map((review)=>{
            return <ReviewDetail review={review} openEditReview={this.openEditReview} 
                    deleteReview={this.deleteReview}></ReviewDetail>
        })
        return <div>
            <h1>Colorado Fourteeners</h1>
            <h4>The current temperature in Denver is {this.state.temperature}</h4>
            <h4>It is {this.state.forecast}</h4>
            <br/>
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
                {/* <Route exact path="/reviews/peakWeather" render={() => {
                    return <peakWeatherForm peakWeather={this.peakWeather}></peakWeatherForm>
                }}/> */}
            </Switch>
        </div>
    }
}

export default withRouter(ReviewContainer)