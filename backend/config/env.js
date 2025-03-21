function obtenerReportes() {
  const ss = SpreadsheetApp.openById("1gndjRl9DfANajQUxiF-D1JAtN3lS4gBDC6s-tDUBuIQ");
  const sheetAsistencia = ss.getSheetByName("Registro_Asistencia");

  // Verificar si la hoja existe
  if (!sheetAsistencia) {
    console.error("No se encontró la hoja 'Registro_Asistencia'");
    return JSON.stringify([]); // Devuelve un arreglo vacío si la hoja no existe
  }

  // Obtener datos de la hoja Registro_Asistencia
  const dataAsistencia = sheetAsistencia.getDataRange().getValues();
  if (dataAsistencia.length <= 1) {
    return JSON.stringify([]); // Si no hay datos, devuelve un arreglo vacío
  }

  // Crear un arreglo de objetos con los datos de Registro_Asistencia
  const reportes = dataAsistencia.slice(1).map((row) => {
    // Formatear la fecha
    const fecha = new Date(row[4]); // Convertir a objeto Date
    const fechaFormateada = fecha.toISOString().split("T")[0]; // Formato YYYY-MM-DD

    // Formatear la hora de inicio
    const horaInicio = new Date(row[5]);
    const horaInicioFormateada = horaInicio.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    // Formatear la hora de finalización
    const horaFin = new Date(row[6]);
    const horaFinFormateada = horaFin.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return {
      Semestre: row[0], // Columna A
      Materia: row[1], // Columna B
      Docente: row[2], // Columna C
      Grupo: row[3], // Columna D
      Fecha: fechaFormateada, // Columna E
      "Hora de inicio": horaInicioFormateada, // Columna F
      "Hora de finalización": horaFinFormateada, // Columna G
      Alumnos: row[7], // Columna H (Alumnos - Falta/Retardo en un solo campo)
      Observaciones: row[8], // Columna I (Observaciones)
    };
  });

  return JSON.stringify(reportes); // Convertir a JSON antes de devolver
}

function myFunction(formData) {
  const ss = SpreadsheetApp.openById("1gndjRl9DfANajQUxiF-D1JAtN3lS4gBDC6s-tDUBuIQ");
  const sheet = ss.getSheetByName("Registro_Asistencia");

  // Crear un string con los nombres y su selección (Falta/Retardo)
  const asistenciasString = formData.asistencias
    .map((asistencia) => `${asistencia.alumno} - ${asistencia.seleccion}`)
    .join(", "); // Unirlos con una coma y espacio

  // Preparar los datos principales en una sola fila
  const dataCompleta = [
    formData.semestre,         // Semestre
    formData.materia,          // Materia
    formData.docente,          // Docente
    formData.grupo,            // Grupo
    formData.fecha,            // Fecha
    formData.horaInicio,       // Hora de inicio
    formData.horaFin,          // Hora de finalización
    asistenciasString,         // Lista de asistencias en una celda
    formData.observaciones,    // Observaciones
  ];

  // Guardar los datos en la hoja Registro_Asistencia
  sheet.appendRow(dataCompleta);
}

  function obtenerNombresAlumnos(semestre, grupo) {
    const ss = SpreadsheetApp.openById("1gndjRl9DfANajQUxiF-D1JAtN3lS4gBDC6s-tDUBuIQ");
  
    // Determinar la hoja según el semestre
    const nombreHoja = `Semestre_${semestre}`; // Ejemplo: "Semestre_1", "Semestre_2", etc.
    const sheet = ss.getSheetByName(nombreHoja);
  
    // Verificar si la hoja existe
    if (!sheet) {
      console.error(`No se encontró la hoja: ${nombreHoja}`);
      return [];
    }
  
    // Obtener los nombres de los alumnos y sus grupos
    const alumnosRange = sheet.getRange("A2:B"); // A2:A para nombres, B2:B para grupos
    const alumnosValues = alumnosRange.getValues();
  
    // Filtrar los nombres según el grupo seleccionado
    const alumnos = alumnosValues
      .filter((row) => row[1] === grupo) // Filtra por grupo
      .map((row) => row[0]); // Obtiene solo los nombres
  
    return alumnos;
  }

  function obtenerDocentePorMateria(materia) {
    const ss = SpreadsheetApp.openById("1gndjRl9DfANajQUxiF-D1JAtN3lS4gBDC6s-tDUBuIQ");
    const sheet = ss.getSheetByName("Docentes");
  
    // Obtener todas las materias y docentes
    const materias = sheet.getRange("A2:A").getValues().flat();
    const docentes = sheet.getRange("B2:B").getValues().flat();
  
    // Buscar el docente correspondiente a la materia
    const index = materias.indexOf(materia);
    if (index !== -1) {
      return docentes[index]; // Devuelve el nombre del docente
    } else {
      return ""; // Devuelve una cadena vacía si no se encuentra la materia
    }
  }

