import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/student-home-page/student-how-it-works/student-how-it-works.styles'

import objectsImage from '../../../containers/guest-home-page/cards-with-button/objects.png'

const StudentHowItWorks = () => {
  return (
    <>
      <Box>
        <Typography sx={styles.title1}>Зануртесь у процес</Typography>
        <Typography sx={styles.description1}>
          Навчання — це не обов'язок, це пригоди. Почніть курс, спілкуйтеся з
          викладачем, діліться думками та новими ідеями. Ви в центрі цієї
          подорожі.
        </Typography>
      </Box>
      <Box sx={styles.header}>
        <Box sx={styles.container1}>
          <Box sx={styles.student_container1}>
            <Typography sx={styles.title}>Запит на Знання</Typography>
            <Typography sx={styles.description}>
              Відкрийте для себе нові горизонти. Напишіть, що саме хочете
              вивчити, і надішліть запит до викладача, який допоможе вам здобути
              важливі навички.
            </Typography>
          </Box>
          <Box sx={styles.student_container2}>
            <Typography sx={styles.title}>Залишити Враження</Typography>
            <Typography sx={styles.description}>
              Ваш відгук – це не просто слова, а шлях для інших знайти свого
              ідеального наставника. Поділіться досвідом і станьте частиною
              спільноти, що допомагає зростати.
            </Typography>
          </Box>
        </Box>

        <Box
          alt='description'
          component='img'
          src={objectsImage}
          sx={styles.image}
        />
        <Box sx={styles.container1}>
          <Box sx={styles.student_container3}>
            <Typography sx={styles.title}>Шукайте Своїх Вчителів</Typography>
            <Typography sx={styles.description}>
              Не важливо, де ви знаходитесь – ваш ідеальний наставник може бути
              поруч або на іншому кінці світу! Обирайте серед тисяч викладачів і
              знаходьте того, хто стане вашим гідом на шляху до знань.
            </Typography>
          </Box>
          <Box sx={styles.student_container4}>
            <Typography sx={styles.title}>Нове Починання</Typography>
            <Typography sx={styles.description}>
              Готові до змін? Виберіть курс, що надихає, і зануртесь у навчання.
              Спілкуйтесь з викладачем, обговорюйте ідеї та досягайте
              результатів разом.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default StudentHowItWorks
