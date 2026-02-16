# ASCII Art Generator

Turn images into ASCII art with this sleek desktop application.

## Features

- **Image to ASCII Conversion** – Convert any image to stunning ASCII art
- **Customizable Width** – Adjust output width from 20 to 500 characters
- **Invert Brightness** – Toggle brightness inversion for different styles
- **Export to Text** – Save generated ASCII art as text files
- **Modern UI** – Glass-morphism design with gradient effects

## Tech Stack

- **Backend:** Rust with image processing
- **Frontend:** TypeScript, React 18, Electron 27
- **Build:** Cargo, npm, TypeScript compiler
- **Styling:** Modern CSS with gradients and glassmorphism
- **Distribution:** Electron Builder for cross-platform installers

## Installation

### For End Users

Download the latest release for your platform:
- **Windows:** `.exe` or portable version
- **macOS:** `.dmg` file
- **Linux:** `.AppImage` or `.deb` file

### For Developers

#### Prerequisites
- Node.js 16+
- Rust 1.70+
- npm/yarn

#### Setup

1. Clone the repository:
```bash
git clone https://github.com/Kittyweed/ascii-art-generator.git
cd ascii-art-generator
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### Development Mode

Run with hot reload:
```bash
npm run dev
```

### Production Mode

Start the application:
```bash
npm start
```

### Build Installers

Create platform-specific installers:
```bash
npm run dist
```

Or for quick testing:
```bash
npm run pack
```

### CLI (Rust Backend Only)

```bash
./target/release/ascii-art-generator <image_path> [--width 100] [--invert]
```

## Development

- `npm run build` – Compile TypeScript and Rust
- `npm run build:watch` – Watch and rebuild TypeScript
- `npm run dev` – Start in development mode
- `npm start` – Launch the app
- `npm run dist` – Create distributable installers

## Troubleshooting

**Application won't start:**
- Ensure Rust binary is built: `cargo build --release`
- Check that `target/release/ascii-art-generator` exists

**ASCII generation fails:**
- Verify image file path is correct
- Supported formats: JPG, JPEG, PNG, GIF, BMP
- Check console for error messages

**Windows SmartScreen warning:**
- This is normal for unsigned installers
- Click "More info" then "Run anyway"

## License

MIT License - see LICENSE file for details
