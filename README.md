# 🎵 Power Cloud — Music Artist Dashboard

**Power Cloud** es un dashboard analítico diseñado para artistas musicales, sellos discográficos y equipos de management. Proporciona visualización en tiempo real de ingresos, métricas de streaming (Spotify, YouTube, Apple Music), catálogo activo vs. histórico, y herramientas de exploración profunda para artistas y lanzamientos.

---

## 📋 Tabla de Contenidos

1. [Nombre y Descripción General](#1-nombre-y-descripción-general)
2. [Cómo Ejecutar el Proyecto Localmente](#2-cómo-ejecutar-el-proyecto-localmente)
3. [Elección de Tecnologías y Justificación](#3-elección-de-tecnologías-y-justificación)
4. [Supuestos / Asunciones Realizadas](#4-supuestos--asunciones-realizadas)
5. [Funcionalidades Implementadas](#5-funcionalidades-implementadas)
6. [Mejoras Futuras](#6-mejoras-futuras)

---

## 1. Nombre y Descripción General

* **Nombre de la aplicación:** `Power Cloud`
* **Descripción:** Dashboard de analítica musical para artistas e industria discográfica. La plataforma permite monitorear el desempeño global e individual de artistas, analizar el desglose de ingresos por formato (Streaming vs. Físico) y catálogo (Frontline vs. Deep Catalog), explorar discografías completas con métricas detalladas por canción y gestionar artistas favoritos de forma personalizada.

---

## 2. Cómo Ejecutar el Proyecto Localmente

### Requisitos Previos

* **Node.js**: `v18.0.0` o superior (se recomienda `v20+`)
* **Gestor de paquetes**: `npm` (v9+), `pnpm` o `yarn`

### Pasos de Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/power-cloud.git
   cd power-cloud
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Variables de entorno:**
   Copie el archivo de ejemplo para configurar sus variables locales (si aplica):
   ```bash
   cp .env.example .env
   ```
   *Nota: Por defecto para desarrollo local, las claves requeridas se configuran dinámicamente o utilizan valores de fallback seguros.*

4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible de forma predeterminada en [http://localhost:3000](http://localhost:3000).

5. **Construir para producción:**
   ```bash
   npm run build
   ```
   Para previsualizar el build compilado:
   ```bash
   npm run preview
   ```

---

## 3. Elección de Tecnologías y Justificación

| Tecnología | Rol | Justificación |
| :--- | :--- | :--- |
| **React 19** | Biblioteca de UI | Brinda un motor de renderizado ultraeficiente, componentes basados en hooks y gestión de estado fluida para interfaces complejas con alta interactividad. |
| **TypeScript** | Lenguaje | Proporciona tipado estático estricto, autocompletado en el editor y prevención de errores en tiempo de compilación al trabajar con modelos de datos complejos (Artistas, Álbumes, Canciones, KPIs). |
| **Vite** | Build Tool & Bundler | Ofrece un servidor de desarrollo extremadamente rápido con Hot Module Replacement (HMR) casi instantáneo y compilación optimizada para producción. |
| **Tailwind CSS v4** | Framework de Estilos | Permite una estilización basada en utilidades de alto rendimiento, soporte nativo de variables CSS, diseño adaptativo responsive (`sm`, `md`, `lg`) y efectos visuales modernos (glassmorphism, neones y degradados). |
| **Motion (`motion/react`)** | Animaciones | Garantiza transiciones de página a 60fps, animaciones de entrada suaves y rotación interactiva de discos de vinilo con respuesta a estados de reproductor. |
| **Recharts** | Visualización de Datos | Biblioteca especializada para renderizar gráficos de área, barras y distribución con Tooltips personalizados y gradientes de color accesibles. |
| **Lucide React** | Iconografía | Proporciona una suite completa de iconos vectoriales consistentes, ligeros y totalmente personalizables mediante CSS. |
| **Express** | Backend / Servidor Node | Permite servir la aplicación y exponer rutas API en un entorno full-stack seguro cuando se requiere proxy de claves de servicio. |

---

## 4. Supuestos / Asunciones Realizadas

* **Entorno de Ejecución:** Se asume que el usuario ejecuta la aplicación en un entorno basado en Node.js `v18+` con soporte para módulos ES (`"type": "module"`).
* **Fuentes de Datos:** Se asume que los datos de streaming y ventas provienen de modelos de datos estructurados tipados en TypeScript (`/src/data/`), simulando las respuestas de APIs como Spotify for Artists, YouTube Analytics y Apple Music API para garantizar tiempos de respuesta inmediatos y estabilidad sin límites de cuota durante la evaluación.
* **Estado Inicial:** Al abrir la aplicación por primera vez, **no hay ningún artista preseleccionado por defecto en la consola**. Esto permite al usuario explorar el panorama global del dashboard antes de profundizar en un perfil individual.
* **Gestión de Favoritos:** Se asume que la marcación de un artista como favorito debe realizarse directamente dentro del perfil detallado del artista (`Añadir a Favoritos` / `Favorito`), manteniendo la consola global enfocado en métricas generales de catálogo.
* **Compatibilidad Responsive:** Se asume que el usuario interactuará desde navegadores modernos tanto en escritorio como en dispositivos móviles, por lo que la maquetación se adapta fluidamente en todos los puntos de interrupción (`breakpoints`).

---

## 5. Funcionalidades Implementadas

* 🎧 **Hero/Banner de Bienvenida "WelcomeScreen":**
  - Tipografía display en Helvetica centrada horizontal y verticalmente (`power cloud`).
  - Trío de discos de vinilo en conic-gradient a gran escala con efecto de recorte inferior (`overflow-hidden`), proporcionando una estética 3D inmersiva.
  - Botón de vista previa de audio para activar/pausar la rotación del vinilo y desplazamiento fluido al dashboard principal.

* 📊 **Dashboard Global & KPIs Clave:**
  - Métricas de rendimiento general: Tasa de conversión, Ingresos por suscripciones y Beneficios netos.
  - Sección "cloud" de Álbumes Destacados combinando tipografía serif con tarjetas circulares interactivas.
  - Carrusel de Top 5 Artistas con posiciones de ranking e indicadores de crecimiento.

* 📈 **Visualización Analítica Avanzada:**
  - **Catálogo Activo vs. Histórico:** Gráficos de área interactivos que comparan lanzamientos recientes (< 18 meses) frente a catálogo de catálogo profundo.
  - **Ingresos Físico vs. Digital:** Comparativa de ganancias por formatos offline (vinilo, CD, merch) frente a reproducciones digitales en streaming por perfil de audiencia.

* 👤 **Perfil Detallado de Artista:**
  - Cabecera personalizada con foto del artista, bio, métricas globales y botón de **Añadir a Favoritos** accesible directamente desde su perfil.
  - Desglose de ingresos de los últimos 3 años categorizados por Merchandising, Shows en Vivo, Álbumes e Ingresos Digitales.

* 🎵 **Vista General de Canciones (`SongsOverview`) & Ficha Detallada de Canción (`SongProfileView`):**
  - **Explorador Global de Canciones:** Lista interactiva con el catálogo completo de pistas, incluyendo buscador, filtros por artista y ordenamiento por popularidad y reproducciones.
  - **Ficha Técnica de Canción:** Vista individualizada para cada pista con reproductor de audio en tiempo real, métricas multicanal desglosadas (Spotify Likes, YouTube Views, Apple Music Streams), desglose de ingresos por pista e indicadores de contenido generado por usuarios (UGC).

* 💿 **Vista de Discografía & Perfil Detallado de Álbum (`AlbumProfileView`):**
  - **Explorador de Álbumes:** Navegación por la discografía completa de los artistas con portadas en alta resolución y detalles de lanzamiento.
  - **Perfil de Álbum:** Ficha completa de cada producción discográfica con lista de canciones navegable, barra lateral interactiva (`AlbumSongsSidebar`), métricas de streams globales, desglose de ventas físicas/digitales y acceso rápido a la reproducción de cada track.

* 🌐 **Mapa de Audiencia Global:**
  - Visualización geográfica de densidad de audiencia y streams por región.

* 🌐 **Soporte Bilingüe (Español / Inglés):**
  - Selector de idioma en tiempo real (`ES` / `EN`) que traduce instantáneamente toda la navegación, etiquetas de gráficos, botones y métricas.

---

## 6. Mejoras Futuras / Qué Haría con Más Tiempo

1. **Integración con APIs Oficiales en Tiempo Real:**
   - Conectar webhooks y flujos OAuth2 para integrar datos en vivo directamente desde las APIs de **Spotify for Artists**, **Apple Music API**, **YouTube Analytics** y **SoundCloud API**.

2. **Suite de Pruebas Automatizadas:**
   - Implementar pruebas unitarias y de componentes con **Vitest** y **React Testing Library**.
   - Agregar pruebas end-to-end (E2E) con **Playwright** o **Cypress** para validar flujos críticos de usuario (navegación entre perfiles, selección de favoritos, reproducción de audio).

3. **Exportación de Reportes Financieros & Analytics:**
   - Añadir la capacidad de generar y descargar reportes consolidados en formato **PDF** y **CSV** con liquidación de regalías y desglose de métricas por territorio.

4. **Reproductor Audio Continuo (Global Persistent Player):**
   - Desarrollar una barra de reproducción persistente en el pie de página que continúe reproduciendo la vista previa sin interrupción al cambiar entre páginas o perfiles.

