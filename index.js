#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();

// Predefined ignore patterns for different languages/frameworks
const ignorePatterns = {
    flutter: [
        '.aidigestignore', // Ignore the generated ignore file itself
        // Build and cache directories
        'build/',
        '.dart_tool/',
        '.packages',
        '.pub-cache/',
        '.pub/',

        // IDE and editor files
        '.idea/',
        '.vscode/',
        '*.iml',
        '*.ipr',
        '*.iws',

        // Platform specific folders (keep only important Android files)
        'linux/',
        'macos/',
        'windows/',
        'web/',
        'ios/',

        // Android files to ignore (keep important ones)
        'android/app/build/',
        'android/build/',
        'android/.gradle/',
        'android/gradle/',
        'android/gradlew',
        'android/gradlew.bat',
        'android/local.properties',
        'android/key.properties',
        'android/app/release/',
        'android/.settings/',
        'android/app/src/main/java/io/flutter/plugins/GeneratedPluginRegistrant.java',

        // Android auto-generated resource files
        'android/app/src/main/res/values/styles.xml',
        'android/app/src/main/res/values-night/styles.xml',
        'android/app/src/main/res/mipmap-*/', // All mipmap density folders
        'android/app/src/main/res/drawable-*/launch_background.xml',
        'android/app/src/main/res/drawable/launch_background.xml',

        // Version control and CI
        '.git/',
        '.github/',
        '.gitignore',

        // Documentation (optional - remove if you want to include docs)
        'doc/',
        'docs/',

        // Test coverage
        'coverage/',
        'test/coverage/',

        // Temporary files
        '*.tmp',
        '*.temp',
        '.DS_Store',
        'Thumbs.db',

        // test files
        'test/',

        // pubspec lock unnecessary yaml files
        'pubspec.lock',
        'devtools_options.yaml',
        'analysis_options.yaml',
        '.metadata',

        // Log files
        '*.log',

        // Firebase (optional - uncomment if you don't want Firebase files)
        // 'firebase.json',
        // '.firebaserc',

        // Flutter specific temporary files
        '.flutter-plugins',
        '.flutter-plugins-dependencies',

        // Analysis options (optional)
        // 'analysis_options.yaml',

        // Images (uncomment if you don't want to include images)
        // '*.jpg',
        // '*.jpeg',
        // '*.png',
        // '*.gif',
        // '*.bmp',
        // '*.ico',
        // '*.svg',

        '',
        '# IMPORTANT: Keep these files and folders:',
        '# ✅ pubspec.yaml',
        '# ✅ lib/',
        '# ✅ assets/',
        '# ✅ *.md files',
        '# ✅ android/app/src/main/AndroidManifest.xml',
        '# ✅ android/app/src/main/kotlin/ or android/app/src/main/java/',
        '# ✅ android/app/src/main/res/values/strings.xml (if customized)',
        '# ✅ android/app/build.gradle',
        '# ✅ android/build.gradle',
    ],


    python: [
        '.aidigestignore', // Ignore the generated ignore file itself
        // Virtual environments
        'venv/',
        '.venv/',
        'env/',
        '.env/',
        'ENV/',
        'env.bak/',
        'venv.bak/',

        // Python cache
        '__pycache__/',
        '*.py[cod]',
        '*$py.class',
        '*.so',

        // Distribution / packaging
        '.Python',
        'build/',
        'develop-eggs/',
        'dist/',
        'downloads/',
        'eggs/',
        '.eggs/',
        'lib/',
        'lib64/',
        'parts/',
        'sdist/',
        'var/',
        'wheels/',
        'share/python-wheels/',
        '*.egg-info/',
        '.installed.cfg',
        '*.egg',
        'MANIFEST',

        // PyInstaller
        '*.manifest',
        '*.spec',

        // Unit test / coverage reports
        'htmlcov/',
        '.tox/',
        '.nox/',
        '.coverage',
        '.coverage.*',
        '.cache',
        'nosetests.xml',
        'coverage.xml',
        '*.cover',
        '*.py,cover',
        '.hypothesis/',
        '.pytest_cache/',
        'cover/',

        // Jupyter Notebook
        '.ipynb_checkpoints',

        // IPython
        'profile_default/',
        'ipython_config.py',

        // Environment variables
        '.env',
        '.venv',
        'env/',
        'ENV/',

        // IDE
        '.idea/',
        '.vscode/',
        '*.swp',
        '*.swo',
        '*~',

        // Version control
        '.git/',
        '.gitignore',
        '.github/',

        // OS generated files
        '.DS_Store',
        '.DS_Store?',
        '._*',
        '.Spotlight-V100',
        '.Trashes',
        'ehthumbs.db',
        'Thumbs.db',

        // Images (optional - remove if you want to include)
        '*.jpg',
        '*.jpeg',
        '*.png',
        '*.gif',
        '*.bmp',
        '*.ico',
        '*.svg',

        // Log files
        '*.log',

        // # Keep these important files:
        // # - *.py files
        // # - requirements.txt or pyproject.toml
        // # - setup.py or setup.cfg
        // # - *.md files
        // # - config files (.ini, .cfg, .yaml, .json)
        // # - src/ folder (if exists)
    ],

    javascript: [
        '.aidigestignore', // Ignore the generated ignore file itself
        // Dependencies
        'node_modules/',
        'npm-debug.log*',
        'yarn-debug.log*',
        'yarn-error.log*',
        'lerna-debug.log*',

        // Runtime data
        'pids',
        '*.pid',
        '*.seed',
        '*.pid.lock',

        // Coverage directory used by tools like istanbul
        'coverage/',
        '*.lcov',

        // nyc test coverage
        '.nyc_output',

        // Grunt intermediate storage
        '.grunt',

        // Bower dependency directory
        'bower_components',

        // node-waf configuration
        '.lock-wscript',

        // Compiled binary addons
        'build/Release',

        // Dependency directories
        'jspm_packages/',

        // TypeScript cache
        '*.tsbuildinfo',

        // Optional npm cache directory
        '.npm',

        // Optional eslint cache
        '.eslintcache',

        // Microbundle cache
        '.rpt2_cache/',
        '.rts2_cache_cjs/',
        '.rts2_cache_es/',
        '.rts2_cache_umd/',

        // Optional REPL history
        '.node_repl_history',

        // Output of 'npm pack'
        '*.tgz',

        // Yarn Integrity file
        '.yarn-integrity',

        // dotenv environment variables file
        '.env',
        '.env.test',
        '.env.production',

        // parcel-bundler cache
        '.cache',
        '.parcel-cache',

        // Next.js build output
        '.next',
        'out',

        // Nuxt.js build / generate output
        '.nuxt',
        'dist',

        // Gatsby files
        '.cache/',
        'public',

        // Storybook build outputs
        '.out',
        '.storybook-out',

        // Temporary folders
        'tmp/',
        'temp/',

        // IDE
        '.idea/',
        '.vscode/',

        // Version control
        '.git/',
        '.gitignore',
        '.github/',

        // OS generated files
        '.DS_Store',
        'Thumbs.db',

        // Images
        '*.jpg',
        '*.jpeg',
        '*.png',
        '*.gif',
        '*.bmp',
        '*.ico',
        '*.svg'
    ],

    react: [
        '.aidigestignore', // Ignore the generated ignore file itself
        // Build directories
        'build/',
        'dist/',

        // Dependencies
        'node_modules/',

        // Production build
        '/build',

        // Misc
        '.DS_Store',
        '.env.local',
        '.env.development.local',
        '.env.test.local',
        '.env.production.local',

        // Logs
        'npm-debug.log*',
        'yarn-debug.log*',
        'yarn-error.log*',

        // Runtime data
        'pids',
        '*.pid',
        '*.seed',
        '*.pid.lock',

        // Coverage
        'coverage/',

        // IDE
        '.idea/',
        '.vscode/',

        // Version control
        '.git/',
        '.gitignore',
        '.github/',

        // Images
        '*.jpg',
        '*.jpeg',
        '*.png',
        '*.gif',
        '*.bmp',
        '*.ico',
        '*.svg'
    ],

    java: [
        '.aidigestignore', // Ignore the generated ignore file itself
        // Compiled class files
        '*.class',

        // Log files
        '*.log',

        // BlueJ files
        '*.ctxt',

        // Mobile Tools for Java (J2ME)
        '.mtj.tmp/',

        // Package Files
        '*.jar',
        '*.war',
        '*.nar',
        '*.ear',
        '*.zip',
        '*.tar.gz',
        '*.rar',

        // Virtual machine crash logs
        'hs_err_pid*',

        // IDE
        '.idea/',
        '.vscode/',
        '*.iml',
        '.project',
        '.classpath',
        '.settings/',

        // Build tools
        'target/',
        'build/',
        '.gradle/',
        'gradle/',
        'gradlew',
        'gradlew.bat',

        // Version control
        '.git/',
        '.gitignore',
        '.github/',

        // OS files
        '.DS_Store',
        'Thumbs.db'
    ]
};

