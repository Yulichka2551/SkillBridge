// import backgroundImg from '../../guest-home-page/styles/WelcomeImages/welcome.png'
import backgroundImg from '../../containers/guest-home-page/styles/WelcomeImages/welcome.png'
export const styles = {
  header: {
    minHeight: { md: '650px', sm: '319px', xs: '404px' },
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%'
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '70px 10px 70px 190px !important',
    mt: { xs: '64px', md: '84px' }
  },

  button: {
    whiteSpace: 'nowrap',
    height: '48px'
  },

  input: {
    py: { xs: 0 },
    display: 'flex',
    flexGrow: '1',
    gap: '8px',
    mr: { sm: 3, xs: 0 },
    mb: { sm: 0, xs: 2 },
    backgroundColor: 'basic.white',
    borderRadius: '4px',
    maxHeight: '48px'
  }
}
