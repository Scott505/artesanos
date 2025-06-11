export const ingresar = async ({
    mail,
    contraseña,
    usuarioRepo,
    hashService }) => {
    const usuario = await usuarioRepo.findByUsername(mail);
    if (!usuario) throw new Error("Datos incorrectos");

    const passwordValida = await hashService.compare(contraseña, usuario.contraseña_hash);
    if (!passwordValida) throw new Error("Datos incorrectos");

    console.log("Usuario ingresado:", usuario);
    
    return {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        mail: usuario.mail
    };
};
