import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import FindBlock from '~/components/find-block/FindBlock'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import Faq from '~/containers/student-home-page/faq/Faq'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'

import { translationKey } from '~/components/find-block/find-tutor-constants'
import { Box } from '@mui/material'

const StudentHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: {
            maxHeight: { sm: '652px' },
            height: '100%',
            maxWidth: '1130px',
            width: '100%'
          }
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <Box data-testid='studentHome' sx={{ flex: 1 }}>
      <FindBlock translationKey={translationKey} />
      <PopularCategories />
      <StudentHowItWorks />
      <Faq />
    </Box>
  )
}

export default StudentHome
