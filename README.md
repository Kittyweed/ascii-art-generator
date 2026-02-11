# ASCII Art Generator

Turn images into ASCII art with this sleek desktop application.

## Features

- 🖼️ **Image to ASCII Conversion** – Convert any image to stunning ASCII art
- ⚙️ **Customizable Width** – Adjust output width from 20 to 500 characters
- 🔄 **Invert Brightness** – Toggle brightness inversion for different styles
- 💾 **Export to Text** – Save generated ASCII art as text files
- 🎨 **Modern UI** – Glass-morphism design with gradient effects

## Tech Stack

- **Backend:** Rust with image processing
- **Frontend:** TypeScript, React 18, Electron 27
- **Build:** Cargo, npm, TypeScript compiler
- **Styling:** Modern CSS with gradients and glassmorphism

## Installation

### Prerequisites
- Node.js 16+
- Rust 1.70+
- npm/yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Kittyweed/ascii-art-generator.git
cd ascii-art-generator
```

2. Build the Rust backend:
```bash
cargo build --release
```

3. Install Node dependencies:
```bash
npm install
```

4. Compile TypeScript:
```bash
npm run build
```

## Usage

Run the application:
```bash
npm start
```

Or use development mode with hot reload:
```bash
npm run dev
```

### CLI (Rust Backend Only)

```bash
./target/release/corvin_ascii_gen <image_path> [--width 100] [--invert]
```

## Development

- `npm run build` – Compile TypeScript
- `npm run build:watch` – Watch and rebuild TypeScript
- `npm run dev` – Start in development mode
- `cargo build --release` – Build Rust binary

## License

MIT License - see LICENSE file for details
