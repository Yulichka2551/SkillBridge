import { FC } from 'react'
import mapImage from './styles/WelcomeImages/map.png'
import { useTranslation } from 'react-i18next'
import { styles } from '~/containers/guest-home-page/styles/Welcome.styles.js'
import Typography from '@mui/material/Typography'

const FeatureBlock: FC = () => {
  const { t } = useTranslation()

  return (
    <div style={{ gap: 0 }}>
      {' '}
      {/* Видалено невірний <style> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '200px'
        }}
      >
        <div>
          <Typography sx={styles.map}>
            {t('guestHomePage.welcomeBlock.title1')}
          </Typography>
          <div>
            <Typography sx={styles.subtitles}>
              {t('guestHomePage.welcomeBlock.subtitle1')}
            </Typography>
          </div>
        </div>
        <div>
          <Typography sx={styles.map}>
            {t('guestHomePage.welcomeBlock.title2')}
          </Typography>
          <div>
            <Typography sx={styles.subtitles}>
              {t('guestHomePage.welcomeBlock.subtitle2')}
            </Typography>
          </div>
        </div>
      </div>
      <img
        alt='map Image'
        src={mapImage}
        style={{ width: '100%', height: 'auto' }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '200px'
        }}
      >
        <div>
          <Typography sx={styles.map}>
            {t('guestHomePage.welcomeBlock.title3')}
          </Typography>
          <div>
            <Typography sx={styles.subtitles}>
              {t('guestHomePage.welcomeBlock.subtitle3')}
            </Typography>
          </div>
        </div>
        <div>
          <Typography sx={styles.map}>
            {t('guestHomePage.welcomeBlock.title4')}
          </Typography>
          <div>
            <Typography sx={styles.subtitles}>
              {t('guestHomePage.welcomeBlock.subtitle4')}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureBlock
