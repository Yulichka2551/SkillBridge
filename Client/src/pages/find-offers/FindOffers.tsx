import { useCallback, useEffect, ChangeEvent, useState, useRef } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'

import { OfferService } from '~/services/offer-service'
import useBreakpoints from '~/hooks/use-breakpoints'
import AppPagination from '~/components/app-pagination/AppPagination'
import Drawer from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import { countActiveOfferFilters } from '~/utils/count-active-filters'
import { useFilterQuery } from '~/hooks/use-filter-query'
import { useAppDispatch } from '~/hooks/use-redux'
import usePagination from '~/hooks/table/use-pagination'
import useAxios from '~/hooks/use-axios'
import { getOpositeRole } from '~/utils/helper-functions'

import {
  SizeEnum,
  GetOffersParams,
  GetOffersResponse,
  StatusEnum,
  UserRole
} from '~/types'
import {
  defaultFilters,
  defaultResponse,
  itemsPerPage
} from '~/pages/find-offers/FindOffers.constants'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import { fetchUserById } from '~/redux/features/editProfileSlice'
import {
  Avatar,
  Button,
  Card,
  IconButton,
  InputBase,
  MenuItem,
  Rating,
  Select,
  Typography
} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { UserRoleEnum } from '~/types'
import { useAppSelector } from '~/hooks/use-redux'
import { student } from '~/constants'

