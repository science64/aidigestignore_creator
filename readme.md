# aidigestignore

A CLI tool to generate `.aidigestignore` files for different programming languages. This helps exclude unnecessary files when using aidigest to create `codebase.md` files.

## Installation

### Option 1: Use with npx (Recommended - No Installation Required)

```bash
npx aidigestignore flutter
npx aidigestignore python
npx aidigestignore javascript
```

### Option 2: Install globally

```bash
npm install -g aidigestignore
aidigestignore flutter
```

### Option 3: Install locally for development

```bash
# In the aidigestignore_creater directory
npm install
npm link  # This makes it available globally

# Now you can use it anywhere
aidigestignore flutter
```

## Quick Start

1. Navigate to your project directory:

   ```bash
   cd your-flutter-project
   ```

2. Generate the ignore file:

   ```bash
   npx aidigestignore flutter
   ```

3. The `.aidigestignore` file is created and ready to use with aidigest!

## Usage

### Basic Usage

```bash
# Generate .aidigestignore for Flutter projects
aidigestignore flutter

# Generate .aidigestignore for Python projects
aidigestignore python

# Generate .aidigestignore for JavaScript projects
aidigestignore javascript

# Generate .aidigestignore for React projects
aidigestignore react

# Generate .aidigestignore for Java projects
aidigestignore java
```

### List Supported Languages

```bash
aidigestignore --list
# or
aidigestignore -l
```

### Add Custom Patterns

```bash
# Add custom ignore patterns
aidigestignore flutter --add "custom-folder/" "*.custom-ext"
# or
aidigestignore flutter -a "temp/" "*.backup"
```

## Supported Languages/Frameworks

- **flutter** - Dart/Flutter projects
- **python** - Python projects
- **javascript** - JavaScript/Node.js projects
- **react** - React applications
- **java** - Java projects

## What Gets Ignored

### Flutter Projects

- Build directories (`build/`, `.dart_tool/`)
- Platform-specific folders (`linux/`, `macos/`, `windows/`, `web/`)
- IDE files (`.idea/`, `.vscode/`)
- Version control (`.git/`, `.github/`)
- Cache and temporary files

**Keeps Important Files:**

- `pubspec.yaml`
- `lib/` folder (all Dart code)
- `assets/` folder
- `*.md` files
- Essential Android files (`AndroidManifest.xml`, `build.gradle`)

### Python Projects

- Virtual environments (`venv/`, `.venv/`, `env/`)
- Python cache (`__pycache__/`, `*.pyc`)
- Build and distribution files
- IDE and editor files
- Test coverage reports

**Keeps Important Files:**

- `*.py` files
- `requirements.txt`
- `setup.py`
- `*.md` files
- Configuration files

### JavaScript/Node.js Projects

- `node_modules/`
- Build directories
- Cache files
- Log files
- Environment files

### React Projects

- Build directories (`build/`, `dist/`)
- `node_modules/`
- Environment files
- Cache directories

### Java Projects

- Compiled files (`*.class`)
- Build directories (`target/`, `build/`)
- IDE files
- Package files (`*.jar`, `*.war`)

## Example Output

When you run `aidigestignore flutter`, it creates a `.aidigestignore` file like this:

```
# .aidigestignore file for flutter
# Generated by aidigestignore
# This file tells aidigest which files and folders to ignore when creating codebase.md

build/
.dart_tool/
.packages
linux/
macos/
windows/
.idea/
.vscode/
.git/
.github/
# ... more patterns

# Add your custom ignore patterns below:
# custom-folder/
# *.custom-extension
```

## Customization

After generating the `.aidigestignore` file, you can:

1. **Edit the file** to add or remove patterns
2. **Add custom patterns** at the bottom
3. **Comment out patterns** you want to include (add `#` at the beginning)

## How It Works

1. The tool creates a `.aidigestignore` file in your current directory
2. When you run aidigest, it reads this file and excludes matching files/folders
3. Only the important code files and documentation are included in your `codebase.md`

## Contributing

To add support for a new language:

1. Add the ignore patterns to the `ignorePatterns` object in `index.js`
2. Test with your project
3. Submit a pull request

## License

MIT

## Author

Created to help developers clean up their aidigest outputs by excluding unnecessary files.
