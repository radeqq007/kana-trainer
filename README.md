# Kana Trainer

Kana Trainer is a simple desktop application designed to help you learn Japanese kana (Hiragana and Katakana). Built with Electron, React, and TypeScript, it provides an interactive way to practice and memorize characters.

## Features

- **Interactive Learning**: Practice your Hiragana and Katakana skills with a quiz-based interface.
- **Modern UI**: Clean and responsive minimalist design built with localized styling.
- **Cross-Platform**: Runs smoothly on Windows, macOS, and Linux.
- **Offline Capable**: Fully functional offline desktop application.
- **Persistent Progress**: Saves your configuration and progress locally.

## Tech Stack

- **Core**: [Electron](https://www.electronjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Electron Vite](https://electron-vite.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) (Primitive components)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [pnpm](https://pnpm.io/) (Recommended package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/radeqq007/kana-trainer.git
   cd kana-trainer
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Start the development server implementation nicely hot-reloading for both Main and Renderer processes:

```bash
pnpm dev
```

## Building for Production

To create a distributable application:

```bash
# Build for Windows
pnpm build:win

# Build for macOS
pnpm build:mac

# Build for Linux
pnpm build:linux
```

Output files will be generated in the `dist` folder.


## Screenshots

![Main Menu](.github/assets/menu.png)
![Characters](.github/assets/chars.png)
![Game](.github/assets/game.png)