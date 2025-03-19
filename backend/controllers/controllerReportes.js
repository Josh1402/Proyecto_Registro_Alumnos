// Obtener datos de la base de datos
useEffect(() => {
    google.script.run
        .withSuccessHandler((response) => {
            const data = JSON.parse(response); // Convertir la respuesta a JSON
            setDatos(data); // Guardar los datos en el estado
        })
        .withFailureHandler((error) => {
            console.error("Error al obtener los datos:", error);
        })
        .listarfiltros(); // Llamar a la función del backend para listar usuarios
}, []);
