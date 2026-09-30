# MAE Ecommerce

Single Page Application de e-commerce desarrollada con React como proyecto final del curso de React de Coderhouse. Mae es una tienda online de decoración textil para el hogar, especializada en almohadones y packs de cama.

## Funcionalidades

- Catálogo de productos y vista de detalle, con datos desde Firestore
- Navegación por categorías sin recargar la página (React Router)
- Contador de cantidad con validación de mínimo y de stock
- Carrito global con React Context: cantidades, subtotales, total, quitar productos y vaciar
- Checkout con formulario de comprador y generación de la orden en Firestore
- Descuento de stock al confirmar la compra y aviso de productos sin stock
- Loaders, mensajes de carrito vacío, producto no encontrado y errores

## Tecnologías

React, Vite, React Router, Material UI, Firebase (Firestore)

## Instalación

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Crear un archivo `.env` en la raíz a partir de `.env.example` y completar las credenciales de Firebase
4. Iniciar el proyecto: `npm run dev`

## Variables de entorno

Ver `.env.example`. Todas llevan el prefijo `VITE_FIREBASE_`.

## Estructura

```
src/
├── components/   NavBar, CartWidget, ItemListContainer, ItemList, Item,
│                 ItemDetailContainer, ItemDetail, ItemCount, CartItem, CheckoutForm
├── context/      CartContext, CartProvider
├── firebase/     config.js
└── pages/        Home, Cart, Checkout, NotFound
```

## Scripts

- `npm run dev`: servidor de desarrollo
- `npm run build`: build de producción
- `npm run lint`: revisión con ESLint

## Autora

Melanie Trachsler
