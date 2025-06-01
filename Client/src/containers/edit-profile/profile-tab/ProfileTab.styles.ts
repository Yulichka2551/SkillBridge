import { TypographyVariantEnum } from '~/types'
import {
  rootContainer,
  updateProfileBtn
} from '~/containers/edit-profile/common.styles'

const { Body2, H6 } = TypographyVariantEnum

export const styles = {
  root: {
    ...(rootContainer || {}),
    width: '1460px !important',
    maxWidth: '1500px !important'
  },
  profileInnerContainer: {
    width: '1460px !important',
    maxWidth: '1500px !important'
  },
  headerTitleWithDesc: {
    wrapper: { textAlign: 'left' },
    title: { typography: H6 },
    description: { typography: Body2, color: 'primary.500' }
  },
  updateProfileBtn
}
