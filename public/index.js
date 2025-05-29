async function getPersonaById(id) {
  try {
    const res = await fetch(`/perfil/${id}`);
    if (!res.ok) throw new Error('No se pudo obtener la persona');
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
    getPersonaById(1).then(persona => {
        actualizarPersonaHtml(persona);
    });
});
