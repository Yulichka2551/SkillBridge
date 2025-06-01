import React, { useState } from 'react'
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Rating,
  Button
} from '@mui/material'

const ReviewDrawer = ({ open, onClose, tutor, onSubmit }) => {
  const [reviewText, setReviewText] = useState('')
  const [ratingValue, setRatingValue] = useState(5)

  const handleSubmit = () => {
    onSubmit({ reviewText, ratingValue })
    setReviewText('')
    setRatingValue(5)
    onClose()
  }

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box sx={{ width: 350, padding: 3 }}>
        <Typography variant='h6' gutterBottom>
          Залишити відгук для {tutor.name}
        </Typography>
        <TextField
          label='Ваш відгук'
          multiline
          rows={4}
          fullWidth
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Typography component='legend'>Оцінка</Typography>
        <Rating
          name='rating'
          value={ratingValue}
          onChange={(_, newValue) => {
            setRatingValue(newValue)
          }}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Надіслати
        </Button>
      </Box>
    </Drawer>
  )
}

export default ReviewDrawer
