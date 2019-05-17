import React, { Component } from 'react';

class EditReviewForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            reviewName: this.props.reviewName,
            peakName:   this.props.review.peakName,
            review:     this.props.review.review
        }
    }

    componentDidMount() {
        this.setState({
            reviewName: this.props.review.reviewName
        })
    }

    
    handleChange = (e) => {
        console.log('ch ch ch changess');
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        console.log(this.props.review._id);
        e.preventDefault();
        this.props.editReview(this.state, this.props.review._id);
    }

    render() {
        console.log(this.props);
        return <form onSubmit={this.handleSubmit}>
            <br/>
            Review Name: <input onChange = {this.handleChange} type="text" name="reviewName" value={this.state.reviewName}/>
            Peak Name: <input onChange = {this.handleChange} type="text" name="peakName" value={this.state.peakName}/>
            Review: <input onChange = {this.handleChange} type="text" name="review" value={this.state.review}/>
            <input type="submit"/>
        </form>
    }
}
export default EditReviewForm