const FindOffers = () => {
  const { userRole, userId } = useAppSelector((state) => state.appMain)
  const { isMobile } = useBreakpoints()
  const dispatch = useAppDispatch()

  const itemsPerPageMock = 10

  const oppositeRole = getOpositeRole(userRole)

  const isTutor = userRole === UserRoleEnum.Tutor

  const { filters, searchParams } = useFilterQuery({
    defaultFilters: defaultFilters(oppositeRole),
    countActiveFilters: countActiveOfferFilters
  })

  const getOffers = useCallback(
    (params?: GetOffersParams) => OfferService.getOffers(params),
    []
  )
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  const handleSearchClick = () => {
    const updatedRatings =
      JSON.parse(localStorage.getItem('categoryRatings')) || {}

    const categoryMap = {
      Математика: '5',
      Фінанси: '3',
      Музика: '4',
      Історія: '6',
      Фізика: '2',
      Дизайн: '1'
    }

    const categoryId = categoryMap[category] || null

    if (categoryId) {
      const newRating = getAverageRatingByCategory(categoryId)
      updatedRatings[categoryId] = newRating
      localStorage.setItem('categoryRatings', JSON.stringify(updatedRatings))
    }

    updateInfo()
  }

  const {
    response: offersResponse,
    loading: offersLoading,
    fetchData
  } = useAxios<GetOffersResponse, GetOffersParams>({
    service: getOffers,
    defaultResponse,
    fetchOnMount: false
  })

  const { count: offersCount } = offersResponse

  const { pageCount } = usePagination({
    itemsCount: offersCount,
    itemsPerPage
  })

  useEffect(() => {
    void dispatch(
      fetchUserById({ userId, role: userRole as UserRole, isEdit: false })
    )
  }, [dispatch, userId, userRole])

  const [currentPage, setCurrentPage] = useState(1)

  const targetBlock = useRef<HTMLDivElement>(null)

  const [level, setLevel] = useState('Intermediate')
  const [category, setCategory] = useState('Mathematics')
  const [price, setPrice] = useState('$20,00-$4,000')
  const [tutors, setTutors] = useState([])
  const [students, setStudents] = useState([])
  const [selectedTutor, setSelectedTutor] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedTutorDetails, setSelectedTutorDetails] = useState(null)
  const [selectedStudentDetails, setSelectedStudentDetails] = useState(null)
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false)
  const [selectedTutorReviews, setSelectedTutorReviews] = useState([])
  const [selectedStudentReviews, setSelectedStudentReviews] = useState([])

  useEffect(() => {
    const initialStudents = [
      {
        id: 1,
        name: 'Олена Шевченко',
        firstName: 'Олена',
        lastName: 'Шевченко',
        level: 'Початковий',
        category: 'Англійська мова',
        location: 'Київ, Україна',
        requestTitle: 'Потрібен викладач англійської',
        language: 'Українська',
        initial: 'OШ',
        pricePerLesson: 500,
        requestDescription:
          'Хочу покращити розмовну англійську, готуюсь до ЗНО. Потрібні індивідуальні уроки 2 рази на тиждень.'
      },
      {
        id: 2,
        name: 'Андрій Бобеляк',
        firstName: 'Андрій',
        lastName: 'Бобеляк',
        level: 'Середній',
        category: 'Математика',
        location: 'Львів, Україна',
        requestTitle: 'Підготовка до НМТ з математики',
        language: 'Українська',
        pricePerLesson: 250,
        initial: 'АБ',
        requestDescription:
          'Шукаю викладача, який допоможе зрозуміти алгебру та геометрію для успішного складання НМТ.'
      },
      {
        id: 3,
        name: 'Софія Марчук',
        firstName: 'Софія',
        lastName: 'Марчук',
        level: 'Високий',
        category: 'Українська мова та література',
        location: 'Одеса, Україна',
        requestTitle: 'Поглиблене вивчення літератури',
        language: 'Українська',
        initial: 'СМ',
        pricePerLesson: 300,
        requestDescription:
          'Зацікавлена у підготовці до університету з акцентом на українську літературу та письмо.'
      },
      {
        id: 4,
        name: 'Максим Ковальчук',
        firstName: 'Максим',
        lastName: 'Ковальчук',
        level: 'Початковий',
        category: 'Програмування',
        location: 'Харків, Україна',
        requestTitle: 'Вивчення JavaScript з нуля',
        language: 'Російська',
        initial: 'МК',
        pricePerLesson: 400,
        requestDescription:
          'Планую розпочати кар’єру веб-розробника, потрібна базова підготовка та практика.'
      },
      {
        id: 5,
        name: 'Юля Романик',
        firstName: 'Юля',
        lastName: 'Романик',
        level: 'Середній',
        category: 'Музика',
        location: 'Львів, Україна',
        requestTitle: 'Вивчення JavaScript з нуля',
        language: 'Українська',
        initial: 'ЮР',
        pricePerLesson: 350,
        requestDescription:
          'Планую розпочати кар’єру веб-розробника, потрібна базова підготовка та практика.'
      },
      {
        id: 6,
        name: 'Віктор Захаров',
        firstName: 'Віктор',
        lastName: 'Захаров',
        level: 'Початковий',
        category: 'Фінанси',
        location: 'Чернівці, Україна',
        requestTitle: 'Основи фінансової грамотності',
        language: 'Українська',
        initial: 'ВЗ',
        pricePerLesson: 200,
        requestDescription:
          'Зацікавлений у навичках управління особистим бюджетом і інвестування.'
      },
      {
        id: 7,
        name: 'Катерина Демченко',
        firstName: 'Катерина',
        lastName: 'Демченко',
        level: 'Середній',
        category: 'Іноземні мови',
        location: 'Запоріжжя, Україна',
        requestTitle: 'Вивчення німецької мови для подорожей',
        language: 'Українська',
        initial: 'КД',
        pricePerLesson: 450,
        requestDescription:
          'Потрібна допомога з граматикою та розмовною практикою для поїздки до Німеччини.'
      },
      {
        id: 8,
        name: 'Роман Шевченко',
        firstName: 'Роман',
        lastName: 'Шевченко',
        level: 'Високий',
        category: 'Історія',
        location: 'Полтава, Україна',
        requestTitle: 'Підготовка до олімпіади з історії',
        language: 'Українська',
        initial: 'РШ',
        pricePerLesson: 320,
        requestDescription:
          'Хочу систематизувати знання та підготуватися до всеукраїнської олімпіади.'
      }
    ]
    const storedReviews =
      JSON.parse(localStorage.getItem('studentReviews')) || {}

    const updatedStudents = initialStudents.map((student) => {
      const reviews = storedReviews[student.id] || [] // Get reviews for the current tutor
      const reviewCount = reviews.length
      if (reviews.length > 0) {
        const averageRating =
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        return {
          ...student,
          rating: parseFloat(averageRating.toFixed(2)),
          reviewCount
        }
      }
      return { ...student, reviewCount: 0 }
    })

    setStudents(updatedStudents)
  }, [])

  useEffect(() => {
    const initialTutors = [
      {
        id: 1,
        name: 'Олена Іваненко',
        firstName: 'Олена',
        lastName: 'Іваненко',
        location: 'Київ, Україна',
        professionalTitle: 'Сертифікований викладач англійської мови',
        specialization: 'Англійська мова',
        students: 70,
        hours: 90,
        experience: 3,
        price: 500,
        teachingLanguage: 'Англійська',
        education: "КНЛУ, спеціальність 'Філологія англійської мови', магістр",
        categories: [
          'Англійська для початківців',
          'Підготовка до ЗНО',
          'Розмовна мова'
        ],
        offerDetails:
          'Індивідуальні онлайн-заняття тривалістю 60 хв. Застосовую комунікативну методику, адаптую програму під потреби учня.'
      },
      {
        id: 2,
        specialization: 'Математика, Вища Математика',
        experience: 5,
        name: 'Андрій Петренко',
        firstName: 'Андрій',
        lastName: 'Петренко',
        students: 90,
        hours: 120,
        price: 250,
        location: 'Львів, Україна',
        professionalTitle: 'Викладач математики з 10-річним досвідом',
        teachingLanguage: 'Українська',
        education: 'ЛНУ ім. Франка, математика, кандидат фіз.-мат. наук',
        categories: [
          'Алгебра',
          'Геометрія',
          'Підготовка до НМТ',
          'Олімпіадна математика'
        ],
        offerDetails:
          'Готую до ЗНО, НМТ та олімпіад. Навчаю зрозуміло та структуровано. Маю власні авторські матеріали.'
      },
      {
        id: 3,
        name: 'Софія Марчук',
        specialization: 'Українська Мова, Література',
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
        name: 'Андрій Лизуник',
        specialization: 'Програмування Java',
        experience: 3,
        hours: 200,
        students: 70,
        price: 90,
        rating: 5.0,
        initial: 'А'
      },
      {
        id: 6,
        name: 'Ірина Романик',
        specialization: 'Українська Мова, Література',
        experience: 2,
        firstName: 'Ірина',
        lastName: 'Романик',
        hours: 200,
        students: 90,
        price: 75,
        location: 'Львів, Україна',
        teachingLanguage: 'Українська',
        professionalTitle: 'Викладач з української мови з 2-річним досвідом',
        rating: 4.9,
        categories: [
          'Українська мова та література',
          'Зарубіжна література',
          'Англійська мова',
          'Підготовка до НМТ'
        ],
        offerDetails:
          'Готую до ЗНО, НМТ та олімпіад. Навчаю зрозуміло та структуровано. Маю власні авторські матеріали.',
        initial: 'І'
      },
      {
        id: 7,
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

    const storedReviews = JSON.parse(localStorage.getItem('tutorReviews')) || {}

    const updatedTutors = initialTutors.map((tutor) => {
      const reviews = storedReviews[tutor.id] || [] // Get reviews for the current tutor
      const reviewCount = reviews.length
      if (reviews.length > 0) {
        const averageRating =
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        return {
          ...tutor,
          rating: parseFloat(averageRating.toFixed(2)),
          reviewCount
        }
      }
      return { ...tutor, reviewCount: 0 }
    })

    setTutors(updatedTutors)
  }, [])

  const topTutors = [...tutors]
    .filter((t) => t.rating) // переконайтесь, що є рейтинг
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  const topStudents = [...students]
    .filter((t) => t.rating) // переконайтесь, що є рейтинг
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    if (targetBlock.current) {
      targetBlock.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleReviewSubmit = ({ reviewText, ratingValue }) => {
    const storedReviews = JSON.parse(localStorage.getItem('tutorReviews')) || {}
    const tutorId = selectedTutor.id // Make sure the tutor ID is used here
    const tutorReviews = storedReviews[tutorId] || []

    const newReview = {
      text: reviewText,
      rating: ratingValue,
      date: new Date().toISOString()
    }

    // Add new review for the tutor
    const updatedReviews = [...tutorReviews, newReview]
    storedReviews[tutorId] = updatedReviews // Store the reviews under the correct tutor ID
    localStorage.setItem('tutorReviews', JSON.stringify(storedReviews))

    // Update the tutor's rating
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

  const handleReviewSubmitStudents = ({ reviewText, ratingValue }) => {
    const storedReviews =
      JSON.parse(localStorage.getItem('studentReviews')) || {}
    const studentId = selectedStudent.id // Make sure the tutor ID is used here
    const studentReviews = storedReviews[studentId] || []

    const newReview = {
      text: reviewText,
      rating: ratingValue,
      date: new Date().toISOString()
    }

    // Add new review for the tutor
    const updatedReviews = [...studentReviews, newReview]
    storedReviews[studentId] = updatedReviews // Store the reviews under the correct tutor ID
    localStorage.setItem('studentReviews', JSON.stringify(storedReviews))

    // Update the tutor's rating
    const averageRating =
      updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
      updatedReviews.length

    setTutors((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? { ...student, rating: parseFloat(averageRating.toFixed(2)) }
          : student
      )
    )
  }

  const filteredTutors = tutors.filter((tutor) =>
    `${tutor.firstName ?? ''} ${tutor.lastName ?? ''}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  const filteredStudents = students.filter((student) =>
    `${student.firstName ?? ''} ${student.lastName ?? ''}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  const paginatedTutors = filteredTutors.slice(
    (currentPage - 1) * itemsPerPageMock,
    currentPage * itemsPerPageMock
  )

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPageMock,
    currentPage * itemsPerPageMock
  )

  const totalPages = Math.ceil(filteredTutors.length / itemsPerPageMock)

  const totalPagesSt = Math.ceil(filteredStudents.length / itemsPerPageMock)

  const TutorCard = ({ tutor }) => (
    <Card
      sx={{
        borderRadius: '20px',
        margin: '50px 0',
        backgroundColor: '#F0EEFF',
        display: 'flex',
        alignItems: 'center',
        padding: '30px 20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Avatar
        sx={{
          width: 64,
          height: 64,
          marginRight: 2,
          backgroundColor: '#8F80F2'
        }}
      >
        {tutor.initial}
      </Avatar>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          {tutor.name}
        </Typography>
        <Typography variant='subtitle2' color='text.secondary'>
          Спеціалізація: {tutor.specialization}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, marginTop: 1, flexWrap: 'wrap' }}>
          <Typography variant='body2'>
            💼 {tutor.experience} роки досвіду
          </Typography>
          <Typography variant='body2'>📚 {tutor.hours} годин занять</Typography>
          <Typography variant='body2'>👩‍🎓 {tutor.students}+ учнів</Typography>
          <Typography variant='body2'>
            💸 гривень {tutor.price},00 / год
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            marginTop: 1
          }}
        >
          <Box
            sx={{
              display: 'flex'
            }}
          >
            <Rating
              name='read-only'
              value={tutor.rating}
              precision={0.1}
              readOnly
            />
            <Typography variant='body2' sx={{ marginLeft: 1 }}>
              {tutor.rating} / 5
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              variant='outlined'
              size='small'
              sx={{ mt: 1, backgroundColor: '#7B68EE', color: 'white' }}
              onClick={() => {
                setSelectedTutor(tutor)
                setIsDrawerOpen(true)
              }}
            >
              Залишити відгук
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 1
        }}
      >
        <Button variant='contained' sx={{ backgroundColor: '#7B68EE' }}>
          Написати
        </Button>
        <Button
          variant='outlined'
          onClick={() => {
            setSelectedTutorDetails(tutor)
            setIsDetailsDrawerOpen(true)
          }}
        >
          Деталі
        </Button>
        <StarBorderIcon sx={{ color: '#7B68EE', marginTop: 1 }} />
      </Box>
    </Card>
  )

  const StudentCard = ({ student }) => (
    <Card
      sx={{
        borderRadius: '20px',
        margin: '50px 0',
        backgroundColor: '#F0EEFF',
        display: 'flex',
        alignItems: 'center',
        padding: '30px 20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Avatar
        sx={{
          width: 64,
          height: 64,
          marginRight: 2,
          backgroundColor: '#8F80F2'
        }}
      >
        {student.initial}
      </Avatar>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          {student.name}
        </Typography>
        <Typography variant='subtitle2' color='text.secondary'>
          Категорія: 📚 {student.category}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, marginTop: 1, flexWrap: 'wrap' }}>
          {/* <Typography variant='body2'>💼 {student.category}</Typography> */}
          <Typography variant='body2'>💼 Рівень: {student.level}</Typography>
          {/* <Typography variant='body2'>👩‍🎓 {student.students}+ учнів</Typography> */}
          <Typography variant='body2'>
            💸 гривень {student.pricePerLesson},00 / год
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            marginTop: 1
          }}
        >
          <Box
            sx={{
              display: 'flex'
            }}
          >
            <Rating
              name='read-only'
              value={student.rating}
              precision={0.1}
              readOnly
            />
            <Typography variant='body2' sx={{ marginLeft: 1 }}>
              {student.rating} / 5
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              variant='outlined'
              size='small'
              sx={{ mt: 1, backgroundColor: '#7B68EE', color: 'white' }}
              onClick={() => {
                setSelectedStudent(student)
                setIsDrawerOpen(true)
              }}
            >
              Залишити відгук
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 1
        }}
      >
        <Button variant='contained' sx={{ backgroundColor: '#7B68EE' }}>
          Написати
        </Button>
        <Button
          variant='outlined'
          onClick={() => {
            setSelectedStudentDetails(student)
            setIsDetailsDrawerOpen(true)
          }}
        >
          Деталі
        </Button>
        <StarBorderIcon sx={{ color: '#7B68EE', marginTop: 1 }} />
      </Box>
    </Card>
  )

  if (isTutor) {
    return (
      <PageWrapper sx={{ maxWidth: '1500px !important' }}>
        <OfferRequestBlock />
        <Box sx={{ marginTop: '70px' }}>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '30px !important',
              paddingBottom: '30px',
              fontWeight: '400 !important',
              fontFamily: 'Montserrat, sans-serif !important',
              color: '#413B90'
            }}
          >
            Ваша експертиза — ключ до успіху учнів
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              paddingBottom: '23px',
              fontWeight: '400 !important',
              fontFamily: 'Montserrat, sans-serif !important',
              color: '#413B90',
              width: '80%',
              margin: '0 auto'
            }}
          >
            Розкрийте свій талант і перетворіть знання на унікальні уроки, що
            змінюють життя. Створіть пропозицію, яка виділить вас серед інших, і
            знайдіть студентів, готових рости разом із вами. Вчити — це
            мистецтво, а ви — справжній майстер
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: '15px 25px',
            borderRadius: '50px',
            boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.1)',
            width: 'fit-content',
            margin: '0 auto',
            gap: '25px'
          }}
        >
          {/* Level */}
          <Box>
            <Typography
              variant='caption'
              sx={{ color: '#8D8BA7', fontFamily: 'Montserrat, sans-serif' }}
            >
              Рівень
            </Typography>
            <Select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              variant='standard'
              disableUnderline
              sx={{
                fontWeight: 'bold',
                color: '#413B90',
                fontFamily: 'Montserrat, sans-serif',
                minWidth: 120
              }}
            >
              <MenuItem value='Beginner'>Початковий</MenuItem>
              <MenuItem value='Intermediate'>Середній</MenuItem>
              <MenuItem value='Advanced'>Просунутий</MenuItem>
              <MenuItem value='Expert'>Експерт</MenuItem>
              <MenuItem value='All levels'>Усі рівні</MenuItem>
            </Select>
          </Box>

          {/* Category */}
          <Box>
            <Typography
              variant='caption'
              sx={{ color: '#8D8BA7', fontFamily: 'Montserrat, sans-serif' }}
            >
              Категорія
            </Typography>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant='standard'
              disableUnderline
              sx={{
                fontWeight: 'bold',
                color: '#413B90',
                fontFamily: 'Montserrat, sans-serif',
                minWidth: 140
              }}
            >
              <MenuItem value='Mathematics'>Математика</MenuItem>
              <MenuItem value='Physics'>Фізика</MenuItem>
              <MenuItem value='Programming'>Програмування</MenuItem>
              <MenuItem value='Languages'>Мови</MenuItem>
              <MenuItem value='Art'>Мистецтво</MenuItem>
              <MenuItem value='Music'>Музика</MenuItem>
            </Select>
          </Box>

          {/* Price */}
          <Box>
            <Typography
              variant='caption'
              sx={{ color: '#8D8BA7', fontFamily: 'Montserrat, sans-serif' }}
            >
              Ціна
            </Typography>
            <Select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              variant='standard'
              disableUnderline
              sx={{
                fontWeight: 'bold',
                color: '#413B90',
                fontFamily: 'Montserrat, sans-serif',
                minWidth: 150
              }}
            >
              <MenuItem value='$0-$100'>гривень 0 - гривень 100</MenuItem>
              <MenuItem value='$100-$500'>гривень 100 - гривень 500</MenuItem>
              <MenuItem value='$500-$1000'>
                гривень 500 - гривень 1,000
              </MenuItem>
              <MenuItem value='$1000-$4000'>
                гривень 1,000 - гривень 4,000
              </MenuItem>
            </Select>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginRight: 3,
              width: 200
            }}
          >
            <Typography variant='caption' sx={{ color: '#7B68EE' }}>
              Пошук
            </Typography>
            <InputBase
              placeholder="Введіть ім'я та прізвище вчителя"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon sx={{ marginRight: 1 }} />
              }}
              sx={{ width: '100%', paddingTop: '5px' }}
            />
            {/* <InputBase
            placeholder="Введіть ім'я та прізвище вчителя"
            sx={{ width: '100%', paddingTop: '5px' }}
          /> */}
          </Box>

          {/* Search Icon */}
          <Box
            sx={{
              backgroundColor: '#413B90',
              borderRadius: '50%',
              width: 45,
              height: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconButton>
              <SearchIcon sx={{ color: 'white' }} onClick={handleSearchClick} />
            </IconButton>
          </Box>
        </Box>
        <Box>
          {paginatedStudents.map((student) => (
            <Box key={student.id} mb={4}>
              {/* Відображення картки репетитора */}
              <StudentCard student={student} />

              {/* Кнопка для відкриття Drawer з формою відгуку */}
            </Box>
          ))}
        </Box>
        <Box display='flex' justifyContent='center' my={4}>
          <AppPagination
            page={currentPage}
            count={totalPagesSt}
            onChange={handlePageChange}
          />
        </Box>
        {selectedStudent && (
          <Drawer
            anchor='left'
            open={isDetailsDrawerOpen}
            onClose={() => setIsDetailsDrawerOpen(false)}
            PaperProps={{
              sx: {
                width: isMobile ? '100%' : 400,
                padding: '20px',
                borderTopLeftRadius: '20px',
                borderBottomLeftRadius: '20px'
              }
            }}
            onClick={() => {
              setSelectedStudentDetails(student)
              const storedReviews =
                JSON.parse(localStorage.getItem('studentReviews')) || {}
              const reviews = storedReviews[student.id] || []
              setSelectedStudentReviews(reviews)
              setIsDetailsDrawerOpen(true)
            }}
          >
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mb={2}
            >
              <Typography variant='h6'>Деталі студента</Typography>
              <IconButton onClick={() => setIsDetailsDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            {selectedStudentDetails && (
              <Box>
                <Typography
                  sx={{
                    fontWeight: '400 !important',
                    fontFamily: 'Montserrat, sans-serif !important',
                    color: '#413B90',
                    marginBottom: 1
                  }}
                >
                  <strong>Ім’я:</strong> {selectedStudentDetails.firstName}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: '400 !important',
                    fontFamily: 'Montserrat, sans-serif !important',
                    color: '#413B90',
                    marginBottom: 1
                  }}
                >
                  <strong>Прізвище:</strong> {selectedStudentDetails.lastName}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: '400 !important',
                    fontFamily: 'Montserrat, sans-serif !important',
                    color: '#413B90',
                    marginBottom: 1
                  }}
                >
                  <strong>Локація:</strong> {selectedStudentDetails.location}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: '400 !important',
                    fontFamily: 'Montserrat, sans-serif !important',
                    color: '#413B90',
                    marginBottom: 1
                  }}
                >
                  <strong>Мова навчання:</strong>{' '}
                  {selectedStudentDetails.language}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: '400 !important',
                    fontFamily: 'Montserrat, sans-serif !important',
                    color: '#413B90',
                    marginBottom: 1
                  }}
                >
                  <strong>Загаловок запиту:</strong>{' '}
                  {selectedStudentDetails.requestTitle}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: '400 !important',
                    fontFamily: 'Montserrat, sans-serif !important',
                    color: '#413B90',
                    marginBottom: 1
                  }}
                >
                  <strong>Категорія:</strong> {selectedStudentDetails.category}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: '400 !important',
                    fontFamily: 'Montserrat, sans-serif !important',
                    color: '#413B90',
                    marginBottom: 1
                  }}
                >
                  <strong>Інформація про запит:</strong>{' '}
                  {selectedStudentDetails.requestDescription}
                </Typography>
                {/* ВІДГУКИ */}
                <Typography variant='h6' sx={{ marginTop: 2 }}>
                  Відгуки
                </Typography>
                {(
                  JSON.parse(localStorage.getItem('studentReviews'))?.[
                    selectedStudent.id
                  ] || []
                ).map((review, index) => (
                  <Box
                    key={index}
                    sx={{
                      marginTop: 2,
                      padding: 2,
                      border: '1px solid #ccc',
                      borderRadius: '10px'
                    }}
                  >
                    <Rating value={review.rating} readOnly />
                    <Typography variant='body2' sx={{ marginTop: 1 }}>
                      {review.text}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {new Date(review.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Drawer>
        )}
        <Drawer
          anchor='right'
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: isMobile ? '100%' : 400,
              padding: '20px',
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px'
            }
          }}
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mb={2}
          >
            <Typography variant='h6'>
              Залишити відгук для {selectedStudent?.name}
            </Typography>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            component='form'
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const reviewText = formData.get('reviewText') as string
              const ratingValue = parseFloat(
                formData.get('ratingValue') as string
              )
              handleReviewSubmitStudents({ reviewText, ratingValue })
              setIsDrawerOpen(false)
            }}
          >
            <TextField
              name='reviewText'
              label='Ваш відгук'
              multiline
              rows={4}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Typography component='legend'>Оцініть:</Typography>
            <Rating
              name='ratingValue'
              precision={1}
              defaultValue={5}
              sx={{ mb: 2 }}
            />
            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={{ backgroundColor: '#7B68EE' }}
            >
              Надіслати
            </Button>
          </Box>
        </Drawer>
        <AppPagination
          onChange={handlePageChange}
          page={Number(filters.page)}
          pageCount={pageCount}
          size={isMobile ? SizeEnum.Small : SizeEnum.Medium}
          sx={{
            ...styles.pagination,
            ...(offersLoading || !offersCount
              ? { marginBottom: '70px  !important' }
              : {})
          }}
        />
        <Box
          sx={{
            marginTop: '50px  !important',
            backgroundColor: '#F0F4FF',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto'
          }}
        >
          <Typography variant='h6' color='#413B90' gutterBottom>
            <EmojiEventsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />{' '}
            Топ-студенти тижня
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Ознайомтесь із найвищооціненими студентами за останній тиждень!
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              mt: 3,
              flexWrap: 'wrap'
            }}
          >
            {topStudents.map((student, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: 'white',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  width: 220,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}
              >
                <Typography
                  variant='subtitle1'
                  color='#413B90'
                  fontWeight='bold'
                >
                  {student.name}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  ⭐ {student.rating?.toFixed(1)}/5.0 —{' '}
                  {student.reviewCount || '0'} відгуків
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper sx={{ maxWidth: '1500px !important' }}>
      <OfferRequestBlock />
      <Box sx={{ marginTop: '70px' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '30px !important',
            paddingBottom: '30px',
            fontWeight: '400 !important',
            fontFamily: 'Montserrat, sans-serif !important',
            color: '#413B90'
          }}
        >
          Досліджуйте можливості
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            paddingBottom: '23px',
            fontWeight: '400 !important',
            fontFamily: 'Montserrat, sans-serif !important',
            color: '#413B90',
            width: '80%',
            margin: '0 auto'
          }}
        >
          Зазирніть у світ знань, де кожна пропозиція — це новий шанс для
          розвитку. Обирайте напрямки, які вас захоплюють, і відкривайте курси,
          що надихають навчатися з інтересом і задоволенням.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: '15px 25px',
          borderRadius: '50px',
          boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.1)',
          width: 'fit-content',
          margin: '0 auto',
          gap: '25px'
        }}
      >
        {/* Level */}
        <Box>
          <Typography
            variant='caption'
            sx={{ color: '#8D8BA7', fontFamily: 'Montserrat, sans-serif' }}
          >
            Рівень
          </Typography>
          <Select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            variant='standard'
            disableUnderline
            sx={{
              fontWeight: 'bold',
              color: '#413B90',
              fontFamily: 'Montserrat, sans-serif',
              minWidth: 120
            }}
          >
            <MenuItem value='Beginner'>Початковий</MenuItem>
            <MenuItem value='Intermediate'>Середній</MenuItem>
            <MenuItem value='Advanced'>Просунутий</MenuItem>
            <MenuItem value='Expert'>Експерт</MenuItem>
            <MenuItem value='All levels'>Усі рівні</MenuItem>
          </Select>
        </Box>

        {/* Category */}
        <Box>
          <Typography
            variant='caption'
            sx={{ color: '#8D8BA7', fontFamily: 'Montserrat, sans-serif' }}
          >
            Категорія
          </Typography>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant='standard'
            disableUnderline
            sx={{
              fontWeight: 'bold',
              color: '#413B90',
              fontFamily: 'Montserrat, sans-serif',
              minWidth: 140
            }}
          >
            <MenuItem value='Mathematics'>Математика</MenuItem>
            <MenuItem value='Physics'>Фізика</MenuItem>
            <MenuItem value='Programming'>Програмування</MenuItem>
            <MenuItem value='Languages'>Мови</MenuItem>
            <MenuItem value='Art'>Мистецтво</MenuItem>
            <MenuItem value='Music'>Музика</MenuItem>
          </Select>
        </Box>

        {/* Price */}
        <Box>
          <Typography
            variant='caption'
            sx={{ color: '#8D8BA7', fontFamily: 'Montserrat, sans-serif' }}
          >
            Ціна
          </Typography>
          <Select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            variant='standard'
            disableUnderline
            sx={{
              fontWeight: 'bold',
              color: '#413B90',
              fontFamily: 'Montserrat, sans-serif',
              minWidth: 150
            }}
          >
            <MenuItem value='$0-$100'>гривень 0 - гривень 100</MenuItem>
            <MenuItem value='$100-$500'>гривень 100 - гривень 500</MenuItem>
            <MenuItem value='$500-$1000'>гривень 500 - гривень 1,000</MenuItem>
            <MenuItem value='$1000-$4000'>
              гривень 1,000 - гривень 4,000
            </MenuItem>
          </Select>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginRight: 3,
            width: 200
          }}
        >
          <Typography variant='caption' sx={{ color: '#7B68EE' }}>
            Пошук
          </Typography>
          <InputBase
            placeholder="Введіть ім'я та прізвище вчителя"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ marginRight: 1 }} />
            }}
            sx={{ width: '100%', paddingTop: '5px' }}
          />
          {/* <InputBase
            placeholder="Введіть ім'я та прізвище вчителя"
            sx={{ width: '100%', paddingTop: '5px' }}
          /> */}
        </Box>

        {/* Search Icon */}
        <Box
          sx={{
            backgroundColor: '#413B90',
            borderRadius: '50%',
            width: 45,
            height: 45,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconButton>
            <SearchIcon sx={{ color: 'white' }} onClick={handleSearchClick} />
          </IconButton>
        </Box>
      </Box>

      <Box>
        {paginatedTutors.map((tutor) => (
          <Box key={tutor.id} mb={4}>
            {/* Відображення картки репетитора */}
            <TutorCard tutor={tutor} />

            {/* Кнопка для відкриття Drawer з формою відгуку */}
          </Box>
        ))}
      </Box>
      <Box display='flex' justifyContent='center' my={4}>
        <AppPagination
          page={currentPage}
          count={totalPages}
          onChange={handlePageChange}
        />
      </Box>
      {selectedTutor && (
        <Drawer
          anchor='left'
          open={isDetailsDrawerOpen}
          onClose={() => setIsDetailsDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: isMobile ? '100%' : 400,
              padding: '20px',
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px'
            }
          }}
          onClick={() => {
            setSelectedTutorDetails(tutor)
            const storedReviews =
              JSON.parse(localStorage.getItem('tutorReviews')) || {}
            const reviews = storedReviews[tutor.id] || []
            setSelectedTutorReviews(reviews)
            setIsDetailsDrawerOpen(true)
          }}
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mb={2}
          >
            <Typography variant='h6'>Деталі викладача</Typography>
            <IconButton onClick={() => setIsDetailsDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {selectedTutorDetails && (
            <Box>
              <Typography
                sx={{
                  fontWeight: '400 !important',
                  fontFamily: 'Montserrat, sans-serif !important',
                  color: '#413B90',
                  marginBottom: 1
                }}
              >
                <strong>Ім’я:</strong> {selectedTutorDetails.firstName}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '400 !important',
                  fontFamily: 'Montserrat, sans-serif !important',
                  color: '#413B90',
                  marginBottom: 1
                }}
              >
                <strong>Прізвище:</strong> {selectedTutorDetails.lastName}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '400 !important',
                  fontFamily: 'Montserrat, sans-serif !important',
                  color: '#413B90',
                  marginBottom: 1
                }}
              >
                <strong>Локація:</strong> {selectedTutorDetails.location}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '400 !important',
                  fontFamily: 'Montserrat, sans-serif !important',
                  color: '#413B90',
                  marginBottom: 1
                }}
              >
                <strong>Професійний заголовок:</strong>{' '}
                {selectedTutorDetails.professionalTitle}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '400 !important',
                  fontFamily: 'Montserrat, sans-serif !important',
                  color: '#413B90',
                  marginBottom: 1
                }}
              >
                <strong>Мова викладання:</strong>{' '}
                {selectedTutorDetails.teachingLanguage}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '400 !important',
                  fontFamily: 'Montserrat, sans-serif !important',
                  color: '#413B90',
                  marginBottom: 1
                }}
              >
                <strong>Освіта:</strong> {selectedTutorDetails.education}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '400 !important',
                  fontFamily: 'Montserrat, sans-serif !important',
                  color: '#413B90',
                  marginBottom: 1
                }}
              >
                <strong>Категорії:</strong>{' '}
                {selectedTutorDetails.categories?.join(', ')}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '400 !important',
                  fontFamily: 'Montserrat, sans-serif !important',
                  color: '#413B90',
                  marginBottom: 1
                }}
              >
                <strong>Інформація про офер:</strong>{' '}
                {selectedTutorDetails.offerDetails}
              </Typography>
              {/* ВІДГУКИ */}
              <Typography variant='h6' sx={{ marginTop: 2 }}>
                Відгуки
              </Typography>
              {(
                JSON.parse(localStorage.getItem('tutorReviews'))?.[
                  selectedTutor.id
                ] || []
              ).map((review, index) => (
                <Box
                  key={index}
                  sx={{
                    marginTop: 2,
                    padding: 2,
                    border: '1px solid #ccc',
                    borderRadius: '10px'
                  }}
                >
                  <Rating value={review.rating} readOnly />
                  <Typography variant='body2' sx={{ marginTop: 1 }}>
                    {review.text}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Drawer>
      )}
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : 400,
            padding: '20px',
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px'
          }
        }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography variant='h6'>
            Залишити відгук для {selectedTutor?.name}
          </Typography>
          <IconButton onClick={() => setIsDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          component='form'
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const reviewText = formData.get('reviewText') as string
            const ratingValue = parseFloat(
              formData.get('ratingValue') as string
            )
            handleReviewSubmit({ reviewText, ratingValue })
            setIsDrawerOpen(false)
          }}
        >
          <TextField
            name='reviewText'
            label='Ваш відгук'
            multiline
            rows={4}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Typography component='legend'>Оцініть:</Typography>
          <Rating
            name='ratingValue'
            precision={1}
            defaultValue={5}
            sx={{ mb: 2 }}
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{ backgroundColor: '#7B68EE' }}
          >
            Надіслати
          </Button>
        </Box>
      </Drawer>

      <AppPagination
        onChange={handlePageChange}
        page={Number(filters.page)}
        pageCount={pageCount}
        size={isMobile ? SizeEnum.Small : SizeEnum.Medium}
        sx={{
          ...styles.pagination,
          ...(offersLoading || !offersCount
            ? { marginBottom: '70px  !important' }
            : {})
        }}
      />

      <Box
        sx={{
          marginTop: '50px  !important',
          backgroundColor: '#F0F4FF',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >
        <Typography variant='h6' color='#413B90' gutterBottom>
          <EmojiEventsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />{' '}
          Топ-репетитори тижня
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Ознайомтесь із найвищооціненими викладачами за останній тиждень!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            mt: 3,
            flexWrap: 'wrap'
          }}
        >
          {topTutors.map((tutor, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: 'white',
                padding: '15px 20px',
                borderRadius: '12px',
                width: 220,
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}
            >
              <Typography variant='subtitle1' color='#413B90' fontWeight='bold'>
                {tutor.name}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                ⭐ {tutor.rating?.toFixed(1)}/5.0 — {tutor.reviewCount || '0'}{' '}
                відгуків
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default FindOffers
