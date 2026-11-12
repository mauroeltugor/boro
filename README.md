# BORÓ — Growth & Governance

Landing page de **Manuela Vargas Granobles**, desarrollada con React y JavaScript, CSS adaptable y esbuild. No necesita backend, cuentas ni una base de datos.

## Ejecutar

Requiere Node.js 20 o superior.

```powershell
cd "C:\Users\ANDRES CELIS\Desktop\BORÓ MANUELA\boro-landing"
npm install
npm run dev
```

Abre **http://127.0.0.1:5173/**. Si las dependencias ya están instaladas, basta con `npm run dev`. Los cambios en JavaScript y CSS recargan la página automáticamente. Reinicia el servidor si cambias archivos de `public/`.

## Versión de producción

```powershell
npm run build
npm run preview
```

La compilación genera `dist/`. La vista previa de producción se sirve en **http://127.0.0.1:4173/**. Para un alojamiento estático se publica el contenido de `dist/` desde la raíz del dominio.

## Desplegar en Vercel

El archivo `vercel.json` configura la instalación, compilación y carpeta de salida. Inclúyelo en el repositorio y crea un nuevo despliegue después de subir el cambio.

En **Settings → Build and Deployment**, verifica:

| Ajuste | Valor |
| --- | --- |
| Framework Preset | Other |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Root Directory | La carpeta que contiene `package.json` y `vercel.json` |

Si subiste el contenido de `boro-landing` como repositorio, Root Directory es `.`. Si tu repositorio contiene toda la carpeta `BORÓ MANUELA`, selecciona `boro-landing`.

Un despliegue con Output Directory en `public` puede mostrar `404 NOT_FOUND`: esa carpeta contiene recursos, mientras que el `index.html` terminado se genera en `dist`. La configuración nueva se aplica al siguiente despliegue; el despliegue anterior conserva su configuración.

Para subir únicamente los archivos ya compilados, publica el contenido de `dist/` como sitio estático, sin ejecutar un comando de compilación.

## Contenido

- Presentación de BORÓ y su filosofía.
- Tres servicios desplegables y metodología en cuatro etapas.
- Fotografías originales del proyecto, preparadas en tamaños adecuados para web.
- Caso académico COTRINO, sus pilares y detalle ampliable.
- Presentación original en PDF, disponible para consultar o descargar.
- Enlaces de WhatsApp, llamada e Instagram.
- Copyright a nombre de **Manuela Vargas Granobles** y diálogo de créditos.

Los resultados del caso se presentan como parte de una propuesta académica, sin atribuirle cifras o logros de ejecución no documentados.

## Editar

| Archivo | Contenido |
| --- | --- |
| `src/App.jsx` | Textos, servicios, proyecto, contacto y componentes |
| `src/styles.css` | Diseño y adaptación a pantallas pequeñas |
| `src/tokens.css` | Colores y tipografías |
| `public/images/` | Copias optimizadas del material visual |
| `public/documents/boro-presentacion.pdf` | Presentación descargable |
| `index.html` | Título, descripción y metadatos |

Los contactos están al inicio de `src/App.jsx`: Instagram **@manuelavargas4**, celular **305 287 6627** y WhatsApp colombiano **+57 305 287 6627**.

El logo conserva la forma original. Su versión blanca se usa sobre fondos oscuros; CSS adapta su color sobre fondos claros. Las fotografías y documentos originales de la carpeta superior no se modifican.

## Accesibilidad

Navegación por teclado, enlace para saltar al contenido, textos alternativos, controles desplegables con estado accesible, menú móvil, cierre del menú con Escape y soporte para movimiento reducido.

## Verificación opcional de navegador

Con el servidor de desarrollo activo y Chrome instalado:

```powershell
npm run build -- --verify
```

El verificador comprueba las interacciones, contactos, imágenes, PDF y desbordamiento horizontal en cinco anchuras entre 320 y 1440 píxeles. Guarda capturas y reporte en `.verification/`, que no se publica. Usa `CHROME_PATH` si Chrome está en otra ubicación.

En el entorno de creación la compilación y el acceso HTTP se comprobaron correctamente. La ejecución automatizada de Chrome quedó bloqueada por los permisos del sistema; no se completó la revisión visual.

## Créditos

Concepto, identidad y contenido: **Manuela Vargas Granobles**. Fotografías de Unsplash proporcionadas con el proyecto: Camila Quintero Franco, Carolina Gomes, Element5 Digital, Janet Restrepo, Jhonny Estrada, Jimmy Hu, Ricardo Arce y Ricky Beron. Las aplicaciones visuales de COTRINO proceden del PDF original; la pieza digital aparece allí identificada como mockup generado con Gemini.

© Manuela Vargas Granobles. Todos los derechos reservados.
