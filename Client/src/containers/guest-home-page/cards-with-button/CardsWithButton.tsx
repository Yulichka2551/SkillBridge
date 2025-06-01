import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import objectsImage from './objects.png'
import { UserRoleEnum } from '~/types'
import { styles } from './CardsWithButton.styles'

interface CardsWithButtonProps {
  role: UserRoleEnum
  isTutor: boolean
}

const CardsWithButton: FC<CardsWithButtonProps> = ({ isTutor }) => {
  const { t } = useTranslation()

  return (
    <>
      <hr />
      {isTutor ? (
        <>
          <Box sx={styles.container1}>
            <Box sx={styles.student_container1}>
              <Typography sx={styles.title}>
                {t('guestHomePage.howItWorks.tutor.createATutorAccount.title')}
              </Typography>
              <Typography sx={styles.description}>
                {t(
                  'guestHomePage.howItWorks.tutor.createATutorAccount.description'
                )}
              </Typography>
            </Box>
            <Box sx={styles.student_container2}>
              <Typography sx={styles.title}>
                {t('guestHomePage.howItWorks.tutor.receiveFeedbacks.title')}
              </Typography>
              <Typography sx={styles.description}>
                {t(
                  'guestHomePage.howItWorks.tutor.receiveFeedbacks.description'
                )}
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
            <Box sx={styles.container1}>
              <Box sx={styles.student_container3}>
                <Typography sx={styles.title}>
                  {t('guestHomePage.howItWorks.tutor.signUp.title')}
                </Typography>
                <Typography sx={styles.description}>
                  {t('guestHomePage.howItWorks.tutor.signUp.description')}
                </Typography>
              </Box>
              <Box sx={styles.student_container4}>
                <Typography sx={styles.title}>
                  {t('guestHomePage.howItWorks.tutor.getNewStudents.title')}
                </Typography>
                <Typography sx={styles.description}>
                  {t(
                    'guestHomePage.howItWorks.tutor.getNewStudents.description'
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box sx={styles.container1}>
            <Box sx={styles.student_container1}>
              <Typography sx={styles.title}>
                {t('guestHomePage.howItWorks.student.selectATutor.title')}
              </Typography>
              <Typography sx={styles.description}>
                {t('guestHomePage.howItWorks.student.selectATutor.description')}
              </Typography>
            </Box>
            <Box sx={styles.student_container2}>
              <Typography sx={styles.title}>
                {t('guestHomePage.howItWorks.student.startLearning.title')}
              </Typography>
              <Typography sx={styles.description}>
                {t(
                  'guestHomePage.howItWorks.student.startLearning.description'
                )}
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
              <Typography sx={styles.title}>
                {t('guestHomePage.howItWorks.student.signUp.title')}
              </Typography>
              <Typography sx={styles.description}>
                {t('guestHomePage.howItWorks.student.signUp.description')}
              </Typography>
            </Box>
            <Box sx={styles.student_container4}>
              <Typography sx={styles.title}>
                {t('guestHomePage.howItWorks.student.sendRequest.title')}
              </Typography>
              <Typography sx={styles.description}>
                {t('guestHomePage.howItWorks.student.sendRequest.description')}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default CardsWithButton
