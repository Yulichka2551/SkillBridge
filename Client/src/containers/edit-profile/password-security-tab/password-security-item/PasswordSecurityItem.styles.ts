import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    m: '20px 0',
    width: '1400px !important',
    maxWidth: '1500px !important',
    border: '0'
  },
  title: {
    color: '#413B90',
    fontFamily: 'Montserrat, sans-serif !important',
    fontWeight: 'bold',
    fontSize: '17px'
  },
  description: {
    color: 'rgb(118, 110, 226)',
    fontFamily: 'Montserrat, sans-serif !important',
    fontSize: '14px'
  },
  titlesAndButtonContainer: {
    p: '20px 0'
  },
  changePasswordButton: {
    backgroundColor: '#F8D1D1 !important',
    color: 'black !important',
    fontFamily: 'Montserrat, sans-serif !important',
    borderRadius: '30px !important',
    padding: '15px 20px !important'
  },

  // Кнопка "Деактивувати"
  deactivateButton: {
    backgroundColor: '#B7B4E7 !important',
    color: 'white !important',
    fontFamily: 'Montserrat, sans-serif !important',
    borderRadius: '30px !important',
    padding: '15px 20px !important'
  }
}
