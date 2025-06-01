import { ReactNode } from 'react'

import Box from '@mui/material/Box'
import SchoolIcon from '@mui/icons-material/School'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'
import AppChipList from '~/components/app-chips-list/AppChipList'

import { styles } from '~/containers/user-profile/profile-info/ProfileInfo.styles'
import { UserResponse } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'
import { Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

interface ProfileContainerDesktopProps {
  actionIcon: ReactNode
  accInfo: ReactNode
  buttonGroup: ReactNode
  defaultQuantity: number
  doneItems: { title: string; description: string }[]
  userData: UserResponse
  chipItems: string[]
}

const ProfileContainerDesktop = ({
  userData,
  actionIcon,
  buttonGroup,
  chipItems
}: ProfileContainerDesktopProps) => {
  return (
    <Box sx={styles.container}>
      {/* Avatar Section */}
      <Box sx={styles.avatarContainer}>
        <AvatarIcon
          firstName={userData.firstName}
          lastName={userData.lastName}
          photo={
            userData.photo &&
            createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL, userData.photo)
          }
          sx={styles.img}
        />
      </Box>

      {/* Action Icon */}
      <Box>{actionIcon}</Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: '400px'
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Montserrat, sans-serif !important',
            textAlign: 'center',
            color: '#413B90',
            fontSize: '30px',
            marginBottom: '50px'
          }}
        >
          <AccountCircle />
          Профіль студента
        </Typography>
        {/* Profile Info Section */}
        <Box sx={styles.infoWrapper}>
          {/* Title and Description */}
          <Typography
            sx={{
              color: '#413B90',
              fontSize: '23px',
              fontFamily: 'Montserrat, sans-serif !important'
            }}
          >{`${userData.firstName} ${userData.lastName}`}</Typography>
        </Box>

        {/* Button Group Section */}
        {buttonGroup}
      </Box>
    </Box>
  )
}

export default ProfileContainerDesktop
