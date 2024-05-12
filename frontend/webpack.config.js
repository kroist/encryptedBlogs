console.log('config started')
const webpack = require('webpack');
module.exports = {
    mode: 'development', 
    plugins: [
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    resolve: {
        fallback: {
            'tfhe_bg.wasm': require.resolve('tfhe/tfhe_bg.wasm'),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer")
            
        }
    
    }
};