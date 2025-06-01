export const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: { sm: '340px' }
  },
  loginOptionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '40px',
    p: '0px 5px',
    mb: '10px'
  },
  input: {
    maxWidth: '343px'
  },
  loginButton: {
    width: '100%',
    padding: '14px 0px',
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
  checkboxLabel: {
    mr: 0,
    '& .MuiFormControlLabel-label': {
      typography: 'body2'
    }
  },
  forgotPass: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#413B90',
    pl: '200px',
    '&:hover': {
      textDecoration: 'underline'
    },
    '&:focus': {
      outline: '2px solid',
      borderRadius: '2px'
    }
  }
}
