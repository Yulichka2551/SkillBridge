import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import { useModalContext } from '~/context/modal-context'

import useChangeUserStatus from '~/hooks/use-change-user-status'
import PasswordSecurityItem from '~/containers/edit-profile/password-security-tab/password-security-item/PasswordSecurityItem'
import ChangePasswordModal from '~/containers/edit-profile/password-security-tab/change-password-modal/ChangePasswordModal'

import { ButtonVariantEnum } from '~/types'

const PasswordSecurityTab: FC = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()
  const { neededAction, checkStatusChange } = useChangeUserStatus()

  const openChangePasswordModal = () => {
    openModal({
      component: <ChangePasswordModal />
    })
  }
  const handleChangeStatusClick = () => {
    void checkStatusChange(
      `editProfilePage.profile.passwordSecurityTab.${neededAction}Title`,
      `editProfilePage.profile.passwordSecurityTab.${neededAction}Description`,
      true
    )
  }
  return (
    <Box
      sx={{
        width: '1460px !important',
        maxWidth: '1500px !important'
      }}
    >
      <PasswordSecurityItem
        buttonText={t(
          'editProfilePage.profile.passwordSecurityTab.changePassword'
        )}
        buttonVariant={ButtonVariantEnum.Tonal}
        description={
          'Оновіть свій пароль, ввівши чинний. Захистіть свій акаунт і залишайтеся в безпеці.'
        }
        onClick={openChangePasswordModal}
        title={'🔐 Пароль і безпека'}
      />
      <PasswordSecurityItem
        buttonText={t(
          `editProfilePage.profile.passwordSecurityTab.${neededAction}Account`
        )}
        buttonVariant={ButtonVariantEnum.Danger}
        description={
          'Ви можете тимчасово деактивувати або повністю видалити свій акаунт, якщо більше не плануєте користуватись платформою.'
        }
        onClick={handleChangeStatusClick}
        title={'🛑 Деактивація акаунту'}
      />
    </Box>
  )
}

export default PasswordSecurityTab
