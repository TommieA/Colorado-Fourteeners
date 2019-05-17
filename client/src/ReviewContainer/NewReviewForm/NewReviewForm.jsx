import React, {Component } from 'react';

class NewReviewForm extends Component{
    constructor(){
        super();
        this.state = {
            name: ""
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createReview(this.state);
        e.target.reset()
    }

    render(){
        return <form onSubmit={this.handleSubmit}>
            <br/>
            Review Name: <input onChange = {this.handleChange} type="text" name="reviewName" />
            Peak Name: <input onChange = {this.handleChange} type="text" name="peakName" />
            Review: <input onChange = {this.handleChange} type="text" name="review" />
            <input type="submit"/>
        </form>
    }
}
export default NewReviewForm