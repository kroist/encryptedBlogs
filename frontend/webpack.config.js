console.log('config started')
module.exports = {
    mode: 'development', 
    resolve: {
        fallback: {
            'tfhe_bg.wasm': require.resolve('tfhe/tfhe_bg.wasm'),
            "crypto": require.resolve("crypto-browserify")
        }
    
    }
};