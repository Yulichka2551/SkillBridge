import { useState } from 'react'
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Container,
  Paper,
  Divider,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import CelebrationIcon from '@mui/icons-material/Celebration'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { UserRoleEnum } from '~/types'
import { useAppSelector } from '~/hooks/use-redux'

const MyCooperations = () => {
  const [subject, setSubject] = useState('')
  const [level, setLevel] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState('')
  const [price, setPrice] = useState('')
  const [access, setAccess] = useState(false)
  const [schedule, setSchedule] = useState('')
  const { userRole } = useAppSelector((state) => state.appMain)
  const isTutor = userRole === UserRoleEnum.Tutor
  const [professionalTitle, setProfessionalTitle] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [students, setStudents] = useState(0)
  const [hours, setHours] = useState(0)
  const [experience, setExperience] = useState(0)
  const [teachingLanguage, setTeachingLanguage] = useState('')
  const [education, setEducation] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [offerDetails, setOfferDetails] = useState('')

  const languagesList = [
    'Українська',
    'Англійська',
    'Російська',
    'Німецька',
    'Французька',
    'Іспанська',
    'Інша'
  ]

  const handleSubmit = () => {
    console.log({
      subject,
      level,
      title,
      description,
      language,
      price,
      access,
      schedule
    })
    alert(
      'Ваш запит отримано! Чекайте на наш дзвінок або лист найближчим часом.'
    )
    setSubject('')
    setLevel('')
    setDescription('')
    setTitle('')
    setLanguage('')
    setPrice('')
    setAccess(false)
    setSchedule('')
  }

  const toggleCategory = (category: string) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  if (isTutor) {
    return (
      <Container maxWidth='xl' sx={{ mt: 6, mb: 6 }}>
        <Paper
          elevation={4}
          sx={{ padding: 5, borderRadius: 4, backgroundColor: '#fdfcff' }}
        >
          <Box textAlign='center' mb={4}>
            <Typography variant='h4' color='#413B90' gutterBottom>
              <SchoolIcon
                sx={{ fontSize: 40, mr: 1, verticalAlign: 'middle' }}
              />{' '}
              Створити новий запит
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Створіть пропозицію і знайдіть тих, хто хоче вчитися саме у вас.
              Розвивайте таланти і надихайте нове покоління.
            </Typography>
          </Box>

          <Typography variant='h6' color='#413B90' gutterBottom>
            Основна інформація
          </Typography>

          <TextField
            label='Професійний заголовок'
            placeholder='Сертифікований викладач англійської мови'
            fullWidth
            margin='normal'
            value={professionalTitle}
            onChange={(e) => setProfessionalTitle(e.target.value)}
          />
          <TextField
            label='Спеціалізація'
            placeholder='Англійська мова'
            fullWidth
            margin='normal'
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />

          <Divider sx={{ my: 4 }} />

          <Typography variant='h6' color='#413B90' gutterBottom>
            Статистика та досвід
          </Typography>

          <TextField
            label='Кількість студентів'
            type='number'
            fullWidth
            margin='normal'
            value={students}
            onChange={(e) => setStudents(Number(e.target.value))}
          />
          <TextField
            label='Години викладання'
            type='number'
            fullWidth
            margin='normal'
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          <TextField
            label='Досвід (роки)'
            type='number'
            fullWidth
            margin='normal'
            value={experience}
            onChange={(e) => setExperience(Number(e.target.value))}
          />

          <Divider sx={{ my: 4 }} />

          <Typography variant='h6' color='#413B90' gutterBottom>
            Деталі пропозиції
          </Typography>

          <TextField
            label='Ціна за урок (гривні)'
            type='number'
            fullWidth
            margin='normal'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel>Мова викладання</InputLabel>
            <Select
              value={teachingLanguage}
              onChange={(e) => setTeachingLanguage(e.target.value)}
              label='Мова викладання'
            >
              {languagesList.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label='Освіта'
            placeholder="КНЛУ, спеціальність 'Філологія англійської мови', магістр"
            multiline
            rows={3}
            fullWidth
            margin='normal'
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {categories.map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    checked={categories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                }
                label={cat}
              />
            ))}
          </Box>

          <FormControl fullWidth margin='normal'>
            <InputLabel>Рівень</InputLabel>
            <Select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              label='Рівень'
            >
              <MenuItem value='Початковий'>Початковий</MenuItem>
              <MenuItem value='Середній'>Середній</MenuItem>
              <MenuItem value='Високий'>Високий</MenuItem>
              <MenuItem value='Підготовка до тесту'>
                Підготовка до тесту
              </MenuItem>
              <MenuItem value='Професійний'>Професійний</MenuItem>
              <MenuItem value='Спеціалізований'>Спеціалізований</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label='Бажаний графік занять (опціонально)'
            placeholder='Наприклад, Пн-Ср-Пт після 18:00'
            fullWidth
            margin='normal'
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            InputProps={{ startAdornment: <AccessTimeIcon sx={{ mr: 1 }} /> }}
          />

          <TextField
            label='Опис пропозиції'
            placeholder='Індивідуальні онлайн-заняття тривалістю 60 хв. Застосовую комунікативну методику...'
            multiline
            rows={4}
            fullWidth
            margin='normal'
            value={offerDetails}
            onChange={(e) => setOfferDetails(e.target.value)}
          />

          <Button
            onClick={handleSubmit}
            variant='contained'
            sx={{
              backgroundColor: '#413B90',
              color: 'white',
              mt: 3,
              '&:hover': { backgroundColor: '#2c2865' },
              paddingY: 1.2
            }}
            fullWidth
          >
            Зберегти профіль
          </Button>

          <Box mt={5} textAlign='center'>
            <CelebrationIcon
              color='secondary'
              sx={{ fontSize: 36, verticalAlign: 'middle' }}
            />
            <Typography variant='h6' color='#413B90' mt={1}>
              Дякуємо! Ми зв'яжемося з вами найближчим часом.
            </Typography>
          </Box>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth='xl' sx={{ mt: 6, mb: 6 }}>
      <Paper
        elevation={4}
        sx={{ padding: 5, borderRadius: 4, backgroundColor: '#fdfcff' }}
      >
        <Box textAlign='center' mb={4}>
          <Typography variant='h4' color='#413B90' gutterBottom>
            <SchoolIcon sx={{ fontSize: 40, mr: 1, verticalAlign: 'middle' }} />{' '}
            Створити новий запит
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Знайдіть репетитора, який ідеально підходить для ваших потреб.
            Заповніть форму нижче, і ми допоможемо вам досягти ваших академічних
            цілей.
          </Typography>
        </Box>

        <Typography variant='h6' color='#413B90' gutterBottom>
          1. Опишіть ваші потреби у навчанні
        </Typography>

        <FormControl fullWidth margin='normal'>
          <InputLabel>Категорія / Предмет</InputLabel>
          <Select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            label='Категорія / Предмет'
          >
            <MenuItem value='Математика'>Математика</MenuItem>
            <MenuItem value='Англійська мова'>Англійська мова</MenuItem>
            <MenuItem value='Програмування'>Програмування</MenuItem>
            <MenuItem value='Фізика'>Фізика</MenuItem>
            <MenuItem value='Хімія'>Хімія</MenuItem>
            <MenuItem value='Біологія'>Біологія</MenuItem>
            <MenuItem value='Музика'>Музика</MenuItem>
            <MenuItem value='Інше'>Інше</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel>Рівень</InputLabel>
          <Select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            label='Рівень'
          >
            <MenuItem value='Початковий'>Початковий</MenuItem>
            <MenuItem value='Середній'>Середній</MenuItem>
            <MenuItem value='Високий'>Високий</MenuItem>
            <MenuItem value='Підготовка до тесту'>Підготовка до тесту</MenuItem>
            <MenuItem value='Професійний'>Професійний</MenuItem>
            <MenuItem value='Спеціалізований'>Спеціалізований</MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ my: 4 }} />

        <Typography variant='h6' color='#413B90' gutterBottom>
          2. Бажані параметри навчання
        </Typography>

        <TextField
          label='Заголовок запиту'
          placeholder='Потрібен репетитор з хімії для 10 класу'
          fullWidth
          margin='normal'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ maxLength: 100 }}
        />

        <TextField
          label='Опишіть ваш запит'
          placeholder='Хочу покращити знання з органічної хімії та підготуватись до НМТ.'
          multiline
          rows={4}
          fullWidth
          margin='normal'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          inputProps={{ maxLength: 1000 }}
        />

        <TextField
          label='Бажана мова викладання'
          placeholder='Українська, Англійська'
          fullWidth
          margin='normal'
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <TextField
          label='Бажана ціна за урок (гривні)'
          placeholder='Наприклад, 50'
          fullWidth
          margin='normal'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type='number'
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={access}
              onChange={(e) => setAccess(e.target.checked)}
            />
          }
          label='Хочу мати доступ до навчальних матеріалів після завершення курсу'
          sx={{ mt: 2 }}
        />

        <TextField
          label='Бажаний графік занять (опційно)'
          placeholder='Наприклад, Пн-Ср-Пт після 18:00'
          fullWidth
          margin='normal'
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          InputProps={{ startAdornment: <AccessTimeIcon sx={{ mr: 1 }} /> }}
        />

        <Divider sx={{ my: 4 }} />

        <TextField
          label='Ваше запитання (опційно)'
          placeholder='Чи надаєте ви домашні завдання?'
          fullWidth
          margin='normal'
        />

        <TextField
          label='Ваша відповідь (опційно)'
          placeholder='Я хотів(ла) б отримувати короткі вправи після кожного заняття.'
          fullWidth
          margin='normal'
        />

        <Button
          onClick={handleSubmit}
          variant='contained'
          sx={{
            backgroundColor: '#413B90',
            color: 'white',
            mt: 3,
            '&:hover': { backgroundColor: '#2c2865' },
            paddingY: 1.2
          }}
          fullWidth
        >
          Надіслати запит
        </Button>

        <Box mt={5} textAlign='center'>
          <CelebrationIcon
            color='secondary'
            sx={{ fontSize: 36, verticalAlign: 'middle' }}
          />
          <Typography variant='h6' color='#413B90' mt={1}>
            Дякуємо! Ми зв'яжемося з вами найближчим часом.
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default MyCooperations
