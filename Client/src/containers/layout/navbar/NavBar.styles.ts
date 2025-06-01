import { withTheme } from '@emotion/react'
import { TypographyVariantEnum } from '~/types'

const navItem = {
  typography: TypographyVariantEnum.Subtitle2,
  whiteSpace: 'nowrap',
  color: 'primary.900',
  cursor: 'pointer',
  '&:hover': { color: 'primary.500' }
}

export const styles = {
  header: {
    backgroundColor: 'rgba(65, 59, 144, 0.78)',
    display: 'flex',
    justifyContent: 'space-between',
    p: 0,
    margin: { xs: 0, xl: 'auto' },
    maxWidth: '2000px',
    width: '1940px'
  },
  logoButton: {
    m: { xs: '10px', sm: '18px', md: '22px 6px 22px 24px', lg: '22px 24px' }
  },
  navList: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center'
  },
  listItem: { py: '5px', color: 'white !important' },
  navItemText: (isActive = false) => ({
    ...navItem,
    textDecoration: isActive ? 'underline' : 'none',
    '&:focus': { textDecoration: 'underline' }
  }),
  findOfferMenuItem: {
    ...navItem,
    p: '8px 14px'
  },
  arrowIcon: (open: boolean) => ({
    width: '18px',
    height: '18px',
    ml: '2px',
    color: 'primary.900',
    transform: `rotate(${open ? 180 : 0}deg)`
  }),
  divider: {
    color: 'primary.900',
    fontWeight: '500',
    px: '4px'
  }
}
