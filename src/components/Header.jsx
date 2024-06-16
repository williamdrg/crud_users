const Header = ({ setIsShow, setTitleForm }) => {

  const handlerOpen = () => {
    setTitleForm('Crear Usuario')
    setIsShow(true);
  }

  return (
    <header className="bg-white shadow px-6 fixed top-0 w-full z-20">
      <div className="flex justify-between max-w-7xl mx-auto h-16 items-center">
      <h1 className="text-xl font-bold text-gray-800">CRUD de Usuarios</h1>
      <button onClick={handlerOpen} className="bg-blue-500 px-3 py-2 rounded-md text-white cursor-pointer hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600">
        Crear Usuario
      </button>
      </div>
    </header>
  )
}

export default Header