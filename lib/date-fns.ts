import { fr } from 'date-fns/locale'
import { format, setDefaultOptions } from 'date-fns'
import { capitalize } from 'lodash-es'

const initDefaultLocale = () => setDefaultOptions({ locale: fr })

const getCurrentDay = () => ({
  weekDay: capitalize(format(new Date(), 'eeee')),
  date: format(new Date(), 'dd MMMM yyyy'),
})

export { initDefaultLocale, getCurrentDay }
