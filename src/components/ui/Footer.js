const Footer = () => {
  return (
    <footer className=" bg-grayLigthBase mt-10">
      <div className="container flex flex-col items-center px-5 py-2" style={ { display: 'flex', justifyContent: 'space-between'} }>
        <small className=" text-sm text-blueBase">Desarrollado por John Guerrero - { new Date().getFullYear() } </small>
        {/* <p className=" text-lg text-white">Copyright &copy; 2023</p> */}
      </div>
    </footer>
  )
}

export default Footer