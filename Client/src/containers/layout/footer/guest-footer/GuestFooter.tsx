import { useTranslation } from 'react-i18next'
import emailjs from 'emailjs-com'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button, TextField } from '@mui/material'
import facebook from './facebook.png'
import pinterest from './Pinterest_white.png'
import insatgram from './Instagram_white.png'
import telegram from './Telegram_white.png'
import { useState } from 'react'
import { styles } from '~/containers/layout/footer/Footer.styles'
const GuestFooter = () => {
  const { t } = useTranslation()

  const socialMediaIcons = [
    { alt: 'Facebook', src: facebook },
    { alt: 'Pinterest', src: pinterest },
    { alt: 'Instagram', src: insatgram },
    { alt: 'Telegram', src: telegram }
  ]
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await emailjs.send(
        'service_yg5prgp', // Service ID
        'template_zq3mk78', // Template ID
        { email: email }, // Дані, що передаються в шаблон
        '0LUQI6oWcVKLsV8SQ' // Ваш User ID
      )

      console.log(result)

      if (result.status === 200) {
        setSuccessMessage('Успішно підписано на новини!')
        setEmail('')
      } else {
        setSuccessMessage('Щось пішло не так, спробуйте пізніше')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSuccessMessage('Щось пішло не так, спробуйте пізніше')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.contacts}>
        <Typography sx={styles.contactstitle}>
          {t('footer.contacts')}
        </Typography>
        <Typography sx={styles.substitle}>+ 380 96 26 40 978</Typography>
        <Typography sx={styles.substitle}>
          м. Львів, вул. Шевченка 396
        </Typography>
        <Typography sx={styles.substitle}>
          Понеділок - Субота/ 8:00- 20:00
        </Typography>
        <Typography sx={styles.substitle}>schoolexam@gmail.com</Typography>
      </Box>

      <Box sx={styles.imgContainer}>
        {socialMediaIcons.map((icon, index) => (
          <Box
            key={index}
            component='img'
            alt={icon.alt}
            src={icon.src}
            sx={styles.img}
          />
        ))}
      </Box>

      <Box>
        <Box
          component='form'
          onSubmit={handleSubmit} // Встановлено onSubmit на форму
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '400px',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '20px',
            borderRadius: '10px'
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '600',
              fontFamily: 'Montserrat, sans-serif !important',
              textAlign: 'center'
            }}
          >
            ПІДПИСКА НА НОВИНИ
          </Typography>
          <TextField
            variant='outlined'
            placeholder='Введіть вашу пошту'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                backgroundColor: '#fff',
                padding: '12px',
                fontFamily: 'Montserrat, sans-serif'
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Montserrat, sans-serif'
              }
            }}
          />
          <Button
            type='submit'
            disabled={isSubmitting || !email}
            sx={{
              backgroundColor: '#706CAB',
              color: '#fff',
              padding: '12px 20px',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: '#5c5491'
              }
            }}
          >
            {isSubmitting ? 'Підписка...' : 'Підписатися'}
          </Button>
          {successMessage && (
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '500',
                textAlign: 'center',
                color: successMessage.includes('не так') ? 'red' : 'green'
              }}
            >
              {successMessage}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default GuestFooter
