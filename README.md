# GymSwipe Web Frontend

Este proyecto es una versión web del frontend para GymSwipe, desarrollado con React y Vite.

## Requisitos previos

- Node.js (versión 16 o superior)
- npm (incluido con Node.js)
- Docker y Docker Compose (para despliegue containerizado)

## Estructura del proyecto

```
Frontend/
├── public/             # Archivos estáticos
├── src/                # Código fuente
│   ├── assets/         # Imágenes, fuentes, etc.
│   ├── components/     # Componentes reutilizables
│   ├── pages/          # Páginas principales
│   ├── styles/         # Estilos CSS
│   ├── App.jsx         # Componente principal
│   ├── App.css         # Estilos del componente principal
│   ├── main.jsx        # Punto de entrada
│   └── index.css       # Estilos globales
├── Dockerfile          # Configuración de Docker
├── docker-compose.yml  # Configuración de Docker Compose
├── nginx.conf          # Configuración de Nginx
├── vite.config.js      # Configuración de Vite
└── package.json        # Dependencias y scripts
```

## Desarrollo local

Para iniciar el servidor de desarrollo:

```bash
npm install
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Construcción para producción

Para construir la aplicación para producción:

```bash
npm run build
```

Los archivos compilados se encontrarán en el directorio `dist/`.

## Despliegue con Docker

Para construir y ejecutar la aplicación con Docker:

```bash
docker-compose up -d
```

La aplicación estará disponible en [http://localhost](http://localhost)

## Notas adicionales

- El frontend está diseñado para comunicarse con la API backend ubicada en el directorio `Gymder-api`.
- La configuración de Nginx en el contenedor Docker está configurada para manejar correctamente las rutas de SPA (Single Page Application).
