const Footer = () => {
  return (
    <footer className=" bg-slate-800 mt-10">
      <div className="container flex flex-col items-center px-5 py-10" style={ { display: 'flex', justifyContent: 'space-between'} }>
        <p className=" text-lg text-white">Desarrollado por John Guerrero</p>
        <p className=" text-lg text-white">Copyright &copy; 2023</p>
      </div>
    </footer>
  )
}

export default Footer