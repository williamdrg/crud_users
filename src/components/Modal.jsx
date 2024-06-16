import { useState } from "react"


const Modal = ({ setModal, selectedUserId, deleteUser }) => {

  const closeModal =() => {
    setModal(false)
  }

  const confirmDelete = () => {
    deleteUser('/users', selectedUserId)
    setModal(false)
  }

  return ( 
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 shadow-lg w-80">
      <h2 className="text-xl font-semibold mb-4 text-center">¿Está seguro de que desea eliminar este usuario?</h2>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={confirmDelete}
        >
          Confirmar
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          onClick={closeModal}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
  )
}

export default Modal