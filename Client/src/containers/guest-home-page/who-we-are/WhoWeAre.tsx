import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import { guestRoutes } from '~/router/constants/guestRoutes'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import skillbridgeVideo from './skillbrigde.mp4'
import { styles } from '~/containers/guest-home-page/who-we-are/WhoWeAre.styles.js'

const WhoWeAre = () => {
  const { t } = useTranslation()

  return (
    <Box
      className='section'
      id={guestRoutes.navBar.whoWeAre.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description={t('guestHomePage.whoWeAre.description')}
        style={styles.titleWithDescription}
        title={t('guestHomePage.whoWeAre.title')}
      />
      <Box
        component='video'
        src={skillbridgeVideo}
        controls
        style={{ width: '100%', borderRadius: '12px', marginTop: '24px' }}
      />
    </Box>
  )
}

export default WhoWeAre
