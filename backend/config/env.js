// function myFunction(formData) {
//     const ss = SpreadsheetApp.openById("1gndjRl9DfANajQUxiF-D1JAtN3lS4gBDC6s-tDUBuIQ");
//     const sheet = ss.getSheetByName("Registro_Asistencia");
  
//     const data = [
//       formData.semestre,
//       formData.materia,
//       formData.docente,
//       formData.grupo,
//       formData.fecha,
//       formData.horaInicio,
//       formData.horaFin,
//       formData.observaciones
//     ];
  
//     sheet.appendRow(data);
//   }



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