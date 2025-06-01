import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 2
  },
  info: {
    minWidth: '80%'
  },
  form: {
    display: 'flex',
    flexWrap: { sm: 'nowrap', xs: 'wrap' },
    maxWidth: { md: '80%' }
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'center',
      mb: '8px',
      width: { md: '80%' }
    },
    title: {
      typography: {
        xs: TypographyVariantEnum.H5,
        sm: TypographyVariantEnum.H4
      },
      textAlign: 'center',
      fontSize: '60px !important',
      pb: '30px',
      fontWeight: '400 !important',
      fontFamily: 'Montserrat, sans-serif !important',
      color: '#413B90',
      mb: 1
    },
    description: {
      typography: {
        sm: TypographyVariantEnum.Body1,
        xs: TypographyVariantEnum.Body2
      },
      fontFamily: 'Montserrat, sans-serif !important',

      color: '#413B90',
      mb: 3,
      whiteSpace: { md: 'pre-line' }
    }
  }
}
