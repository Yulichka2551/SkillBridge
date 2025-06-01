import backgroundImg from './WelcomeImages/welcome.png'

export const styles = {
  container: {
    flexDirection: 'column',
    minHeight: { md: '650px', sm: '319px', xs: '404px' },
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },

  title: {
    fontFamily: 'Cinzel, serif',
    textAlign: 'center',
    color: 'white',
    fontSize: '110px',
    lineHeight: '1 !important',
    width: '90%',
    height: '100px',
    marginBottom: '160px'
  },
  subtitle: {
    typography: {
      sm: 'body1',
      xs: 'body2'
    },
    px: '24px',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    maxWidth: { lg: '1000px', xs: '798px' },
    fontSize: '28px',
    marginBottom: '32px',
    textAlign: 'center',
    marginTop: '35px'
  },
  getStartBtn: {
    py: '16px',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600 !important',
    border: '2px solid #847BFF',
    borderRadius: '50px !important',
    px: { lg: '60px', xs: '32px' },
    backgroundColor: ' #D9D9D9 !important',
    color: ' #413B90 !important',
    textTransform: 'uppercase !important',
    marginTop: '35px'
  },
  map: {
    fontFamily: 'Montserrat, sans-serif',
    borderRadius: '7px !important',
    fontWeight: '500 !important',
    fontSize: '23px',
    color: 'white',
    backgroundColor: ' #413B90 !important',
    height: '60px',
    paddingLeft: '10px',
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  subtitles: {
    color: 'white',
    backgroundColor: ' #847BFF !important',
    borderRadius: '7px !important',
    fontFamily: 'Montserrat, sans-serif',
    marginTop: '5px',
    marginLeft: '50px',
    padding: '10px'
  }
}
