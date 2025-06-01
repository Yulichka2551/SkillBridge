import { Calendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { uk } from 'date-fns/locale'
import { useState, useEffect } from 'react'
import './CalendarBlock.css'

const locales = { uk }
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales
})

type Event = {
  title: string
  start: Date
  end: Date
  note?: string
  reminder?: number
  attachment?: string
}

const StudentCalendar = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null)
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('student-events')
      if (saved) {
        const parsedEvents = JSON.parse(saved)
        if (Array.isArray(parsedEvents)) {
          setEvents(
            parsedEvents.map((e: any) => ({
              ...e,
              start: new Date(e.start), // Перетворення рядка на дату
              end: new Date(e.end) // Перетворення рядка на дату
            }))
          )
        }
      }
    } catch (error) {
      console.error('Error reading from localStorage', error)
    }
  }, [])

  useEffect(() => {
    try {
      if (events.length > 0) {
        localStorage.setItem('student-events', JSON.stringify(events))
        console.log('Події збережено в localStorage:', events)
      }
    } catch (error) {
      console.error('Error saving to localStorage', error)
    }
  }, [events])

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo)
    setStartTime('')
    setEndTime('')
  }

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event)
  }

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedSlot) return

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const note = formData.get('note') as string
    const reminder = Number(formData.get('reminder'))
    const file = formData.get('attachment') as File

    let attachment = ''
    if (file && file.size > 0) {
      attachment = await convertToBase64(file)
    }

    const start = combineDateAndTime(selectedSlot.start, startTime)
    const end = combineDateAndTime(selectedSlot.start, endTime)

    const newEvent: Event = {
      title,
      note,
      reminder,
      attachment,
      start,
      end
    }

    setEvents([...events, newEvent])
    setSelectedSlot(null)
    e.currentTarget.reset()
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })
  }

  const combineDateAndTime = (date: Date, time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number)
    const newDate = new Date(date)
    newDate.setHours(hours)
    newDate.setMinutes(minutes)
    return newDate
  }
  const customEventStyle = (event: Event) => {
    return {
      style: {
        backgroundColor: '#413B90', // твій бажаний колір
        color: '#fff',
        borderRadius: '10px',
        border: 'none',
        padding: '5px 10px'
      },
      'data-info': `${event.title} (${format(event.start, 'HH:mm', {
        locale: uk
      })} - ${format(event.end, 'HH:mm', { locale: uk })})`
    }
  }
  return (
    <div className='calendar-wrapper'>
      {selectedEvent && (
        <div className='event-details-panel'>
          <h3>Інформація про подію</h3>
          <p>
            <strong>Назва:</strong> {selectedEvent.title}
          </p>
          <p>
            <strong>Початок:</strong>{' '}
            {format(selectedEvent.start, 'dd MMMM yyyy HH:mm', { locale: uk })}
          </p>
          <p>
            <strong>Кінець:</strong>{' '}
            {format(selectedEvent.end, 'dd MMMM yyyy HH:mm', { locale: uk })}
          </p>
          {selectedEvent.note && (
            <p>
              <strong>Нотатка:</strong> {selectedEvent.note}
            </p>
          )}
          <button onClick={() => setSelectedEvent(null)}>Закрити</button>
        </div>
      )}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={customEventStyle}
        style={{
          borderRadius: '20px',
          backgroundColor: 'rgb(188, 188, 255)',
          padding: '20px',
          color: '#413B90',
          fontFamily: 'Montserrat, sans-serif !important'
        }}
        messages={{
          next: 'Наступний',
          previous: 'Попередній',
          today: 'Сьогодні',
          month: 'Місяць',
          week: 'Тиждень',
          day: 'День',
          agenda: 'Порядок денний',
          date: 'Дата',
          time: 'Час',
          event: 'Подія',
          noEventsInRange: 'Події відсутні',
          allDay: 'Цілий день'
        }}
        culture='uk'
      />

      {selectedSlot && (
        <div className='event-panel'>
          <h3>Створити подію</h3>
          Дата:{' '}
          {format(selectedSlot.start, 'dd MMMM yyyy', {
            locale: uk
          })}
          <form onSubmit={handleAddEvent}>
            <label>
              Назва події:
              <input name='title' required />
            </label>
            <label>
              Початок (час):
              <input
                name='startTime'
                type='time'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </label>
            <label>
              Кінець (час):
              <input
                name='endTime'
                type='time'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </label>
            <label>
              Нотатка:
              <textarea name='note' />
            </label>
            <label>
              Нагадування (хв):
              <input name='reminder' type='number' placeholder='10' />
            </label>
            <label>
              Прикріплення:
              <input name='attachment' type='file' accept='image/*,.pdf' />
            </label>
            <div className='event-actions'>
              <button type='submit'>Додати</button>
              <button type='button' onClick={() => setSelectedSlot(null)}>
                Скасувати
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default StudentCalendar
