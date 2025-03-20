function myFunction(formData) {
    const ss = SpreadsheetApp.openById("1gndjRl9DfANajQUxiF-D1JAtN3lS4gBDC6s-tDUBuIQ");
    const sheet = ss.getSheetByName("Registro_Asistencia");
  
    const data = [
      formData.semestre,
      formData.materia,
      formData.docente,
      formData.grupo,
      formData.fecha,
      formData.horaInicio,
      formData.horaFin,
      formData.observaciones
    ];
  
    sheet.appendRow(data);
  }
  
  function obtenerNombresAlumnos() {
    const ss = SpreadsheetApp.openById("1gndjRl9DfANajQUxiF-D1JAtN3lS4gBDC6s-tDUBuIQ");
    const sheet = ss.getSheetByName("Semestre_1");
    const alumnosRange = sheet.getRange("A2:A");
    const alumnosValues = alumnosRange.getValues();
    const alumnos = alumnosValues.map(row => row[0]).filter(name => name);
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