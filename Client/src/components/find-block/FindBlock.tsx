import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  IconButton
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import useBreakpoints from '~/hooks/use-breakpoints'
import TitleBlock from '~/components/title-block/TitleBlock'

import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/components/find-block/find-block.styles'
import { UserRoleEnum } from '~/types'
import { useAppSelector } from '~/hooks/use-redux'

interface FindBlockProps {
  translationKey: string
}

const levels = ['Початковий', 'Середній', 'Професіонал']
const categories = [
  'Математика',
  'Фізика',
  'Програмування',
  'Музика',
  'Іноземні мови',
  'Історія'
]
const prices = ['$0-$50', '$50-$500', '$500-$5000']

const FindBlock = ({ translationKey }: FindBlockProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isMobile } = useBreakpoints()

  const [level, setLevel] = useState('Intermediate')
  const [category, setCategory] = useState('Mathematics')
  const [price, setPrice] = useState('$20.00-$4000')
  const { userRole } = useAppSelector((state) => state.appMain)
  const isTutor = userRole === UserRoleEnum.Tutor

  const handleSearch = useCallback(() => {
    const query = `level=${encodeURIComponent(
      level
    )}&category=${encodeURIComponent(category)}&price=${encodeURIComponent(
      price
    )}`
    navigate(`${authRoutes.findOffers.path}?${query}`)
  }, [level, category, price, navigate])

  const handleSelectChange =
    (setter: (value: string) => void) => (event: SelectChangeEvent<string>) => {
      setter(event.target.value)
    }

  const levels = ['Початковий', 'Середній', 'Професіонал']
  const subjects = ['Математика', 'Фізика', 'Програмування', 'Іноземні мови']
  const budgets = ['$0-$20', '$20-$100', '$100+']

  const [subject, setSubject] = useState('Математика')
  const [budget, setBudget] = useState('$20-$100')

  if (isTutor) {
    return (
      <Box
        className='section'
        sx={{
          ...styles.header
        }}
      >
        <Box
          sx={{
            ...styles.container,
            width: '60%',
            margin: '0 auto ',
            paddingRight: '120px !important'
          }}
        >
          <p
            style={{
              textAlign: 'center',
              fontSize: '60px',
              pb: '30px',
              paddingRight: '80px',
              fontWeight: 400,
              fontFamily: 'Montserrat, sans-serif',
              color: '#413B90',
              mb: 1
            }}
          >
            Освітній зв’язок без кордонів{' '}
          </p>
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              color: '#413B90',
              fontSize: '18px',
              textAlign: 'center',
              mb: 4,
              paddingRight: '100px'
            }}
          >
            SkillBridge відкриває нову еру навчання — простір, де ваш досвід
            стає можливістю для інших. Розкажіть, що саме ви хочете викладати, і
            платформа сама допоможе знайти тих, хто прагне це опанувати.
            Об’єднуйте знання з натхненням та будуйте власну спільноту учнів по
            всьому світу.
          </p>
          <Box
            sx={{
              mt: 5,
              mr: '100px',
              p: 2,
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              gap: 4,
              flexWrap: isMobile ? 'wrap' : 'nowrap'
            }}
          >
            <Box>
              <Typography variant='caption' sx={{ color: '#413B90BF' }}>
                Рівень
              </Typography>
              <Select
                value={level}
                onChange={handleSelectChange(setLevel)}
                variant='standard'
                disableUnderline
                sx={{ color: '#413B90' }}
              >
                {levels.map((lvl) => (
                  <MenuItem key={lvl} value={lvl} sx={{ color: '#413B90' }}>
                    {lvl}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box>
              <Typography variant='caption' sx={{ color: '#413B90BF' }}>
                Предмет
              </Typography>
              <Select
                value={subject}
                onChange={handleSelectChange(setSubject)}
                variant='standard'
                disableUnderline
                sx={{ color: '#413B90' }}
              >
                {subjects.map((subj) => (
                  <MenuItem key={subj} value={subj} sx={{ color: '#413B90' }}>
                    {subj}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box>
              <Typography variant='caption' sx={{ color: '#413B90BF' }}>
                Бюджет
              </Typography>
              <Select
                value={budget}
                onChange={handleSelectChange(setBudget)}
                variant='standard'
                disableUnderline
                sx={{ color: '#413B90' }}
              >
                {budgets.map((b) => (
                  <MenuItem key={b} value={b} sx={{ color: '#413B90' }}>
                    {b}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <IconButton
              sx={{
                backgroundColor: '#4D47C3',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#3b36a3'
                }
              }}
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box className='section' sx={styles.header}>
      <Box sx={styles.container}>
        <TitleBlock translationKey={translationKey} />

        {/* Фільтр-блок всередині container */}
        <Box
          sx={{
            mt: 3,
            mr: '200px',
            p: 2,
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            gap: 4,
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}
        >
          <Box>
            <Typography
              variant='caption'
              color='textSecondary'
              sx={{ color: '#413B90BF' }}
            >
              Рівень
            </Typography>
            <Select
              value={level}
              onChange={handleSelectChange(setLevel)}
              variant='standard'
              disableUnderline
              sx={{ color: '#413B90' }}
            >
              {levels.map((lvl) => (
                <MenuItem key={lvl} value={lvl} sx={{ color: '#413B90' }}>
                  {lvl}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box>
            <Typography
              variant='caption'
              color='textSecondary'
              sx={{ color: '#413B90BF' }}
            >
              Категорія
            </Typography>
            <Select
              value={category}
              onChange={handleSelectChange(setCategory)}
              variant='standard'
              disableUnderline
              sx={{ color: '#413B90' }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat} sx={{ color: '#413B90' }}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box>
            <Typography
              variant='caption'
              color='textSecondary'
              sx={{ color: '#413B90BF' }}
            >
              Ціна
            </Typography>
            <Select
              value={price}
              onChange={handleSelectChange(setPrice)}
              variant='standard'
              disableUnderline
              sx={{ color: '#413B90' }}
            >
              {prices.map((prc) => (
                <MenuItem key={prc} value={prc} sx={{ color: '#413B90' }}>
                  {prc}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <IconButton
            sx={{
              backgroundColor: '#4D47C3',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#3b36a3'
              }
            }}
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default FindBlock
