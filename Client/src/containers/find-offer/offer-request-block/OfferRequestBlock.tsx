import { useTranslation } from 'react-i18next'

import TitleBlock from '~/components/title-block/TitleBlock'
import icon from '~/assets/img/find-offer/subject_icon.png'
import AppButton from '~/components/app-button/AppButton'
import CreateOffer from '~/containers/offer-page/create-offer/CreateOffer'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawer } from '~/hooks/use-drawer'
import { translationKey } from '~/containers/find-offer/constants'
import { Box, Button, Typography } from '@mui/material'
import { UserRoleEnum } from '~/types'
import { useAppSelector } from '~/hooks/use-redux'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()

  const handleOpenDrawer = () => {
    openDrawer()
  }
  const { userRole } = useAppSelector((state) => state.appMain)
  const isTutor = userRole === UserRoleEnum.Tutor

  if (isTutor) {
    return (
      <Box
        sx={{
          backgroundColor: '#E4E4FF',
          padding: '50px 100px',
          maxWidth: '1500px !important',
          margin: '0 auto',
          borderRadius: '50px'
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '60px !important',
            lineHeight: '66px !important',
            paddingBottom: '30px',
            fontWeight: '400 !important',
            fontFamily: 'Montserrat, sans-serif !important',
            color: '#413B90',
            marginBottom: 1
          }}
        >
          Запаліть вогонь знань
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '20px !important',
            paddingBottom: '30px',
            fontWeight: '400 !important',
            fontFamily: 'Montserrat, sans-serif !important',
            color: '#413B90',
            marginBottom: 1
          }}
        >
          Відкрийте двері у світ можливостей — створюйте свою авторську
          пропозицію. Оберіть ті навички і напрямки, що відображають вашу
          майстерність, і допоможіть студентам знайти ідеального вчителя саме в
          вас.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            sx={{
              backgroundColor: '#413B90',
              color: 'white',
              borderRadius: '40px',
              fontFamily: 'Montserrat, sans-serif !important',
              padding: '15px 30px',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#2f2a6a'
              }
            }}
          >
            Розпочати пропозицію
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        backgroundColor: '#E4E4FF',
        padding: '50px 100px',
        maxWidth: '1500px !important',
        margin: '0 auto',
        borderRadius: '50px'
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '60px !important',
          lineHeight: '66px !important',
          paddingBottom: '30px',
          fontWeight: '400 !important',
          fontFamily: 'Montserrat, sans-serif !important',
          color: '#413B90',
          marginBottom: 1
        }}
      >
        {' '}
        Репетитор для приватних занять
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '20px !important',
          paddingBottom: '30px',
          fontWeight: '400 !important',
          fontFamily: 'Montserrat, sans-serif !important',
          color: '#413B90',
          marginBottom: 1
        }}
      >
        Ви — на відстані одного кроку від ідеального вчителя. Створіть запит, що
        точно передає ваші цілі й побажання. Оберіть критерії, які найкраще
        описують ваш стиль навчання, тему й рівень. А ми допоможемо знайти саме
        того репетитора, з яким навчання стане не обов’язком, а натхненням.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          sx={{
            backgroundColor: '#413B90',
            color: 'white',
            borderRadius: '40px',
            fontFamily: 'Montserrat, sans-serif !important',
            padding: '15px 30px',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#2f2a6a'
            }
          }}
        >
          Зробіть перший крок
        </Button>
      </Box>
    </Box>
  )
}

export default OfferRequestBlock
