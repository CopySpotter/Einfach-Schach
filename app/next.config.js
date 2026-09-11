// const withPWA = require('next-pwa')

// module.exports = withPWA({
//   pwa: {
//     dest: 'public',
//     register: true
//   }
// })

module.exports = {
  // Next.js 12 can hand MUI's old .mjs entry points directly to Node on
  // Windows. Node then rejects imports such as @mui/material/SvgIcon as
  // directory imports. Let Next/Webpack bundle these legacy dependencies
  // instead of resolving them as native ESM externals.
  experimental: {
    esmExternals: false
  },

  webpack(config, options) {
    const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });

    return config;
  },
};
