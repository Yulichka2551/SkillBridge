import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

import { useModalContext } from '~/context/modal-context'

import {
  ButtonVariantEnum,
  ComponentEnum,
  MainUserRole,
  OpenProfessionalCategoryModalHandler,
  ProfessionalBlock,
  UserRoleEnum
} from '~/types'

import {
  deleteCategory,
  setField,
  updateValidityStatus
} from '~/redux/features/editProfileSlice'

import { useDebounce } from '~/hooks/use-debounce'
import useForm from '~/hooks/use-form'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

import ProfessionalCategoryList from '~/containers/edit-profile/professional-info-tab/professional-category-list/ProfessionalCategoryList'
import AddProfessionalCategoryModal from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal'
import AboutTutorAccordion from '~/containers/edit-profile/professional-info-tab/about-tutor-accordion/AboutTutorAccordion'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/edit-profile/professional-info-tab/ProfessionalInfoTab.styles'
import { Typography } from '@mui/material'

const ProfessionalInfoTab: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { userRole } = useAppSelector((state) => state.appMain)
  const { categories, professionalBlock } = useAppSelector(
    (state) => state.editProfile
  )

  const { openModal, closeModal } = useModalContext()

  const { isValid, data, handleInputChange } = useForm<ProfessionalBlock>({
    initialValues: professionalBlock
  })

  const debouncedProfessionalBlockData = useDebounce(() => {
    dispatch(setField({ field: 'professionalBlock', value: data }))
  }, 300)

  useEffect(() => {
    debouncedProfessionalBlockData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleDeleteCategory = (categoryId: string) => {
    const userRoleToDeleteCategory = userRole as MainUserRole
    dispatch(
      deleteCategory({ id: categoryId, userRole: userRoleToDeleteCategory })
    )
  }

  useEffect(() => {
    dispatch(
      updateValidityStatus({ tab: 'professionalInfoTab', value: isValid })
    )
  }, [isValid, dispatch])

  const openProfessionalCategoryModal: OpenProfessionalCategoryModalHandler = (
    initialValues,
    isEdit
  ) => {
    openModal({
      component: (
        <AddProfessionalCategoryModal
          {...{ initialValues, closeModal, isEdit }}
          blockedCategoriesOptions={categories[userRole as MainUserRole]}
          isDeletionBlocked={initialValues?.isDeletionBlocked}
        />
      ),
      paperProps: {
        sx: styles.createCategoryButton
      }
    })
  }

  const TutorInfo = userRole === UserRoleEnum.Tutor && (
    <Box component='section'>
      <TitleWithDescription
        description={t(
          'editProfilePage.profile.professionalTab.aboutTheTutorDescription'
        )}
        style={styles.titleWithDescription}
        title={t('editProfilePage.profile.professionalTab.aboutTheTutorTitle')}
      />
      <Box sx={styles.accordionContainer}>
        <AboutTutorAccordion
          data={data}
          handleInputChange={handleInputChange}
        />
      </Box>
    </Box>
  )

  return (
    <Box sx={styles.root}>
      <Typography
        sx={{
          color: '#413B90',
          fontFamily: 'Montserrat, sans-serif !important',
          fontWeight: 'bold',
          fontSize: '20px'
        }}
      >
        💼 Професійні відомості
      </Typography>
      <Typography
        sx={{
          color: 'rgb(118, 110, 226)',
          fontFamily: 'Montserrat, sans-serif !important',
          fontSize: '16px'
        }}
      >
        Редагуйте свою публічну професійну інформацію, щоб інші учасники краще
        розуміли ваш досвід, інтереси та напрямки навчання чи викладання.
      </Typography>

      <Box component={ComponentEnum.Section}>
        <Typography
          sx={{
            marginTop: '20px',
            color: '#413B90',
            fontFamily: 'Montserrat, sans-serif !important',
            fontWeight: 'bold',
            fontSize: '17px'
          }}
        >
          🧭 Ваші професійні категорії
        </Typography>
        <Typography
          sx={{
            color: 'rgb(118, 110, 226)',
            fontFamily: 'Montserrat, sans-serif !important',
            fontSize: '13px'
          }}
        >
          Оберіть навчальні напрями, які вас цікавлять. Вкажіть щонайменше одну
          категорію, предмет і рівень володіння мовою — це допоможе платформі
          підібрати для вас відповідних співрозмовників, викладачів або
          студентів.
        </Typography>
        <Box sx={styles.createBtnContainer}>
          <AppButton
            onClick={() => openProfessionalCategoryModal()}
            startIcon={<AddIcon />}
            variant={ButtonVariantEnum.Contained}
            sx={{
              backgroundColor: '#847BFF !important',
              color: 'white',
              fontFamily: 'Montserrat, sans-serif !important',
              borderRadius: '30px !important',
              padding: '15px 20px !important'
            }}
          >
            {t('editProfilePage.profile.professionalTab.addCategoryBtn')}
          </AppButton>
        </Box>
        <ProfessionalCategoryList
          handleDeleteCategory={handleDeleteCategory}
          items={categories[userRole as MainUserRole]}
          openProfessionalCategoryModal={openProfessionalCategoryModal}
        />
      </Box>
      {TutorInfo}
    </Box>
  )
}

export default ProfessionalInfoTab
