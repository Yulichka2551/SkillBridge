export const styles = {
  footer: {
    backgroundColor: '#413B90',
    color: 'primary.50',
    marginTop: 'auto'
  },
  container: {
    display: 'flex',
    height: '200px',
    justifyContent: 'space-around !important',
    margin: '0 150px 0 250px',
    flexDirection: { xs: 'column-reverse', sm: 'row' },
    alignItems: 'center',
    py: { xs: '12px', sm: '26px' }
  },
  contacts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    pd: '20px !important'
  },

  contactstitle: {
    fontSize: '20px',
    fontWeight: '600',
    fontFamily: 'Montserrat, sans-serif !important'
  },
  substitle: {
    fontSize: '15px',
    fontWeight: '400',
    fontFamily: 'Montserrat, sans-serif !important'
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '15px',
    marginTop: '20px'
  },
  img: {
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8
    }
  }
}
