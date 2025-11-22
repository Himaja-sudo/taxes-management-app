# Taxes Management Application

A modern React application for managing taxes with a beautiful table interface and edit functionality.

## Features

- 📊 Data table built with @tanstack/react-table
- ✏️ Edit modal for updating tax name and country
- 🌍 Country dropdown populated from API
- 💾 PUT API integration for saving changes
- 🎨 Modern, pixel-perfect UI with Tailwind CSS
- ⚡ Fast and responsive user experience

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- **Taxes API**: `https://685013d7e7c42cfd17974a33.mockapi.io/taxes`
- **Countries API**: `https://685013d7e7c42cfd17974a33.mockapi.io/countries`

## Tech Stack

- React 18
- TypeScript
- Vite
- @tanstack/react-table
- Tailwind CSS

## Project Structure

```
src/
  ├── api/
  │   └── api.ts          # API service functions
  ├── components/
  │   ├── Table.tsx       # Table component
  │   └── EditModal.tsx   # Edit modal component
  ├── types/
  │   └── index.ts        # TypeScript type definitions
  ├── App.tsx             # Main application component
  ├── main.tsx            # Application entry point
  └── index.css           # Global styles
```

## Usage

1. The table displays all taxes with name and country columns
2. Click the edit icon in the Actions column to open the edit modal
3. Update the name and/or country in the modal
4. Click "Save" to persist changes via PUT API
5. The table automatically updates with the new data

