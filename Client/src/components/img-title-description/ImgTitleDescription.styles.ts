export const styles = {
  root: { m: { xs: '100px 10px', sm: '56px', md: '80px' } },
  // img: { display: 'block', margin: '0 auto', width: '150px !important' },
  img: {
    display: 'block',
    mx: 'auto', // shorthand для margin-left + margin-right
    width: { xs: '120px', md: '150px' }, // адаптивно
    border: '2px solid red'
  },

  titleWithDescription: {
    wrapper: {
      maxWidth: '630px',
      textAlign: 'center'
    },
    title: {
      fontFamily: 'Cinzel, serif !important',
      fontWeight: '500 !important',
      typography: 'h5'
    },
    description: {
      typography: 'subtitile'
    }
  }
}
