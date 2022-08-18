export const toYupFormat = (date) =>
  new Intl.DateTimeFormat('id', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  })
    .format(new Date(date))
    .split('/')
    .reverse()
    .join('-')

export const toLocaleFormat = (date) =>
  new Intl.DateTimeFormat('id', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
