import axios from "axios";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"


const UsersForm = ({ createUser, dataUser, setDataUser, updateUser, isShow, setIsShow, titleForm }) => {
  const { register, handleSubmit, reset } = useForm()
  const [ fileName, setFileName ] = useState('');
  const [ fileUrl, setFileUrl ] = useState('');
  const [ fileSelected, setFileSelected ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ uploading, setUploading ] = useState(false);

  useEffect(() => {
    reset(dataUser)
  }, [dataUser])


  const onSubmit = async ( data ) => {
    if (fileSelected && !fileUrl) {
      setErrorMessage('Por favor, espera a que la imagen se cargue.');
      return;
    }

    if (fileUrl) {
      data.image_url = fileUrl;
    }

    if (dataUser) {
      updateUser('/users', data, dataUser.id)
      setDataUser()
      setErrorMessage('')
    } else {
      createUser('/users', data)
      setErrorMessage('')
    }
    
    reset(emptyFields)

  }

  const emptyFields = {
    first_name: '',
    last_name: '',
    email: '',
    birthday: '',
    password: '',
    image_url: ''
  }

  const handleClose = () => { 
    reset(emptyFields)
    setIsShow(false)
  }
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType.startsWith('image/')) {
        setFileSelected(true);
        setFileName(file.name);
        setErrorMessage('');
        uploadImageToImgBB(file);
      } else {
        setFileSelected(false);
        setFileName('');
        setFileUrl('');
        setErrorMessage('Por favor, selecciona un archivo de imagen (ej. .jpg, .png).');
      }
    } else {
      setFileSelected(false);
      setFileName('');
      setFileUrl('');
      setErrorMessage('');
    }
  };

  const uploadImageToImgBB = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY}&expiration=3600`, formData);
      setFileUrl(response.data.data.url);
      setUploading(false);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error al subir la imagen: ' + error.message);
      setUploading(false);
    }
  };

  return (
    <div className={`flex fixed inset-0 z-30 items-center justify-center transition-all duration-400 bg-blue-950 bg-opacity-20 ${isShow ? 'scale-100' : 'scale-0'}`}>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-white w-80 mx-auto mt-8 rounded-lg p-6 shadow-lg relative'>

      <button onClick={handleClose}
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
      </button>
      <h2 className="text-center text-2xl font-bold text-gray-700">{titleForm}</h2>
      <div className="mb-4 mt-4">
        <label htmlFor="first_name" className="block text-gray-700 font-semibold mb-1">Nombre</label>
        <input
          type="text"
          id="first_name"
          {...register('first_name', { required: true })}
          className="border border-gray-300 w-full px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="last_name" className="block text-gray-700 font-semibold mb-1">Apellido</label>
        <input
          type="text"
          id="last_name"
          {...register('last_name', { required: true })}
          className="border border-gray-300 w-full px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Correo</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: true })}
          className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 invalid:focus:ring-red-400 peer"
        />
        <p className="text-red-400 hidden peer-invalid:block">El correo es incorrecto</p>
      </div>

      <div className="mb-4">
        <label htmlFor="birthday" className="block text-gray-700 font-semibold mb-1">Fecha de cumpleaños</label>
        <input
          type="date"
          id="birthday"
          {...register('birthday')}
          className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Contraseña</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: true })}
          className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

     <div className="mb-4">
        <label htmlFor="" className="block text-gray-700 font-semibold mb-2">Imagen</label>
        <label htmlFor="image_url" className="bg-violet-100 border-0 rounded-lg text-violet-700 font-semibold px-3 hover:bg-violet-300 cursor-pointer py-2 file:mr-4">
            {fileSelected ? "Archivo seleccionado" : "Seleccionar Archivo"}
          </label>
        <input
          type="file"
          id="image_url"
          accept="image/*"
          {...register('image_url')}
          onChange={handleFileChange}
          className="hidden"
        />
        {fileName && <p className="text-gray-500 mt-1" id="file-selected">{fileName}</p>}
        {errorMessage && <p className="text-red-500 mt-1">{errorMessage}</p>}
      </div>

      <button className="bg-blue-500 w-full px-3 py-2 rounded-md text-white cursor-pointer hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600" disabled={uploading}>
        {uploading ? 'Subiendo...' : 'Enviar'}
      </button>
    </form>
  </div>
  )
}

export default UsersForm