function myFunction(formData) {
    const ss = SpreadsheetApp.openById("1LGLnkGdnI7QrvdM7XOVKewebBeyjb9W4XFUyqj-voD8");
    const sheet = ss.getSheetByName("Registro_Asistencia");
  
    const data = [
      formData.semestre,
      formData.materia,
      formData.grupo,
      formData.fecha,
      formData.horaInicio,
      formData.horaFin,
      formData.observaciones
    ];
  
    sheet.appendRow(data);
  }