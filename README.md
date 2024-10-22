# Front-end Pagina Relojeria y Joyeria "OMEGA"

Este es un proyecto de una aplicación web para la **Relojería y Joyería OMEGA**, desarrollada utilizando **React**, **Tailwind CSS**, **Vite** y **React Router DOM**. La aplicación incluye funcionalidades como registro de usuarios, inicio de sesión y gestión de perfil de momento.

## Características

- **Registro e inicio de sesión** con manejo de autenticación vía **JWT**.
- **Gestión de perfiles**: Los usuarios pueden actualizar su información personal y subir fotos de perfil, que pueden recortar utilizando una herramienta interactiva.
- **Protección de rutas**: Algunas rutas están protegidas y solo accesibles para usuarios autenticados.
- **Interfaz de usuario** desarrollada con **Tailwind CSS** para lograr un diseño responsivo y moderno.
- **Manejo de imágenes** con capacidad de recortar las fotos de perfil antes de guardarlas.
- **Estado global** utilizando **Context API** para manejo de autenticación y sesión de usuario.
- **Conexion a Backend** con Node.js y Express, con base de datos para manejar usuarios y perfiles.

## Características por añadir
- **Apartado de Citas(CRUD user-admin)
- **Apartado Blog(CRUD user-admin)
- **Seccion FAQ
- **Testimonios
- **Apartado Servicios

## Tecnologías Utilizadas

- **Frontend**: React, Tailwind CSS, Vite, React Router DOM, react-icons
- **Manejo de autenticación**: JWT (JSON Web Token)
- **Subida de imágenes**: Multer
- **Recorte de imágenes**: react-easy-crop

#Uso
## Características del Frontend
- **Página principal: Muestra información básica de la relojería y joyería.
- **Registro: Los usuarios pueden crear una cuenta ingresando sus datos personales.
- **Inicio de sesión: Los usuarios pueden iniciar sesión con su correo y contraseña.
- **Gestión de perfil: Los usuarios pueden actualizar su información personal y cambiar su foto de perfil utilizando un recortador de imágenes.

## Estado Global y Autenticación
El estado de autenticación se maneja utilizando Context API. Cuando un usuario inicia sesión, se almacena su sesión (incluyendo el token JWT y los datos de perfil) en el sessionStorage. El token tiene una duración de 1 hora antes de que expire.

## Seguridad
- **JSON Web Tokens (JWT): Para manejar la autenticación y proteger las rutas.
- **Validación de Formularios: Se realiza validación tanto en el frontend como en el backend para asegurar la integridad de los datos.
