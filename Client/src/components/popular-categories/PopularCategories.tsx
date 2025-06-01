import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import AppButton from '~/components/app-button/AppButton'
import { authRoutes } from '~/router/constants/authRoutes'
import { spliceSx } from '~/utils/helper-functions'
import { SizeEnum, ButtonVariantEnum } from '~/types'
import { styles } from '~/components/popular-categories/PopularCategories.styles'
import image1 from './3d.png'
import image2 from './ai.png'
import image3 from './giammarco.png'
import image4 from './man.png'
import image5 from './marcela.png'
import image6 from './stack.png'
import tutor from './ret.png'
import { UserRoleEnum } from '~/types'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import PersonIcon from '@mui/icons-material/Person'
import SchoolIcon from '@mui/icons-material/School'
import StarRateIcon from '@mui/icons-material/StarRate'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useAppSelector } from '~/hooks/use-redux'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Avatar, Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StudentCalendar from '~/containers/user-profile/comments-with-rating-block/CalendarBlock'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

interface PopularCategoriesProps {
  sx?: SxProps
}

const PopularCategories: FC<PopularCategoriesProps> = ({ sx }) => {
  const navigate = useNavigate()

  const { userRole } = useAppSelector((state) => state.appMain)
  const isTutor = userRole === UserRoleEnum.Tutor

  const categories = [
    { id: '1', name: 'Дизайн', image: image1 },
    { id: '2', name: 'Фізика', image: image2 },
    { id: '3', name: 'Фінанси', image: image4 },
    { id: '4', name: 'Музика', image: image5 },
    { id: '5', name: 'Математика', image: image6 },
    { id: '6', name: 'Історія', image: image3 }
  ]

  const stats = {
    students: 5,
    lessons: 25,
    rating: 4.9,
    hoursTaught: 120
  }

  const defaultRatings: Record<string, number> = {
    '1': 5,
    '2': 5,
    '3': 5,
    '4': 4.7,
    '5': 4.5,
    '6': 4.8
  }

  const students = [
    {
      id: 1,
      firstName: 'Олександр',
      lastName: 'Іванов',
      rating: 4.7,
      avatarLetter: 'О'
    },
    {
      id: 2,
      firstName: 'Марія',
      lastName: 'Петренко',
      rating: 5.0,
      avatarLetter: 'М'
    },
    {
      id: 3,
      firstName: 'Віктор',
      lastName: 'Сидоренко',
      rating: 4.6,
      avatarLetter: 'В'
    },
    {
      id: 4,
      firstName: 'Наталія',
      lastName: 'Коваль',
      rating: 4.9,
      avatarLetter: 'Н'
    },
    {
      id: 5,
      firstName: 'Ігор',
      lastName: 'Гнатюк',
      rating: 4.7,
      avatarLetter: 'І'
    }
  ]

  const popularQA = [
    {
      question: 'Як підвищити мотивацію до навчання?',
      answer:
        'Встановіть чіткі цілі, розбивайте завдання на маленькі частини та винагороджуйте себе за досягнення.'
    },
    {
      question: 'Які найкращі техніки запам’ятовування?',
      answer:
        'Використовуйте асоціації, мнемонічні правила та повторення через інтервали для ефективного запам’ятовування.'
    },
    {
      question: 'Як ефективно розподілити час для підготовки?',
      answer:
        'Плануйте свій день за допомогою тайм-менеджменту, використовуйте техніку Помодоро та уникайте багатозадачності.'
    },
    {
      question: 'Що робити при стресі перед екзаменом?',
      answer:
        'Робіть глибокі дихальні вправи, повторюйте матеріал заздалегідь і не забувайте про короткі перерви для відпочинку.'
    },
    {
      question: 'Як знайти натхнення для творчих проєктів?',
      answer:
        'Шукайте нові ідеї в мистецтві, спілкуйтеся з творчими людьми і не бійтеся експериментувати.'
    }
  ]

  const [ratings, setRatings] = useState<Record<string, number>>(defaultRatings)

  useEffect(() => {
    const storedRatings = localStorage.getItem('categoryRatings')
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings))
    } else {
      localStorage.setItem('categoryRatings', JSON.stringify(defaultRatings))
    }
  }, [])

  const onClickButton = () => {
    navigate(authRoutes.categories.path)
  }

  const StatItem = ({
    icon,
    label,
    value
  }: {
    icon: React.ReactNode
    label: string
    value: string | number
  }) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 100
      }}
    >
      <Box
        sx={{
          mb: 1,
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          width: 64,
          height: 64,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 32,
          color: '#FFD700',
          boxShadow: '0 0 12px #FFD700',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.2)',
            color: '#FFF176',
            boxShadow: '0 0 20px #FFF176',
            cursor: 'default'
          }
        }}
      >
        {icon}
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: 22 }}>{value}</Typography>
      <Typography sx={{ opacity: 0.8, fontSize: 14 }}>{label}</Typography>
    </Box>
  )

  const StudentsRatingsBlock = () => {
    return (
      <Box
        sx={{
          maxWidth: 1480,
          mx: 'auto',
          p: 4,
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          background: 'linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)',
          fontFamily: "'Montserrat', sans-serif"
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={4}
          justifyContent='space-around'
          flexWrap='wrap'
        >
          {students.map(({ id, firstName, lastName, rating, avatarLetter }) => (
            <Box
              key={id}
              sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                p: 3,
                width: 160,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                },
                cursor: 'default'
              }}
            >
              <Avatar
                sx={{
                  bgcolor: '#667eea',
                  width: 56,
                  height: 56,
                  fontSize: 28,
                  mb: 1,
                  mx: 'auto'
                }}
                aria-label={`${firstName} ${lastName}`}
              >
                {avatarLetter}
              </Avatar>
              <Typography
                fontWeight={600}
                fontSize={16}
                color='#413B90'
                mb={0.5}
              >
                {lastName}
              </Typography>
              <Typography fontSize={14} color='#666' mb={1}>
                {firstName}
              </Typography>
              <Rating
                name={`student-rating-${id}`}
                value={rating}
                precision={0.1}
                readOnly
                icon={<StarIcon fontSize='inherit' />}
                sx={{ color: '#FFD700' }}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    )
  }

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  if (isTutor) {
    return (
      <>
        {/* <StudentCalendar /> */}
        <Box>
          <Typography
            sx={{
              fontSize: '40px',
              pb: '30px',
              fontWeight: 400,
              fontFamily: 'Montserrat, sans-serif',
              color: '#413B90',
              mb: 1,
              mt: '80px',
              textAlign: 'center'
            }}
          >
            У вас 5 студентів
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4
            }}
          >
            <AddCircleOutlineIcon
              sx={{ fontSize: '80px ', color: '#706CAB' }}
            />
          </Box>
          <StudentsRatingsBlock />
        </Box>
        <Box
          sx={{
            marginBottom: '70px',
            maxWidth: '1480px',
            mx: 'auto',
            mt: 8,
            p: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 4,
            color: 'white',
            boxShadow: '0 12px 24px rgba(118, 75, 162, 0.4)',
            fontFamily: "'Montserrat', sans-serif"
          }}
        >
          <Typography
            variant='h3'
            sx={{ mb: 1, fontWeight: 700, textAlign: 'center' }}
          >
            Ваш особистий простір репетитора
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              mb: 4,
              fontSize: 18,
              opacity: 0.85
            }}
          >
            Ваша робота змінює життя студентів. Погляньте на свої досягнення і
            створіть нові пропозиції!
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent='space-around'
            spacing={4}
            mb={5}
          >
            {/* Статистика */}
            <StatItem
              icon={<PersonIcon />}
              label='Студентів'
              value={stats.students}
            />
            <StatItem
              icon={<SchoolIcon />}
              label='Уроків'
              value={stats.lessons}
            />
            <StatItem
              icon={<StarRateIcon />}
              label='Рейтинг'
              value={stats.rating.toFixed(1)}
            />
            <StatItem
              icon={<AccessTimeIcon />}
              label='Годин навчання'
              value={stats.hoursTaught}
            />
          </Stack>

          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.3)', mb: 4 }} />

          <Box
            sx={{
              display: 'flex',
              gap: 4,
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Ілюстрація */}
            <Box
              component='img'
              src={tutor}
              alt='Tutor'
              sx={{
                width: { xs: '100%', md: 280 },
                borderRadius: 3
              }}
            />

            {/* Контент */}
            <Box sx={{ maxWidth: 480 }}>
              <Typography
                variant='h5'
                sx={{ mb: 2, fontWeight: 600, letterSpacing: 1 }}
              >
                Готові створити нову пропозицію?
              </Typography>
              <Typography sx={{ mb: 4, opacity: 0.85 }}>
                Розкажіть про свої навички, визначте ціни та дайте студентам
                можливість обрати саме вас.
              </Typography>

              <Button
                variant='contained'
                size='large'
                startIcon={<AddCircleOutlineIcon />}
                // onClick={() => navigate(authRoutes.createOffer.path)}
                sx={{
                  backgroundColor: '#FFD700',
                  color: '#4B3B00',
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor: '#FFC107'
                  }
                }}
              >
                Створити пропозицію
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 6,
            p: 3,
            bgcolor: '#E4E4FF', // дуже світлий фіолетовий фон
            borderRadius: 2,
            boxShadow: 2,
            maxWidth: '1486px',
            margin: '0 auto',
            marginBottom: '70px'
          }}
        >
          <Typography
            variant='h5'
            fontWeight={700}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 3,
              color: '#413B90 !important',
              fontFamily: 'Montserrat, sans-serif !important'
            }}
          >
            <QuestionAnswerIcon sx={{ mr: 1, color: '#7b1fa2' }} />{' '}
            {/* фіолетова іконка */}
            Найпопулярніші питання та відповіді
          </Typography>

          <Stack spacing={2}>
            {popularQA.map(({ question, answer }, index) => {
              const isExpanded = expandedIndex === index
              return (
                <Box
                  key={index}
                  sx={{
                    bgcolor: 'rgb(176, 176, 228)', // світлий фіолетовий
                    borderRadius: 2,
                    boxShadow: isExpanded
                      ? '0 4px 12px rgba(106,27,154,0.3)' // тінь з темно-фіолетового
                      : 'none',
                    cursor: 'pointer',
                    p: 2,
                    transition: 'box-shadow 0.3s ease'
                  }}
                  onClick={() => toggleExpand(index)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      variant='subtitle1'
                      fontWeight={600}
                      color='#4a148c' // ще темніший фіолетовий для тексту питання
                      sx={{ userSelect: 'none' }}
                    >
                      {question}
                    </Typography>
                    <IconButton
                      size='small'
                      aria-label={isExpanded ? 'collapse' : 'expand'}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleExpand(index)
                      }}
                      sx={{
                        color: '#4a148c',
                        transition: 'transform 0.3s',
                        transform: isExpanded
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)'
                      }}
                    >
                      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>

                  <Collapse in={isExpanded} timeout='auto' unmountOnExit>
                    <Typography
                      variant='body2'
                      sx={{
                        mt: 1,
                        color: 'rgb(87, 87, 133)',
                        fontStyle: 'italic'
                      }} // фіолетовий для тексту відповіді
                    >
                      {answer}
                    </Typography>
                  </Collapse>
                </Box>
              )
            })}
          </Stack>
        </Box>
      </>
    )
  }

  return (
    <Box sx={spliceSx(styles.wrapper, sx)}>
      <Box>
        <Typography sx={styles.title}>Світ категорій чекає на тебе</Typography>
        <Typography sx={styles.description}>
          Пориньте у вибрані категорії та відкрийте нові горизонти навчання
        </Typography>
      </Box>

      <Box sx={styles.imagesContainer}>
        {categories.map((category) => (
          <Box
            sx={styles.images}
            key={category.id}
            onClick={() =>
              navigate(`${authRoutes.categories.path}/${category.id}`)
            }
          >
            <Box alt={category.name} component='img' src={category.image} />
            <Typography sx={styles.text}>{category.name}</Typography>
            <Rating
              precision={0.1}
              name={`rating-${category.id}`}
              value={ratings[category.id] || 0}
              readOnly
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
        ))}
      </Box>

      <AppButton
        onClick={onClickButton}
        size={SizeEnum.ExtraLarge}
        sx={styles.button}
        variant={ButtonVariantEnum.Tonal}
      >
        Перейти до пропозицій
      </AppButton>
    </Box>
  )
}

export default PopularCategories
