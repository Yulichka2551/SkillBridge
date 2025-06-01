import React, { useState, useEffect } from 'react'

const FindOffers = () => {
  const [tutors, setTutors] = useState([])
  const [selectedTutor, setSelectedTutor] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    // Ініціалізація списку викладачів
    const initialTutors = [
      {
        id: 1,
        name: 'Вікторія Сидоренко',
        specialization: 'Програмування, Математика',
        experience: 3,
        hours: 150,
        students: 60,
        price: 30,
        rating: 4.5,
        initial: 'В'
      },
      {
        id: 2,
        name: 'Ігор Коваленко',
        specialization: 'Фізика, Хімія',
        experience: 5,
        hours: 300,
        students: 120,
        price: 45,
        rating: 4.8,
        initial: 'І'
      },
      {
        id: 3,
        name: 'Олена Марчук',
        specialization: 'Мови, Література',
        experience: 2,
        hours: 90,
        students: 40,
        price: 25,
        rating: 4.2,
        initial: 'О'
      },
      {
        id: 4,
        name: 'Андрій Лисенко',
        specialization: 'Музика, Мистецтво',
        experience: 4,
        hours: 200,
        students: 70,
        price: 35,
        rating: 4.7,
        initial: 'А'
      },
      {
        id: 5,
        name: 'Олена Марчук',
        specialization: 'Англійська Мова, Література',
        experience: 2,
        hours: 90,
        students: 40,
        price: 25,
        rating: 4.2,
        initial: 'О'
      },
      {
        id: 6,
        name: 'Андрій Лизуник',
        specialization: 'Програмування Java',
        experience: 5,
        hours: 200,
        students: 70,
        price: 90,
        rating: 5.0,
        initial: 'А'
      },
      {
        id: 7,
        name: 'Ірина Романик',
        specialization: 'Українська Мова, Література',
        experience: 2,
        hours: 200,
        students: 90,
        price: 75,
        rating: 4.9,
        initial: 'І'
      },
      {
        id: 8,
        name: 'Владислав Чемерський',
        specialization: 'Фінанси',
        experience: 9,
        hours: 200,
        students: 147,
        price: 120,
        rating: 4.8,
        initial: 'В'
      }
    ]

    // Завантаження відгуків з localStorage
    const storedReviews = JSON.parse(localStorage.getItem('tutorReviews')) || {}

    // Оновлення рейтингу викладачів на основі збережених відгуків
    const updatedTutors = initialTutors.map((tutor) => {
      const reviews = storedReviews[tutor.id] || []
      if (reviews.length > 0) {
        const averageRating =
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        return { ...tutor, rating: parseFloat(averageRating.toFixed(2)) }
      }
      return tutor
    })

    setTutors(updatedTutors)
  }, [])

  const handleReviewSubmit = ({ reviewText, ratingValue }) => {
    const storedReviews = JSON.parse(localStorage.getItem('tutorReviews')) || {}
    const tutorId = selectedTutor.id
    const tutorReviews = storedReviews[tutorId] || []

    const newReview = {
      text: reviewText,
      rating: ratingValue,
      date: new Date().toISOString()
    }

    const updatedReviews = [...tutorReviews, newReview]
    storedReviews[tutorId] = updatedReviews
    localStorage.setItem('tutorReviews', JSON.stringify(storedReviews))

    // Оновлення рейтингу викладача
    const averageRating =
      updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
      updatedReviews.length

    setTutors((prevTutors) =>
      prevTutors.map((tutor) =>
        tutor.id === tutorId
          ? { ...tutor, rating: parseFloat(averageRating.toFixed(2)) }
          : tutor
      )
    )
  }

  return (
    <div>
      {/* Відображення списку викладачів */}
      {tutors.map((tutor) => (
        <TutorCard
          key={tutor.id}
          tutor={tutor}
          onLeaveReview={() => {
            setSelectedTutor(tutor)
            setIsDrawerOpen(true)
          }}
        />
      ))}

      {/* Бічна панель для залишення відгуку */}
      {selectedTutor && (
        <ReviewDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          tutor={selectedTutor}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  )
}

export default FindOffers
