import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, TextField } from "@mui/material";
import { Star } from "@mui/icons-material";

const RatingReviewDialog = ({ open, handleClose, handleSubmit }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleStarClick = (value) => {
    setRating(value);
  };

  const onSubmit = () => {
    if (rating > 0 && reviewText.trim() !== "") {
      handleSubmit(rating, reviewText);
    } else {
      alert("Please provide both a rating and a review.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Rate & Review</DialogTitle>
      <DialogContent>
        <div className="flex space-x-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <IconButton
              key={star}
              onClick={() => handleStarClick(star)}
              sx={{ color: star <= rating ? "#673AB7" : "gray" }}
            >
              <Star />
            </IconButton>
          ))}
        </div>
        <TextField
          label="Write your review"
          fullWidth
          multiline
          rows={3}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} disabled={rating === 0 || reviewText.trim() === ""} variant="contained" sx={{ backgroundColor: "#673AB7" }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RatingReviewDialog;
