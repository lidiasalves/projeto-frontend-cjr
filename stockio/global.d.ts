// Tipos para permitir importações de CSS/SCSS em arquivos TypeScript
// Coloque este arquivo na raiz do projeto (mesma pasta que next-env.d.ts / tsconfig.json)

declare module '*.css';
declare module '*.scss';
declare module '*.sass';

// Declarações para CSS Modules (caso use *.module.css etc.)
declare module '*.module.css';
declare module '*.module.scss';
declare module '*.module.sass';
