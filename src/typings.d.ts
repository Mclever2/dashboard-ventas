// Declarations to avoid TypeScript parsing of @antv modern .d.ts files in older TS versions
// These fallbacks make the modules "any" to allow runtime loading via dynamic import.

declare module '@antv/g2plot';
declare module '@antv/g2';
declare module '@antv/util';
declare module '@antv/component';
