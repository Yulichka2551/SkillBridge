import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import HashLink from '~/components/hash-link/HashLink'
import AppButton from '~/components/app-button/AppButton'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { styles } from '~/containers/guest-home-page/styles/Welcome.styles.js'

const Welcome = () => {
  const { t } = useTranslation()

  return (
    <Box
      className='section'
      id={guestRoutes.welcome.route}
      sx={styles.container}
    >
      <Typography sx={styles.title}>
        {t('guestHomePage.welcomeBlock.title')}
      </Typography>
      <Typography sx={styles.subtitle}>
        {t('guestHomePage.welcomeBlock.description')}
      </Typography>
      <AppButton
        component={HashLink}
        sx={styles.getStartBtn}
        to={guestRoutes.navBar.whatCanYouDo.path}
      >
        {t('guestHomePage.welcomeBlock.getStarted')}
      </AppButton>
    </Box>
  )
}

export default Welcome
