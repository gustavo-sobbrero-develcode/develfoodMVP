module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@assets': './src/global/assets',
          '@routes': './src/global/routes',
          '@services': './src/global/services',
          '@styles': './src/global/styles',
        },
      },
    ],
    'jest-hoist',
  ],
};
