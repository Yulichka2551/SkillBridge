import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum, VisibilityEnum } from '~/types'

const { Subtitle1, Body2, Caption, H6 } = TypographyVariantEnum

const titleWithDescription = {
  wrapper: { textAlign: 'left' },
  title: { typography: Subtitle1 },
  description: { typography: Body2, color: 'primary.500' }
}

export const styles = {
  profileGeneralTabContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px'
  },
  avatar: {
    root: {
      display: 'flex',
      columnGap: '140px',
      my: '20px',
      marginBottom: '80px'
    },
    img: { width: '108px', height: '108px', fontSize: '40px' },
    textWithButtons: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    titleWithDesc: {
      ...titleWithDescription,
      description: { typography: Caption, color: 'primary.500' }
    },
    buttons: { display: 'flex', columnGap: '10px' }
  },
  section: { display: 'flex', flexDirection: 'column', rowGap: '15px' },

  sectionsTitleWithDesc: { ...titleWithDescription },
  dividedInputs: { display: 'flex', columnGap: '10px' },
  professionalSummaryLabel: (text: string) => ({
    color: palette.primary[400],
    top: '-2px',
    ...(text && { visibility: VisibilityEnum.Hidden })
  }),
  languageInput: { maxWidth: '300px', width: '100%', mb: '20px' },
  linkAdornment: { '& > p': { color: 'primary.500' } },
  videoLinkInput: { '& .MuiInputBase-input': { pl: 0 } }
}

// padding: '10px',
// borderRadius: '20px !important',
// backgroundColor: '#F1F1FF',
// color: '#706CAB',
// textTransform: 'none',
// fontFamily: 'Montserrat, sans-serif',

// '&:disabled': {
//   backgroundColor: '#F1F1FF !important',
//   color: '#706CAB !important'
// },

// '&:not(:disabled)': {
//   backgroundColor: '#847BFF !important',
//   color: '#ffffff !important',
//   '&:hover': {
//     backgroundColor: '#5d52f7 !important'
//   }
// }
