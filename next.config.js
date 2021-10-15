const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    config.module.rules.push({
      test: /\.vtt/,
      use: [
        defaultLoaders.babel,
        {
          loader: "file-loader",
        },
      ],
    });

    config.resolve.modules = [path.resolve(__dirname, "./"), "node_modules"];

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com"],
  },
};
