
const doGet = () =>
    HtmlService.createTemplateFromFile("frontend/index")
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag(
        "viewport",
        'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1"'
      )
      .setTitle("Proyecto apps script dev")
      .setFaviconUrl(<a href="https://www.flaticon.es/iconos-gratis/mapa-del-sitio" title="mapa del sitio iconos">Mapa del sitio iconos creados por adrianadam - Flaticon</a>);
  
  const include = (ruta) =>
    HtmlService.createHtmlOutputFromFile(ruta).getContent();