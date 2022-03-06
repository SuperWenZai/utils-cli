// const path = require('path');
const processEnv = process.env.NODE_ENV;
const isPro = processEnv === 'production';

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: isPro ? '/online/' : './',
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',
  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: true,
  // 是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,
  // 生产环境是否生成 sourceMap 文件 sourceMap的详解请看末尾
  productionSourceMap: true,
  configureWebpack: {
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].[${isPro ? 'contenthash' : 'hash'}:8].js`,
      chunkFilename: `chunk/[name].[${isPro ? 'contenthash' : 'hash'}:8].js`,
    },
    // 警告 webpack 的性能提示
    performance: {
      hints: isPro ? 'warning' : false, // 本地开发不显示警告
      // 入口起点的最大体积
      maxEntrypointSize: 512000, // 500kib
      // 生成文件的最大体积
      maxAssetSize: 307200, // 300kib
      // 只给出 js 文件的性能提示
      assetFilter(assetFilename) {
        return assetFilename.endsWith('.js');
      },
    },
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS requireModuleExtension for all css / pre-processor files.
    requireModuleExtension: false,
  },
  // 构建时开启多进程处理 babel 编译
  // parallel: require('os').cpus().length > 1,
  // webpack-dev-server 相关配置
  devServer: {
    // 设置代理
    hot: true, // 热加载
    port: 8080, // 端口
    https: false, // false关闭https，true为开启
    open: false, // 自动打开浏览器
    // proxy: {
    //   '/api': {
    //     // 本地
    //     target: 'xxx',
    //     // 如果要代理 websockets
    //     ws: true,
    //     changeOrigin: true,
    //   },
    //   '/test': {
    //     // 测试
    //     target: 'xxx',
    //   },
    //   '/pre': {
    //     // 预发布
    //     target: 'xxx',
    //   },
    //   '/pro': {
    //     // 正式
    //     target: 'xxx',
    //   },
    // },
  },
  pluginOptions: {
    // 第三方插件配置
    // 'style-resources-loader': {
    //   preProcessor: 'less',
    //   patterns: [path.resolve(__dirname, './src/assets/css/index')],
    // },
  },
};
