async function getPerfilById(id) {
  try {
    const res = await fetch(`/perfil/id/${id}`);
    if (!res.ok) throw new Error('No se pudo obtener la persona');
    return await res.json();
  } catch (error) {
    console.error('Error en fetch:', error);
  }
}

async function getAllPersonas() {
  try {
    const res = await fetch('/perfil/todaslaspersonas');
    if (!res.ok) throw new Error('No se pudo obtener las personas');
    return await res.json();
  } catch (error) {
    console.error('Error en fetch:', error);
  }
}

function actualizarPerfilHtml(perfil) {
  const contenedorPerfil = document.getElementById('perfil-container');
  if (!contenedorPerfil) return;
  console.log('Actualizando perfil:', perfil);
  contenedorPerfil.innerHTML = `
        <h1>Perfil de Persona ${perfil.id_perfil}</h1>
        <h2>${perfil.nombre}</h2>
        <p>Teléfono: ${perfil.telefono}</p>
        <p>Email: ${perfil.mail}</p>
        <p>Experiencia: ${perfil.experiencia}</p>
        <p>Foto: ${perfil.foto}</p>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
  getPerfilById(2).then(perfil => {
    if (!perfil) {
      console.error('No se encontró la perfil con ID 1');
      const contenedorPerfil = document.getElementById('perfil-container');
      if (contenedorPerfil) {
        contenedorPerfil.innerHTML = '<h2>Error: Perfil no encontrada</h2>';
      }
      return;
    }
    actualizarPerfilHtml(perfil);
  });

  /*
  getAllPersonas().then(perfiles => {
    if (!perfiles || perfiles.length === 0) {
      console.error('No se encontraron perfiles');
      const contenedorPerfil = document.getElementById('perfil-container');
      if (contenedorPerfil) {
        contenedorPerfil.innerHTML = '<h2>Error: No se encontraron perfiles</h2>';
      }
      return;
    }
    const contenedorPerfil = document.getElementById('perfil-container');
    if (!contenedorPerfil) return;
    contenedorPerfil.innerHTML = ''; // Limpiar contenido previo
    perfiles.forEach(perfiles => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h1>Perfil de Persona ${perfiles.id_perfil}</h1>
        <h2>${perfiles.nombre}</h2>
        <p>Teléfono: ${perfiles.telefono}</p>
        <p>Email: ${perfiles.mail}</p>
        <p>Experiencia: ${perfiles.experiencia}</p>
        <p>Foto: ${perfiles.foto}</p>
      `;
      contenedorPerfil.appendChild(div);
    });
  });
  */
});


function mostrarFormularioActualizar(perfil) {
  const contenedor = document.getElementById('actualizar-contenido');
  if (!contenedor) return;
  contenedor.innerHTML = `
    <form id="form-actualizar" action="/perfil/actualizar" method="PATCH">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" value="${perfil.nombre || ''}" required><br><br>

      <label for="mail">Correo electrónico:</label>
      <input type="email" id="mail" name="mail" value="${perfil.mail || ''}" required><br><br>

      <label for="telefono">Teléfono:</label>
      <input type="number" id="telefono" name="telefono" value="${perfil.telefono || ''}"><br><br>

      <label for="experiencia">Experiencia:</label>
      <input type="text" id="experiencia" name="experiencia" value="${perfil.experiencia || ''}" required><br><br>

      <label for="foto">Foto:</label><br>
      <textarea id="foto" name="foto" required>${perfil.foto || ''}</textarea><br><br>

      <button type="submit">Actualizar</button>
    </form>
  `;
}