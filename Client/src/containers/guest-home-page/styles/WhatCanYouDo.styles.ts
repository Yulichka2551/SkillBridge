export const styles = {
  cards: {
    height: '600px',
    display: 'flex',
    flexDirection: {
      sm: 'row',
      xs: 'column'
    },
    justifyContent: 'center',
    alignItems: { xs: 'center', sm: 'stretch' },
    columnGap: {
      lg: '64px',
      sm: '24px'
    },
    rowGap: '24px',
    py: {
      lg: '52px',
      sm: '48px',
      xs: '32px'
    },
    px: {
      lg: '52px',
      sm: '32px',
      xs: '16px'
    },
    backgroundColor: ' rgba(132, 123, 255, 0.2)',
    borderRadius: {
      md: '20px',
      xs: '16px'
    }
  },
  titleWithDescription: {
    wrapper: {
      marginBottom: '32px',
      textAlign: 'center'
    },
    title: {
      typography: { md: 'h3', xs: 'h4' },
      marginBottom: '16px',
      fontFamily: 'Cinzel, serif !important',
      fontWeight: '600 !important',
      color: ' #413B90'
    },
    description: {
      fontFamily: 'Montserrat, sans-serif !important',
      color: ' #413B90',
      typography: { xs: 'subtitle1' }
    }
  }
}
