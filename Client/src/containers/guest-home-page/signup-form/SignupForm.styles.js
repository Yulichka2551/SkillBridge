export const styles = {
  input: {
    maxWidth: '343px'
  },
  checkboxContainer: {
    mb: '20px'
  },
  checkboxLabel: {
    mr: 0,
    '& .MuiFormControlLabel-label': {
      typography: 'subtitle2'
    }
  },
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    color: '#413B90',
    whiteSpace: 'nowrap'
  },
  signupButton: {
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

  underlineText: {
    color: '#413B90',
    marginLeft: '5px',
    textDecoration: 'underline'
  }
}
