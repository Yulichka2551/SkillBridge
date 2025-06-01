export const getReviews = (tutorId: string) => {
  const stored = localStorage.getItem(`reviews-${tutorId}`)
  return stored ? JSON.parse(stored) : []
}

export const addReview = (
  tutorId: string,
  review: { rating: number; comment: string }
) => {
  const currentReviews = getReviews(tutorId)
  const updated = [...currentReviews, review]
  localStorage.setItem(`reviews-${tutorId}`, JSON.stringify(updated))
  return updated
}

export const calculateAverageRating = (reviews: { rating: number }[]) => {
  if (!reviews.length) return 0
  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  return total / reviews.length
}
