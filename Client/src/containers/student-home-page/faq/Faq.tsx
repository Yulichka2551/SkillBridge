import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import {
  SchoolRounded,
  EventAvailableRounded,
  GavelRounded,
  PaymentRounded
} from '@mui/icons-material'

import { styles } from '~/containers/student-home-page/faq/Faq.styles'

const faqItems = [
  {
    icon: <SchoolRounded fontSize='large' sx={{ color: '#302b6e' }} />,
    title: 'Пошук наставника',
    description:
      'Знайди свого ідеального вчителя: обери категорію або впиши тему, що цікавить. Читай відгуки, дивись досвід і обирай того, хто заряджає на навчання.'
  },
  {
    icon: <EventAvailableRounded fontSize='large' sx={{ color: '#302b6e' }} />,
    title: 'Бронювання уроку',
    description:
      'Сподобався викладач? Надсилай запит на співпрацю. Узгоджуйте рівень, ціну та час занять — все просто і прозоро.'
  },
  {
    icon: <GavelRounded fontSize='large' sx={{ color: '#302b6e' }} />,
    title: 'Що потрібно знати студенту',
    description:
      'Вибирай курси, став свої умови, поважай правила платформи. Ніякої реклами, образ чи неетичної поведінки — тут про навчання і розвиток.'
  },
  {
    icon: <PaymentRounded fontSize='large' sx={{ color: '#302b6e' }} />,
    title: 'Оплата навчання',
    description:
      'Ти і викладач домовляєтеся напряму про оплату. Ми тільки допомагаємо знайти один одного без зайвих комісій.'
  }
]

const Faq = () => {
  return (
    <Box className='section' sx={{ ...styles.container, textAlign: 'center' }}>
      <Typography
        variant='h4'
        sx={{
          mb: 2,
          color: '#413B90',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '30px'
        }}
      >
        Часті запитання
      </Typography>
      <Typography
        variant='body1'
        sx={{
          mb: 5,
          color: '#706CAB',
          fontSize: '16px',
          fontFamily: 'Montserrat, sans-serif !important',
          fontWeight: '500 !important'
        }}
      >
        Відкрий свій шлях до знань із SKILLBRIDGE
      </Typography>
      <Box sx={{ width: '80%', m: '0 auto' }}>
        <Grid container spacing={4}>
          {faqItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: 'background.paper',
                  boxShadow: 3,
                  height: '100%',
                  transition: '0.3s',
                  '&:hover': { boxShadow: 6 }
                }}
              >
                {item.icon}
                <Typography
                  variant='h6'
                  sx={{ mt: 2, mb: 1, color: '#534e91' }}
                >
                  {item.title}
                </Typography>
                <Typography variant='body2' color='#7f7bb0'>
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Faq