// Function to create .aidigestignore file
function createIgnoreFile(language, customPatterns = []) {
    const fileName = '.aidigestignore';
    const patterns = ignorePatterns[language];

    if (!patterns) {
        console.error(`❌ Language/framework "${language}" is not supported.`);
        console.log('📋 Supported languages:', Object.keys(ignorePatterns).join(', '));
        process.exit(1);
    }

    // Check if file already exists
    if (fs.existsSync(fileName)) {
        console.log(`⚠️  ${fileName} already exists. Do you want to overwrite it? (y/N)`);
        // For now, we'll proceed. In a future version, you could add interactive prompt
        console.log('🔄 Overwriting existing file...');
    }

    // Combine predefined patterns with custom patterns
    const allPatterns = [...patterns, ...customPatterns];

    // Create the content
    const content = `# .aidigestignore file for ${language}
# Generated by aidigestignore v${require('./package.json').version}
# This file tells aidigest which files and folders to ignore when creating codebase.md
# 
# Usage: Place this file in your project root directory
# aidigest will automatically read this file and exclude the listed patterns

${allPatterns.join('\n')}

# Add your custom ignore patterns below:
# custom-folder/
# *.custom-extension
# !important-file.ext  # Use ! to force include a file that would otherwise be ignored
`;

    // Write the file
    try {
        fs.writeFileSync(fileName, content, 'utf8');
        console.log(`✅ Created ${fileName} for ${language}`);
        console.log(`📁 ${allPatterns.length} ignore patterns added`);
        console.log(`📝 You can edit ${fileName} to add more custom patterns`);
        console.log(`💡 Use '!' prefix to force include files (e.g., '!important-file.txt')`);
    } catch (error) {
        console.error(`❌ Error creating ${fileName}:`, error.message);
        process.exit(1);
    }
}

// Function to list supported languages
function listLanguages() {
    console.log('🚀 Supported languages and frameworks:');
    Object.keys(ignorePatterns).forEach(lang => {
        console.log(`  • ${lang}`);
    });
    console.log('\n💡 Usage: npx aidigestignore <language>');
    console.log('💡 Example: npx aidigestignore flutter');
}

// Set up CLI
program
    .name('aidigestignore')
    .description('Generate .aidigestignore files for different programming languages')
    .version('1.0.0');

program
    .argument('[language]', 'Programming language or framework (flutter, python, javascript, react, java)')
    .option('-l, --list', 'List all supported languages')
    .option('-a, --add <patterns...>', 'Add custom ignore patterns')
    .action((language, options) => {
        if (options.list) {
            listLanguages();
            return;
        }

        if (!language) {
            console.log('❌ Please specify a language or framework');
            listLanguages();
            process.exit(1);
        }

        const customPatterns = options.add || [];
        createIgnoreFile(language.toLowerCase(), customPatterns);
    });

// Handle case where no arguments provided
if (process.argv.length === 2) {
    listLanguages();
}

program.parse();