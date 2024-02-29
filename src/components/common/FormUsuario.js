function FormUsuario() {
  return (
    <>
      <form className="form container md:px-20 mt-8 p-8 bg-slate-100 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Agregar Usuario</h1>
        
        <div className="mb-4">
          <label className="label text-lg text-blue-500">id  usuario:</label>
          <input type="text" id="id_usuario" name="id_usuario" className="input input-bordered w-full text-white form-control" required/>
        </div>
        
        <div className="mb-4">
          <label className="label text-lg text-blue-500">nombre completo:</label>
          <input type="text" id="nom_usuario" name="nom_usuario" className="input input-bordered w-full text-white form-control" required/>
        </div>
        
        <div className="mb-4">
          <label className="label text-lg text-blue-500">Contraseña:</label>
          <input type="password" id="clave_usuario" name="clave_usuario" className="input input-bordered w-full text-white form-control" required/>
        </div>
        
        <div className="mb-4">
          <label className="label text-lg text-blue-500">Correo:</label>
          <input type="email" id="correo_usuario" name="correo_usuario" className="input input-bordered w-full text-white form-control" required/>
        </div>
        
        <div className="mb-4">
          <label className="label text-lg text-blue-500">id role:</label>
          <input type="text" id="id_role" name="id_role" className="input input-bordered w-full text-white form-control" required/>
        </div>
        
        <div className="flex justify-end">
          <button type="submit" className="btn btn-accent">Create</button>
        </div>
      </form>
    </>
  )
}

export default FormUsuario
