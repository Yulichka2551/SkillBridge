export const styles = {
  linesBox: {
    m: '22px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:after, &:before': {
      content: '""',
      width: '100%',
      height: '1px',
      backgroundColor: '#413B90'
    }
  },
  continue: {
    whiteSpace: 'nowrap',
    m: '0 10px',
    color: '#706CAB !important',
    fontFamily: 'Montserrat, sans-serif !important'
  },
  underlineText: {
    fontWeight: '500',
    color: '#706CAB',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  underlineTextUa: {
    mt: '6px'
  },
  haveAccount: {
    display: 'flex',
    color: '#706CAB'
  },
  haveAccountUa: {
    flexDirection: 'column'
  },
  googleForm: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '330px',
    color: '#706CAB !important'
  }
}
