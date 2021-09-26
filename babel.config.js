module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-transform-modules-commonjs',
      {
        importInterop: 'none',
      },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-template-literals',
  ],
};
