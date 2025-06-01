import { useMemo, FormEventHandler, FocusEvent, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import useInputVisibility from '~/hooks/use-input-visibility'
import AppTextField from '~/components/app-text-field/AppTextField'

import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/guest-home-page/signup-form/SignupForm.styles'
import { SignupParams, UseFormErrors, UseFormEventHandler } from '~/types'
import { useAppSelector } from '~/hooks/use-redux'

interface SignupFormProps {
  handleSubmit: FormEventHandler<HTMLFormElement>
  handleChange: UseFormEventHandler<SignupParams, ChangeEvent<HTMLInputElement>>
  handleBlur: UseFormEventHandler<SignupParams, FocusEvent<HTMLInputElement>>
  data: SignupParams
  errors: UseFormErrors<SignupParams>
}

const SignupForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}: SignupFormProps) => {
  const { t } = useTranslation()

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)
  const { authLoading } = useAppSelector((state) => state.appMain)

  const isValid = useMemo(
    () =>
      Object.values(errors).every((elem) => elem === '') &&
      Object.values(data).every((elem) => elem !== ''),
    [data, errors]
  )

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Box sx={{ display: { md: 'block', lg: 'flex' }, gap: '15px' }}>
        <AppTextField
          autoFocus
          errorMsg={t(errors.firstName)}
          fullWidth
          InputLabelProps={{ shrink: false }}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          placeholder={t('common.labels.firstName')}
          required
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
          type='text'
          value={data.firstName}
        />

        <AppTextField
          errorMsg={t(errors.lastName)}
          fullWidth
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          InputLabelProps={{ shrink: false }}
          placeholder={t('common.labels.lastName')}
          required
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
          type='text'
          value={data.lastName}
        />
      </Box>

      <AppTextField
        errorMsg={t(errors.email)}
        fullWidth
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        InputLabelProps={{ shrink: false }}
        placeholder={t('common.labels.email')}
        required
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
        type='email'
        value={data.email}
      />

      <AppTextField
        errorMsg={t(errors.password)}
        fullWidth
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        InputLabelProps={{ shrink: false }}
        placeholder={t('common.labels.password')}
        required
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
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <AppTextField
        errorMsg={t(errors.confirmPassword)}
        fullWidth
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        InputLabelProps={{ shrink: false }}
        placeholder={t('common.labels.confirmPassword')}
        required
        sx={{
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
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />

      <AppButton
        disabled={!isValid}
        loading={authLoading}
        sx={styles.signupButton}
        type='submit'
      >
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignupForm
