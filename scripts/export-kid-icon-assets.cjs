const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const root = path.resolve(__dirname, '..');
const iconDirectory = path.join(root, 'apps', 'web', 'src', 'components', 'kid', 'icons');
const outputDirectory = path.join(root, 'apps', 'web', 'public', 'icons', 'kid');
const sourceFiles = ['navigation.tsx', 'learning.tsx', 'account.tsx', 'actions.tsx', 'feedback.tsx', 'utilities.tsx', 'rewards.tsx'];
const moduleCache = new Map();

const toFilename = (iconName) =>
  iconName
    .replace(/^Kid/, '')
    .replace(/Icon$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

const toTitle = (filename) => filename.replace(/-/g, ' ');

const resolveRelativeModule = (fromFile, request) => {
  const base = path.resolve(path.dirname(fromFile), request);
  return [base, `${base}.tsx`, `${base}.ts`, path.join(base, 'index.ts')].find(fs.existsSync);
};

const loadModule = (filePath) => {
  if (moduleCache.has(filePath)) return moduleCache.get(filePath).exports;

  const module = { exports: {} };
  moduleCache.set(filePath, module);
  const source = fs.readFileSync(filePath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: filePath,
  }).outputText;

  const localRequire = (request) => {
    if (!request.startsWith('.')) return require(request);
    const resolved = resolveRelativeModule(filePath, request);
    if (!resolved) throw new Error(`Cannot resolve ${request} from ${filePath}`);
    return loadModule(resolved);
  };

  new Function('require', 'module', 'exports', compiled)(localRequire, module, module.exports);
  return module.exports;
};

fs.mkdirSync(outputDirectory, { recursive: true });
const exportsByName = Object.assign({}, ...sourceFiles.map((file) => loadModule(path.join(iconDirectory, file))));
const icons = Object.entries(exportsByName).filter(([name, value]) => /^Kid[A-Za-z0-9]+Icon$/.test(name) && typeof value === 'function');

for (const [name, Component] of icons) {
  const filename = toFilename(name);
  const markup = renderToStaticMarkup(
    React.createElement(Component, {
      width: 24,
      height: 24,
      color: '#4B2E16',
      style: { '--kid-icon-gold': '#FFCA28' },
    }),
  );
  const svg = markup.replace(/^<svg([^>]*)>/, `<svg$1><title>${toTitle(filename)}</title>`);
  fs.writeFileSync(path.join(outputDirectory, `${filename}.svg`), svg);
}

console.log(`Exported ${icons.length} Kid Icon SVG assets to ${outputDirectory}`);
