import bgHome from '../images/bg-home.jpg'
import logo from '../images/logo-sisprecas-soft.png'

const Inicio = () => {
  return (
    <div className="container text-white">
      <div className='flex flex-col justify-center items-center'>
        <img src={ logo } alt='logo sisprecas soft' className='mt-10' />
        <h1 className="text-4xl font-bold leading-none tracking-tight text-blueBase text-center dark:text-white mb-10 mt-3">Bienvenidos a Sisprecas Soft</h1>
      </div>
      <div>
        <img src={ bgHome } alt='background home' className=' h-full md:h-full lg:h-48 lg:mx-auto w-full object-cover'></img>
      </div>
    </div>
  )
}

export default Inicio
