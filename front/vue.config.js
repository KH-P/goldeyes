let target;
let portt;

if (process.env.NODE_ENV != null && process.env.NODE_ENV == 'development'){
    target = 'http://localhost:8080';
    portt = 8080;
}
else {
    target = 'http://132.226.173.98:3000';
    portt = 80;
}

//target = 'http://localhost:8080';
target = 'http://132.226.173.98:3000';
module.exports = {
    devServer: {
        port: portt,
        //disableHostCheck: true,
        //historyApiFallback: true,
        proxy: {
            '^/api': {
                target,
                changeOrigin: true,
                secure: false,
                logLevel: "debug",
                aggregateTimeout: 300
            }
        }
    }
}