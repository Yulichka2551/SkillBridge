export const styles = {
  card: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: { xs: '24px 32px', lg: '40px 70px' }
  },
  imgTitleDescription: {
    titleWithDescription: {
      title: {
        fontFamily: 'Cinzel, serif !important',
        fontWeight: '500 !important',
        color: ' #413B90',
        typography: 'h5',
        marginBottom: '16px'
      },
      description: {
        color: '#413B90 !important',
        fontFamily: 'Montserrat, sans-serif !important',
        fontWeight: '400 !important',
        typography: { md: 'body1', xs: 'body2' }
      }
    },
    img: {
      marginBottom: '24px'
    },
    root: {
      textAlign: 'center',
      mb: '24px'
    }
  },
  button: {
    backgroundColor: 'white !important',
    borderRadius: '20px !important',
    border: '2px solid #413B90 !important',
    color: '#413B90 !important',
    fontFamily: 'Montserrat, sans-serif !important',
    fontWeight: '400 !important',
    fontSize: '18px !important',
    alignSelf: 'center',
    '&:hover': {
      backgroundColor: '#847BFF !important', // Змінити колір фону на інший для ховера
      transform: 'scale(1.05)', // Можна додати анімацію збільшення при ховері
      color: 'white !important',
      border: '0 !important'
    }
  }
}
