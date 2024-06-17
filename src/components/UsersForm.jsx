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
  const [ modalMessage, setModalMessage ] = useState('');
  const [ isModalVisible, setIsModalVisible ] = useState(false);

  useEffect(() => {
    reset(dataUser)
    resetImageState();
  }, [dataUser, isShow])


  const resetImageState = () => {
    setFileName('');
    setFileUrl('');
    setFileSelected(false);
    setErrorMessage('');
  };

  const resetForm = () => {
    reset(emptyFields);
    resetImageState();
  };

  const onSubmit = async ( data ) => {
    if (fileSelected && !fileUrl) {
      setErrorMessage('Por favor, espera a que la imagen se cargue.');
      return;
    }

    if (fileUrl) {
      data.image_url = fileUrl;
    } else {
      delete data.image_url;
    }

    try {
      if (dataUser) {
        await updateUser('/users', data, dataUser.id)
        setDataUser()
        setErrorMessage('')
        setFileSelected(false)
        setFileName('')
        resetForm();
        setModalMessage('Usuario actualizado satisfactoriamente');
        setIsShow(false)
      } else {
        console.log('valores del data', data)
        await createUser('/users', data)
        setErrorMessage('')
        setFileSelected(false)
        setFileName('')
        resetForm();
        setModalMessage('Usuario creado satisfactoriamente');
      }
      reset(emptyFields)
      setIsModalVisible(true);
    } catch (error) {
      setModalMessage('Error al crear o actualizar el usuario');
      console.log('error', error)
      setIsModalVisible(true);
    }
  }

  const handleClose = () => { 
    resetForm();
    setIsShow(false)
    setDataUser();
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
        resetImageState();
        setErrorMessage('Por favor, selecciona un archivo de imagen (ej. .jpg, .png).');
      }
    } else {
      resetImageState();
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

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const emptyFields = {
    first_name: '',
    last_name: '',
    email: '',
    birthday: '',
    password: '',
    image_url: ''
  }

  return (
    <>
    <div className={`flex fixed inset-0 z-30 items-center justify-center transition-all duration-400 bg-blue-950 bg-opacity-20 ${isShow ? 'scale-100' : 'scale-0'}`}>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-white w-80 mx-auto mt-8 rounded-lg p-6 shadow-lg relative'>

      <button type="button" onClick={handleClose}
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
          autoComplete="given-name"
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
          autoComplete="email"
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
        <label htmlFor="image_url" className="block text-gray-700 font-semibold mb-2">Imagen</label>
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
  {
    isModalVisible && (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg text-center">
          <p>{modalMessage}</p>
          <button onClick={handleModalClose} className="mt-4 bg-blue-500 px-4 py-2 text-white rounded">Cerrar</button>
        </div>
      </div>
  )}
  </>
  )
}

export default UsersForm