export const toLocaleFormat = date =>
  new Intl.DateTimeFormat('id', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  })
    .format(date)
    .split('/')
    .reverse()
    .join('-')
