# Vite React Project Setup

## Prerequisites

Pastikan Anda sudah menginstall Bun di sistem Anda:

```bash
# Install Bun (macOS/Linux)
curl -fsSL https://bun.sh/install | bash

# Install Bun (Windows)
powershell -c "irm bun.sh/install.ps1 | iex"
```

## Project Setup

### 1. Create Vite React Project

```bash
# Buat project baru dengan Vite + React + TypeScript
bun create vite@latest

lalu pilih React + Typescript

# Masuk ke direktori project
cd my-react-app

# Install dependencies
bun install
```

### 2. Install Shadcn/UI

```bash
# Install dependencies yang diperlukan
bun add class-variance-authority clsx tailwind-merge lucide-react

# Install Tailwind CSS
bun add tailwindcss @tailwindcss/vite

# Replace index.css
@import "tailwindcss"
```

### 3. Edit tsconfig.json file


```
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
### 4. Edit tsconfig.app.json file

```
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```
### 5. Update vite.config.ts
bun add -D @types/node

```
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```
### 6. RUN CLI
bunx --bun shadcn@latest init

lalu nanti akan ada pertanyaan
Which color would you like to use as base color? › Neutral -> pilih sesuai selera

### 7. Install components pertama
contoh: bunx --bun shadcn@latest add button

### Untuk instal komponen lain bisa pergi ke halaman
https://ui.shadcn.com/docs/components


