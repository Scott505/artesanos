async function getPersonaById(id) {
  try {
    const res = await fetch(`/perfil/${id}`);
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

function actualizarPersonaHtml(persona) {
  const contenedorPersona = document.getElementById('perfil-container');
  if (!contenedorPersona) return;
  contenedorPersona.innerHTML = `
        <h1>Perfil de Persona</h1>
        <h2>${persona.nombre}</h2>
        <p>Teléfono: ${persona.telefono}</p>
        <p>Email: ${persona.mail}</p>
        <p>Intereses: ${persona.interess}</p>
        <p>Info: ${persona.info}</p>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
 /* getPersonaById(1).then(persona => {
    if (!persona) {
      console.error('No se encontró la persona con ID 1');
      const contenedorPersona = document.getElementById('perfil-container');
      if (contenedorPersona) {
        contenedorPersona.innerHTML = '<h2>Error: Persona no encontrada</h2>';
      }
      return;
    }
    actualizarPersonaHtml(persona);
  });*/
  getAllPersonas().then(personas => {
    if (!personas || personas.length === 0) {
      console.error('No se encontraron personas');
      const contenedorPersona = document.getElementById('perfil-container');
      if (contenedorPersona) {
        contenedorPersona.innerHTML = '<h2>Error: No se encontraron personas</h2>';
      }
      return;
    }
    // Asumiendo que quieres mostrar la primera persona
    actualizarPersonaHtml(personas[0]);
  });

});
