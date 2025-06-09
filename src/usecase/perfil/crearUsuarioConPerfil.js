//Funcion para traer todas las personas

export const crearUsuarioConPerfil = async ({ usuarioRepo, perfilRepo, usuarioData, perfilData, transaction }) => {

  const usuario = await usuarioRepo.create({
    username: usuarioData.mail,
    contraseña_hash: usuarioData.contraseña,
    rol: 'usuario'
  }, transaction);
/*
  console.log('Usuario creado:', usuario);
  console.log('id_usuario:', usuario.id_usuario);*/

  await perfilRepo.create({
      ...perfilData, 
      id_usuario: usuario.id_usuario 
    }, transaction);

  return usuario;
};
