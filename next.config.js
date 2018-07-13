const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.(css|scss|svg)$/,
        exclude: /node_modules/,
        loader: 'emit-file-loader',
        options: {
          name: '[path][name].[ext]/[hash].[ext]',
        },
      },
      {
        test: /\.(svg|png|gif|mp4|jpg|otf|eot|ttf)$/,
        use: [
          'babel-loader',
          {
            loader: 'file-loader',
            options: {
              outputPath: '../static/',
              name: '[path][name].[ext]/[hash].[ext]',
              publicPath: '/static/',
            },
          },
        ]
      }
    );
    return config;
  },
};

module.exports = withPlugins([sass], nextConfig);