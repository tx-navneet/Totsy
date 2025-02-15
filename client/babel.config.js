export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  env: {
    development: {
      compact: false,
      sourceMaps: true,
    },
    production: {
      compact: true,
      sourceMaps: false,
    },
  },
};
