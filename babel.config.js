const plugins = []

plugins.push(['import', {
  'libraryName': ['ant-design-vue', '@ant-design/icons-vue'],
  'libraryDirectory': 'es',
  'style': 'css'
}])

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
}
