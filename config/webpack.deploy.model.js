/**
 * @author: @AngularClass
 */
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');
const serverDeploy = require('./deploy');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
// https://www.npmjs.com/package/scp2
var scpUtil = require('scp2');

module.exports = function (options) {
    const webpackConfigFactory = serverDeploy.getWebpackConfigModule(options); // the settings that are common to prod and dev
    const webpackConfig = webpackConfigFactory(options);

    // replace the instance of HtmlWebpackPlugin with an updated one.
    serverDeploy.replaceHtmlWebpackPlugin(webpackConfig.plugins);

    return webpackMerge(webpackConfig, {
        output: {
            /**
             * The public path is set to the REPO name.
             *
             * `HtmlElementsPlugin` will add it to all resources url's created by it.
             * `HtmlWebpackPlugin` will add it to all webpack bundels/chunks.
             *
             * In theory publicPath shouldn't be used since the browser should automatically prefix the
             * `baseUrl` into all URLs, however this is not the case when the URL is absolute (start with /)
             *
             * It's important to prefix & suffix the repo name with a slash (/).
             * Prefixing so every resource will be absolute (otherwise it will be url.com/repoName/repoName...
             * Suffixing since chunks will not do it automatically (testes against about page)
             */
            publicPath: '/' + serverDeploy.safeUrl(webpackConfig.output.publicPath)
        },

        plugins: [
            function () {
                this.plugin('done', function (stats) {

                    const logger = function (msg) {
                        console.log(msg);
                    };

                    // Since GitHub moved to Jekyll 3.3, their server ignores the "node_modules" and "vendors" folder by default.
                    // but, as of now, it also ignores "vendors*" files.
                    // This means vendor.bundle.js or vendor.[chunk].bundle.js will return 404.
                    // this is the fix for now.
                    setTimeout(function () {
                        fs.writeFileSync(path.join(webpackConfig.output.path, '.nojekyll'), '');
                        console.log('Starting deployment to Server：' + webpackConfig.output.path);
                        var localpath = webpackConfig.output.path;
                        scpUtil.scp(localpath, {
                            host: 'ip',
                            username: 'root',
                            password: 'pwd',
                            path: '/path/to/deploy'
                        }, function (err) {
                            console.log(err);
                        });
                    }, 2000)
                });
            }
        ]
    });
};
