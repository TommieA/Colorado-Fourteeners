import React, {Component} from 'react';
import './App.css';
import {Switch, Route, Link } from 'react-router-dom';
import ReviewContainer from './ReviewContainer/ReviewContainer';

function App(){
    return (
        <div className="App">
            <ReviewContainer></ReviewContainer>
        </div>
    )
}

export default App;
