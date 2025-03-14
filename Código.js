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

function obtenerNombresAlumnos() {
    const ss = SpreadsheetApp.openById("1LGLnkGdnI7QrvdM7XOVKewebBeyjb9W4XFUyqj-voD8");
    const sheet = ss.getSheetByName("Semestre_1");

    // Leer los nombres de los alumnos desde la hoja de cálculo
    const alumnosRange = sheet.getRange("A2:A"); // Ajusta el rango según donde estén los nombres
    const alumnosValues = alumnosRange.getValues();
    const alumnos = alumnosValues.map(row => row[0]).filter(name => name); // Filtra nombres vacíos

    return alumnos;
}