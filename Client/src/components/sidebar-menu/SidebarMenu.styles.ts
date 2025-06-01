import palette from '~/styles/app-theme/app.pallete'

const activeTabButtonStyles = {
  backgroundColor: 'rgba(132, 123, 255, 0.23)',
  '& .MuiTypography-body1': {
    color: '#413B90 !important',
    fontWeight: '600'
  },
  '& .MuiListItemIcon-root svg': {
    color: '#413B90 !important'
  }
}

export const styles = {
  tabButton: (isTabActive: boolean) => {
    return {
      color: ' #413B90 !important',
      svg: { color: ' #413B90 !important' },
      '&:hover': activeTabButtonStyles,
      ...(isTabActive && activeTabButtonStyles)
    }
  },
  tabList: {
    maxWidth: '1500px !important',
    color: '  #413B90 !important',
    width: '1400px !important',
    display: 'flex',
    justifyContent: 'space-evenly !important',
    gap: '18px',
    pt: 0,
    '& > li': {
      p: '0px'
    },
    '& .MuiListItemButton-root': {
      display: 'flex',
      gap: '10px',
      '& .MuiListItemIcon-root': {
        minWidth: 'unset'
      }
    }
  },
  listItemContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.25
  },
  errorIcon: {
    color: `${palette.error[800]} !important`,
    fontSize: '1.25rem'
  }
}
