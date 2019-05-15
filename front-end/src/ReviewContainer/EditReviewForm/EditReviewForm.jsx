import React, { Component } from 'react';

class EditReviewForm extends Component{
    constructor(){
        super();
        this.state = {
            reviewName: this.reviewName,
            peakName: this.peakName,
            review: this.review
        }
    }

    handleChange = (e)=>{
        this.setState({value: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.updateReview(this.state);
    }

    render(){
        return <form onSubmit={this.handleSubmit}>
            review Name: <input onChange = {this.handleChange} type="text" name="reviewName" />
            peak Name: <input onChange = {this.handleChange} type="text" name="peakName" />
            Review: <input onChange = {this.handleChange} type="text" name="review" />
            <input type="submit"/>
        </form>
    }
}
export default EditReviewForm