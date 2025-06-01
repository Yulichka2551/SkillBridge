import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { useAppSelector } from '~/hooks/use-redux'

import { styles } from '~/components/title-block/TitleBlock.styles'

type TitleBlockProps = {
  translationKey: string
  children?: React.ReactNode
  style?: SxProps
}

const TitleBlock: FC<TitleBlockProps> = ({
  translationKey,
  children,
  style
}) => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)

  return (
    <Box sx={{ ...styles.container, ...style }}>
      <Box sx={styles.info}>
        <TitleWithDescription
          description={t(`${translationKey}.description.${userRole}`)}
          style={styles.titleWithDescription}
          title={t(`${translationKey}.title.${userRole}`)}
        />
        {children && <Box sx={styles.form}>{children}</Box>}
      </Box>
    </Box>
  )
}

export default TitleBlock
