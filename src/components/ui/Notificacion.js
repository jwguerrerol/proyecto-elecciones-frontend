function Notificacion({ alertType, message = 'advertencia', notificationColor, fontColor, width = 'md:96' }) {

  alertType = alertType !== '' ? alertType : ''
  notificationColor = notificationColor !== '' ? notificationColor : ''

  const classes = `alert ${alertType} ${notificationColor} ${fontColor} flex flex-row justify-center items-center my-2 transition-all mx-auto ${width}`
  return (
    <div className={ classes }>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6 hidden"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span className="text-md text-center">{ message }</span>
    </div>
  )
}

export default Notificacion