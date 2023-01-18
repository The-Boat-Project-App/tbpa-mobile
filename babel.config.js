module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@components': './components',
            '@screens': './screens',
          },
        },
      ],
      'nativewind/babel',
      [
        'inline-dotenv',
        {
          systemVar: 'all',
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: 'react-native-dotenv',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
