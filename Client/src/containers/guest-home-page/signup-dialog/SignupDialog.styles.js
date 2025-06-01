import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

export const styles = {
  root: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '56px', sm: 0 },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between !important',
    alignItems: 'center'
  },
  imgContainer: {
    width: '300px',
    maxHeight: '400px',
    display: { xs: 'none', md: 'flex' }
  },
  img: {
    objectFit: 'contain',
    width: '100%',
    height: '300px !important',
    mt: '20px'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 'inherit',
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' }
  },
  title: {
    display: 'flex',
    width: '630px !important',
    textAlign: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#413B90',
    fontFamily: 'Montserrat, sans-serif !important',
    mb: '8px',
    fontSize: '28px',
    lineHeight: '48px'
  },
  form: {
    overflow: 'auto',
    maxWidth: '365px',

    pt: '16px',
    ...scrollbar
  }
}
