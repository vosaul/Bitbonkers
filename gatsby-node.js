/* exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
} */
exports.onCreateWebpackConfig = ({ actions: { replaceWebpackConfig }, getConfig }) => {
  const config = getConfig()

  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: 'workerize-loader' }
  })

  config.output.globalObject = 'this'

  replaceWebpackConfig(config)
}


// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions
//
//   if (page.path.match(/^\/info/)) {
//     page.matchPath = "/info/*"
//
//     createPage(page)
//   }
// }
