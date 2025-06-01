import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

const style = {
  root: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    width: '600px',
    mt: { xs: '56px', sm: 0 },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }
  },
  imgContainer: {
    width: '450px',
    maxWidth: { md: '50%', lg: '450px' },
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' },
    pb: '50px',
    pl: { lg: '30px', md: '30px' },
    pr: '30px'
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'inherit',
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' }
  },
  title: {
    mb: '16px',
    color: '#413B90',
    fontFamily: 'Montserrat, sans-serif !important',
    fontSize: '40px',
    lineHeight: '48px'
  },
  form: {
    minWidth: '340px',
    overflow: 'auto',
    pt: '16px',
    ...scrollbar
  }
}

export default style
