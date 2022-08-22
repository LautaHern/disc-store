const tabla = document.querySelector('#lista-discos tbody');

function cargarUsuarios() {
    fetch('productos.json')
        .then(respuesta => respuesta.json())
        .then(discos => {
            discos.forEach(disco => {
                const row = document.createElement('tr');
                row.innerHTML += `
                    <td>${disco.id}</td>
                    <td>${disco.nombre}</td>
                    <td>${disco.precio}</td>
                `;
                tabla.appendChild(row);

            });
        }) 
        .catch(error => console.log('Hubo un error : ' + error.message))
}

cargarUsuarios();

