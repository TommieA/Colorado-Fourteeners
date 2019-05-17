const express = require("express");
const router = require("express").Router();
const Review = require("../models/Review");

// List all Reviews
router.get("/", async (req, res)=>{
    try{
        const allReviews = await Review.find({});
        res.json({
            data: allReviews,
            status: 200
        })
        }
        catch(err){
            res.send(err)
        }
});


// Add Route
router.post("/", async (req, res)=>{
    try { 
        const newReview = await Review.create(req.body);
        res.json({
            status: 200,
            data: newReview
        });
        }
        catch(err){
            res.send(err)
        }
});

// Find Route
router.get('/:id', async (req, res, next) => {
    try {
        const foundReview = await Review.findById(req.params.id);
        res.json({
            status: 200,
            data: foundReview
        });
        } 
        catch (err){
            res.send(err);
        }
});

// Update Route
router.put('/:id', async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {new: true});
        console.log(updatedReview);
        res.json({
            status: 200,
            data: updatedReview
        });
        } 
        catch(err){
            res.send(err)
        }
});


// Delete route
router.delete('/:id', async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndRemove(req.params.id);
        res.json({
            status: 200,
            data: deletedReview
        });
        } 
        catch(err){
            res.send(err);
        }
});


module.exports = router;