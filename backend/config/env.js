
function obtenerReportes() {
  const ss = SpreadsheetApp.openById("1gndjRl9DfANajQUxiF-D1JAtN3lS4gBDC6s-tDUBuIQ");
  const sheetAsistencia = ss.getSheetByName("Registro_Asistencia");
  const sheetFaltaRetardo = ss.getSheetByName("Falta/Retardo");

  // Verificar si las hojas existen
  if (!sheetAsistencia || !sheetFaltaRetardo) {
    console.error("No se encontró una de las hojas: 'Registro_Asistencia' o 'Falta/Retardo'");
    return JSON.stringify([]); // Devuelve un arreglo vacío si alguna hoja no existe
  }

  // Obtener datos de la hoja Registro_Asistencia
  const dataAsistencia = sheetAsistencia.getDataRange().getValues();
  if (dataAsistencia.length <= 1) {
    return JSON.stringify([]); // Si no hay datos, devuelve un arreglo vacío
  }

  // Obtener datos de la hoja Falta/Retardo
  const dataFaltaRetardo = sheetFaltaRetardo.getDataRange().getValues();
  if (dataFaltaRetardo.length <= 1) {
    return JSON.stringify([]); // Si no hay datos, devuelve un arreglo vacío
  }

  // Obtener solo los nombres de los alumnos (columna 3 de Falta/Retardo)
  const nombresAlumnos = dataFaltaRetardo
    .slice(1) // Omitir la primera fila (encabezados)
    .map((fila) => fila[3]); // Extraer solo la columna de nombres (índice 3)

  // Crear un arreglo de objetos con los datos de Registro_Asistencia
  const reportes = dataAsistencia.slice(1).map((row) => {
    // Formatear la fecha
    const fecha = new Date(row[4]); // Convertir a objeto Date
    const fechaFormateada = fecha.toISOString().split("T")[0]; // Formato YYYY-MM-DD

    // Formatear la hora de inicio
    const horaInicio = new Date(row[5]); // Convertir a objeto Date
    const horaInicioFormateada = horaInicio.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Formato de 24 horas
    });

    // Formatear la hora de finalización
    const horaFin = new Date(row[6]); // Convertir a objeto Date
    const horaFinFormateada = horaFin.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Formato de 24 horas
    });

    return {
      Semestre: row[0], // Columna A
      Materia: row[1], // Columna B
      Docente: row[2], // Columna C
      Grupo: row[3], // Columna D
      Fecha: fechaFormateada, // Columna E (formateada)
      "Hora de inicio": horaInicioFormateada, // Columna F (formateada)
      "Hora de finalización": horaFinFormateada, // Columna G (formateada)
      Observaciones: row[7], // Columna H
      Alumnos: nombresAlumnos.join(", "), // Lista de todos los alumnos separados por coma
    };
  });

  return JSON.stringify(reportes); // Convertir a JSON antes de devolver
}

function myFunction(formData) {
  const ss = SpreadsheetApp.openById("1gndjRl9DfANajQUxiF-D1JAtN3lS4gBDC6s-tDUBuIQ");
  const sheet = ss.getSheetByName("Registro_Asistencia");

  // Preparar los datos principales
  const dataPrincipal = [
    formData.semestre,
    formData.materia,
    formData.docente,
    formData.grupo,
    formData.fecha,
    formData.horaInicio,
    formData.horaFin,
    formData.observaciones,
  ];

  // Guardar los datos principales
  sheet.appendRow(dataPrincipal);

  // Guardar las asistencias (faltas y retardos)
  const sheetAsistencias = ss.getSheetByName("Falta/Retardo");
  if (sheetAsistencias) {
    formData.asistencias.forEach((asistencia) => {
      const dataAsistencia = [
        formData.fecha,
        formData.materia,
        formData.grupo,
        asistencia.alumno,
        asistencia.seleccion,
      ];
      sheetAsistencias.appendRow(dataAsistencia);
    });
  } else {
    console.error("No se encontró la hoja 'Falta/Retardo'");
  }
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

