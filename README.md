# Ren Ath Design Tool

## Description

Ren Ath Design Tool is a modern web application designed as a 3D shirt configurator. It enables users to customize and visualize shirts in a three-dimensional environment, providing a seamless and interactive experience for designing and previewing personalized shirts.

## Installation

To get started with Ren Ath Design Tool, ensure you have Node.js and npm installed on your machine. Then follow these steps:

1. Clone the repository:

https://github.com/Soft-Radix/ren-ath-design-tool.git

2. Navigate to the project directory:

cd ren-ath-design-tool

3. Install dependencies:

npm install

## Usage

After installation, you can use the following npm scripts:

- **Development server**:

npm run dev

This command launches the development server using Vite.

- **Build**:

npm run build

This command previews the built application locally.

## Assets

All fonts, GIFs, images, and SVG files are saved in the `src/assets` folder.

## Styles

The CSS part is handled using module SCSS. Stylesheets can be found in the `src/scss` folder.

## Pages

The application is structured into pages:

- **Home**:
- The landing page is handled in the `pages/home` folder.

- **Product View**:
- The 3D design view is handled in the `pages/productview` folder.

## State Management

Data management is handled using Zustand. The application state is managed in the `store.jsx` file.

## Models

All GLB models should be placed in the `public/models` folder. For example, if the GLB file is for a women's model, create a folder name by `W1` and place it inside the `public/models` folder.

## Technologies Used

Ren Ath Design Tool is built using the following technologies:

- React
- Three.js
- Emotion
- Material-UI
- Framer Motion
- React Router
- Zustand
- Universal Cookie
- Vite
