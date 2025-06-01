import { TypographyVariantEnum } from '~/types'

export const styles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    typography: TypographyVariantEnum.H4,
    color: ' #413B90 !important',
    fontFamily: 'Montserrat, sans-serif  !important',
    fontWeight: '600 !important'
  },
  description: {
    typography: TypographyVariantEnum.Subtitle1,
    color: 'rgb(118, 110, 226)'
  },
  line: {
    m: '16px 0',
    backgroundColor: 'rgba(92, 86, 179, 0.66)  !important'
  },
  updateBtn: {
    padding: '10px',
    borderRadius: '20px !important',
    backgroundColor: '#F1F1FF',
    color: '#706CAB',
    textTransform: 'none',
    fontFamily: 'Montserrat, sans-serif',

    '&:disabled': {
      backgroundColor: '#F1F1FF !important',
      color: '#706CAB !important'
    },

    '&:not(:disabled)': {
      backgroundColor: '#847BFF !important',
      color: '#ffffff !important',
      '&:hover': {
        backgroundColor: '#5d52f7 !important'
      }
    }
  },
  mainContainer: {
    display: 'flex',
    maxWidth: '1500px !important',
    justifyContent: 'space-evenly !important',
    gap: '24px'
  },
  mainContent: {}
}
