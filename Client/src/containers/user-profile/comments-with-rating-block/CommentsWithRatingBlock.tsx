import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Select, MenuItem, ListItemText } from '@mui/material'

import Loader from '~/components/loader/Loader'
import { SortByEnum } from '~/types'
import {
  AccountCircle,
  BusinessCenter,
  Celebration,
  Computer,
  Construction
} from '@mui/icons-material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import StudentCalendar from './CalendarBlock'
const StudentProfileBlock = () => {
  const [sortBy, setSortBy] = useState<SortByEnum>(SortByEnum.Newest)

  const personalInfo = {
    firstName: 'Юля',
    lastName: 'Романик',
    professionalStatus: 'Студентка Комп’ютерних наук',
    language: 'Українська',
    aboutStudent:
      'Я захоплююся програмуванням, штучним інтелектом та веброзробкою. Маю досвід роботи в AI лабораторії та створення чат-ботів для підтримки клієнтів.'
  }

  const academicAchievements = ['Бакалавр з комп’ютерних наук']

  const projects = [
    'Чат-бот на основі AI для підтримки клієнтів',
    'Вебсайт для електронної комерції',
    'Мобільний додаток для управління завданнями'
  ]

  const skills = [
    'JavaScript, React, Node.js',
    'Машинне навчання (TensorFlow, PyTorch)',
    'Веброзробка (HTML, CSS, JavaScript)',
    'Управління базами даних (MySQL, MongoDB)'
  ]

  const reviews = [
    {
      id: '1',
      comment: 'Чудова робота над проєктом! Дуже рекомендую.',
      author: 'Іван Петренко',
      createdAt: '2023-12-01',
      rating: 5
    },
    {
      id: '2',
      comment: 'Відмінна студентка, добре знається на машинному навчанні.',
      author: 'Ольга Сидоренко',
      createdAt: '2023-11-20',
      rating: 4
    },
    {
      id: '3',
      comment: 'Добре володіє навичками веброзробки.',
      author: 'Марк Жуков',
      createdAt: '2023-10-15',
      rating: 4.9
    }
  ]

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as SortByEnum)
  }

  const sortedReviews = reviews.slice().sort((a, b) => {
    if (sortBy === SortByEnum.Newest) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === SortByEnum.highestRating) {
      return b.rating - a.rating
    } else if (sortBy === SortByEnum.lowestRating) {
      return a.rating - b.rating
    }
    return 0
  })

  return (
    <>
      <Box
        sx={{
          maxWidth: '1500px !important',
          flexDirection: 'column',
          minHeight: '650px',
          padding: '40px',
          margin: '40px auto',
          borderRadius: '12px',
          textAlign: 'center',
          backgroundColor: '#fff',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* <StudentCalendar /> */}
        {/* Персональна інформація */}
        <Box
          sx={{
            marginBottom: '30px',
            padding: '20px',
            backgroundColor: 'rgba(166, 160, 255, 0.34)',
            borderRadius: '20px',
            textAlign: 'left'
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Montserrat, sans-serif !important',
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#413B90',
              marginBottom: '15px'
            }}
          >
            <BusinessCenter />
            Персональна інформація
          </Typography>

          <Typography
            sx={{
              fontSize: '16px',
              color: 'rgb(88, 83, 167)',
              fontFamily: 'Montserrat, sans-serif !important',
              marginBottom: '8px'
            }}
          >
            <b>Професійний статус:</b> {personalInfo.professionalStatus}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              color: 'rgb(88, 83, 167)',
              fontFamily: 'Montserrat, sans-serif !important',
              marginBottom: '8px'
            }}
          >
            <b>Мова навчання та співпраці:</b> {personalInfo.language}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              color: 'rgb(88, 83, 167)',
              fontFamily: 'Montserrat, sans-serif !important',
              marginTop: '15px'
            }}
          >
            {personalInfo.aboutStudent}
          </Typography>
        </Box>

        {/* Академічні досягнення */}
        <Box
          sx={{
            marginBottom: '30px',
            padding: '20px',
            backgroundColor: 'rgba(227, 242, 253, 0.77)',
            borderRadius: '20px',
            textAlign: 'left'
          }}
        >
          <Typography
            sx={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: 'rgb(28, 81, 124)',
              fontFamily: 'Montserrat, sans-serif !important',
              marginBottom: '15px'
            }}
          >
            <Celebration />
            Академічні досягнення
          </Typography>
          {academicAchievements.map((achievement, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: '16px',
                marginBottom: '8px',
                fontFamily: 'Montserrat, sans-serif !important',
                color: 'rgb(73, 123, 163)'
              }}
            >
              {achievement}
            </Typography>
          ))}
        </Box>

        {/* Проєкти */}
        <Box
          sx={{
            marginBottom: '30px',
            padding: '20px',
            backgroundColor: '#D9D9D9',
            borderRadius: '20px',
            textAlign: 'left'
          }}
        >
          <Typography
            sx={{
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '15px',
              fontFamily: 'Montserrat, sans-serif !important'
            }}
          >
            <Computer />
            Проєкти
          </Typography>
          {projects.map((project, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: '16px',
                marginBottom: '8px',
                fontFamily: 'Montserrat, sans-serif !important'
              }}
            >
              {project}
            </Typography>
          ))}
        </Box>

        {/* Навички */}
        <Box
          sx={{
            marginBottom: '30px',
            padding: '20px',
            backgroundColor: 'rgba(90, 145, 88, 0.69)',
            borderRadius: '20px',
            textAlign: 'left'
          }}
        >
          <Typography
            sx={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: 'rgb(43, 85, 41)',
              marginBottom: '15px',
              fontFamily: 'Montserrat, sans-serif !important'
            }}
          >
            <Construction />
            Навички
          </Typography>
          {skills.map((skill, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: '16px',
                color: 'rgb(42, 90, 38)',
                marginBottom: '8px',
                fontFamily: 'Montserrat, sans-serif !important'
              }}
            >
              {skill}
            </Typography>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: '#F0F4FF',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >
        <Typography
          variant='h6'
          color='#413B90'
          gutterBottom
          sx={{
            textAlign: 'center',
            fontSize: '22px',
            fontFamily: 'Montserrat, sans-serif !important'
          }}
        >
          <EmojiEventsIcon
            sx={{ verticalAlign: 'middle', mr: 1, textAlign: 'center' }}
          />{' '}
          Відгуки
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            textAlign: 'center',
            fontSize: '16px',
            fontFamily: 'Montserrat, sans-serif !important'
          }}
        >
          Ознайомтесь із відгуками про користувача
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 3,
            alignItems: 'center'
          }}
        >
          {sortedReviews.map((review) => (
            <Box
              key={review.id}
              sx={{
                backgroundColor: 'white',
                padding: '15px 20px',
                borderRadius: '12px',
                maxWidth: '400px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}
            >
              <Typography variant='subtitle1' color='#413B90' fontWeight='bold'>
                {review.author}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                ⭐ {review.rating}/5
              </Typography>
              <Typography variant='body2' color='text.primary'>
                "{review.comment}"
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default StudentProfileBlock
