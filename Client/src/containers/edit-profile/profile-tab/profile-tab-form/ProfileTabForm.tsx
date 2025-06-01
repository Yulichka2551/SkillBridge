import { ChangeEvent, FC, FocusEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import LocationSelectionInputs from '~/components/location-selection-inputs/LocationSelectionInputs'
import FileUploader from '~/components/file-uploader/FileUploader'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'

import {
  ButtonVariantEnum,
  EditProfileForm,
  FormNonInputValueChange,
  PositionEnum,
  SizeEnum,
  UploadFileEmitterArgs,
  UseFormErrors,
  UseFormEventHandler
} from '~/types'

import { languages } from '~/containers/tutor-home-page/language-step/constants'
import { validationData } from '~/containers/tutor-home-page/add-photo-step/constants'
import { useAppDispatch } from '~/hooks/use-redux'
import { snackbarVariants } from '~/constants'
import { imageResize } from '~/utils/image-resize'
import { styles } from '~/containers/edit-profile/profile-tab/profile-tab-form/ProfileTabForm.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { createUrlPath } from '~/utils/helper-functions'
import { Typography } from '@mui/material'

export interface ProfileTabFormProps {
  data: EditProfileForm
  errors: UseFormErrors<EditProfileForm>
  handleInputChange: UseFormEventHandler<
    EditProfileForm,
    ChangeEvent<HTMLInputElement>
  >
  handleNonInputValueChange: FormNonInputValueChange<
    EditProfileForm[keyof EditProfileForm],
    EditProfileForm
  >
  handleBlur: UseFormEventHandler<EditProfileForm, FocusEvent<HTMLInputElement>>
}

const ProfileTabForm: FC<ProfileTabFormProps> = ({
  data,
  errors,
  handleInputChange,
  handleNonInputValueChange,
  handleBlur
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const onLanguageChange = (
    _: SyntheticEvent,
    value: EditProfileForm['nativeLanguage']
  ) => {
    handleNonInputValueChange('nativeLanguage', value)
  }

  const resizeImage = async (photo: File) => {
    try {
      const originalPhotoPath = URL.createObjectURL(photo)
      const photoSizes = { newWidth: 440, newHeight: 440 }

      const resizedPhoto = await imageResize(originalPhotoPath, photoSizes)
      handleNonInputValueChange('photo', {
        src: resizedPhoto,
        name: photo.name
      })
    } catch (error) {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: t('becomeTutor.photo.resizeImage')
        })
      )
    }
  }

  const addPhoto = ({ files, error }: UploadFileEmitterArgs) => {
    if (error) {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: error
        })
      )
      return
    }

    void resizeImage(files[0])
  }
  const handleRemovePhoto = () => {
    const updatedPhoto =
      typeof photo === 'string' ? null : { src: '', name: '' }
    handleNonInputValueChange('photo', updatedPhoto)
  }

  const { photo } = data
  const photoToDisplay =
    typeof photo === 'string'
      ? photo && createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL, photo)
      : photo?.src

  return (
    <Box sx={styles.profileGeneralTabContainer}>
      <Box sx={styles.avatar.root}>
        <Box>
          <DragAndDrop
            emitter={addPhoto}
            style={{ root: styles.avatar.img }}
            validationData={validationData}
          >
            <AvatarIcon
              firstName={data.firstName}
              lastName={data.lastName}
              photo={photoToDisplay}
              sx={{
                minWidth: '150px !important',
                maxWidth: '300px !important',
                minHeight: '150px !important',
                borderRadius: '50% !important'
              }}
            />
          </DragAndDrop>
        </Box>

        <Box sx={styles.avatar.textWithButtons}>
          <Typography
            sx={{
              color: '#413B90',
              fontFamily: 'Montserrat, sans-serif !important',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            {t('editProfilePage.profile.generalTab.uploadTitle')}
          </Typography>
          <Typography
            sx={{
              color: 'rgb(118, 110, 226)',
              fontFamily: 'Montserrat, sans-serif !important',
              fontSize: '13px'
            }}
          >
            {t('editProfilePage.profile.generalTab.uploadDesc')}
          </Typography>

          <Box sx={styles.avatar.buttons}>
            <FileUploader
              buttonText={t('editProfilePage.profile.generalTab.uploadTitle')}
              emitter={addPhoto}
              size={SizeEnum.Large}
              validationData={validationData}
              variant={ButtonVariantEnum.ContainedLight}
            />
            <AppButton
              onClick={handleRemovePhoto}
              size={SizeEnum.Large}
              variant={ButtonVariantEnum.Tonal}
              sx={{
                backgroundColor: '#847BFF !important',
                color: 'white',
                fontFamily: 'Montserrat, sans-serif !important',
                borderRadius: '30px !important',
                padding: '15px 20px !important'
              }}
            >
              {t('common.remove')}
            </AppButton>
          </Box>
        </Box>
      </Box>

      <Box sx={styles.section}>
        <Typography
          sx={{
            color: '#413B90',
            fontFamily: 'Montserrat, sans-serif !important',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          👤 Персональна інформація
        </Typography>
        <Typography
          sx={{
            color: 'rgb(118, 110, 226)',
            fontFamily: 'Montserrat, sans-serif !important',
            fontSize: '13px'
          }}
        >
          Ваше ім’я може бути відображене у SkillBridge, коли інші згадуватимуть
          вас у контексті навчання або співпраці.
        </Typography>

        <Box sx={styles.dividedInputs}>
          <AppTextField
            errorMsg={t(errors.firstName)}
            fullWidth
            placeholder={t('common.labels.firstName')}
            InputLabelProps={{ shrink: false }}
            onBlur={handleBlur('firstName')}
            onChange={handleInputChange('firstName')}
            required
            value={data.firstName}
            sx={{
              mb: '5px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                border: '1px solid #CCC9FF',
                fontFamily: 'Montserrat, sans-serif !important'
              },

              '& .MuiInputLabel-root': {
                color: '#706CAB',
                fontFamily: 'Montserrat, sans-serif !important'
              }
            }}
          />
          <AppTextField
            errorMsg={t(errors.lastName)}
            fullWidth
            placeholder={t('common.labels.lastName')}
            onBlur={handleBlur('lastName')}
            onChange={handleInputChange('lastName')}
            required
            InputLabelProps={{ shrink: false }}
            value={data.lastName}
            sx={{
              mb: '5px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                border: '1px solid #CCC9FF',
                fontFamily: 'Montserrat, sans-serif !important'
              },

              '& .MuiInputLabel-root': {
                color: '#706CAB',
                fontFamily: 'Montserrat, sans-serif !important'
              }
            }}
          />
        </Box>
      </Box>

      <Box sx={styles.section}>
        <Typography
          sx={{
            color: '#413B90',
            fontFamily: 'Montserrat, sans-serif !important',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          📍 Локація
        </Typography>
        <Typography
          sx={{
            color: 'rgb(118, 110, 226)',
            fontFamily: 'Montserrat, sans-serif !important',
            fontSize: '13px'
          }}
        >
          Поділіться своїм місцезнаходженням, щоб легше знаходити однодумців
          поблизу або налаштувати графік занять у вашому часовому поясі.
        </Typography>
        <Box sx={styles.dividedInputs}>
          <LocationSelectionInputs<EditProfileForm>
            data={data}
            onDataChange={handleNonInputValueChange}
          />
        </Box>
      </Box>

      <Box sx={styles.section}>
        <Typography
          sx={{
            color: '#413B90',
            fontFamily: 'Montserrat, sans-serif !important',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          💼 Професійний заголовок
        </Typography>
        <Typography
          sx={{
            color: 'rgb(118, 110, 226)',
            fontFamily: 'Montserrat, sans-serif !important',
            fontSize: '13px'
          }}
        >
          Стисло розкажіть про свою професійну роль або амбіції — це допоможе
          іншим краще зрозуміти вас.
        </Typography>
        <AppTextArea
          InputLabelProps={{
            style: styles.professionalSummaryLabel(data.professionalSummary),
            shrink: false
          }}
          fullWidth
          placeholder='Введіть текст...'
          maxLength={200}
          sx={{
            mb: '5px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              border: '1px solid #CCC9FF',
              fontFamily: 'Montserrat, sans-serif !important'
            },

            '& .MuiInputLabel-root': {
              color: '#706CAB',
              fontFamily: 'Montserrat, sans-serif !important'
            }
          }}
          onChange={handleInputChange('professionalSummary')}
          value={data.professionalSummary}
        />
      </Box>

      <Box sx={styles.section}>
        <Typography
          sx={{
            color: '#413B90',
            fontFamily: 'Montserrat, sans-serif !important',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          🌐 Мова
        </Typography>
        <Typography
          sx={{
            color: 'rgb(118, 110, 226)',
            fontFamily: 'Montserrat, sans-serif !important',
            fontSize: '13px'
          }}
        >
          Оберіть мову, якою вам зручно навчатися, спілкуватися та ділитися
          знаннями зі спільнотою.
        </Typography>
        <AppAutoComplete
          onChange={onLanguageChange}
          options={languages}
          textFieldProps={{
            placeholder: 'Рідна мова',
            sx: styles.languageInput
          }}
          sx={{
            mb: '5px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              border: '1px solid #CCC9FF',
              fontFamily: 'Montserrat, sans-serif !important'
            },

            '& .MuiInputLabel-root': {
              color: '#706CAB',
              fontFamily: 'Montserrat, sans-serif !important'
            }
          }}
          InputLabelProps={{ shrink: false }}
          value={data.nativeLanguage}
        />
      </Box>
    </Box>
  )
}

export default ProfileTabForm
