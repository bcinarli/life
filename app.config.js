/**
 * @author Bilal Cinarli
 */

'use strict';

const path            = require('path');
const pkg             = require('./package.json');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {};

config.name = pkg.name;

config.source = path.resolve(__dirname, 'source');

config.paths = {
    app:     path.resolve(__dirname, 'app'),
    public:  '/',
    content: './app/',
    assets:  './assets/',
    scripts: './assets/scripts/',
    styles:  './assets/styles/'
};

config.filenames = {
    js:  config.paths.scripts + config.name + '.[name]',
    css: config.paths.styles + config.name + '.css'
};

config.extractCSS = new ExtractTextPlugin(config.filenames.css);

config.rules = {
    html:    {
        test:    /\.tpl?$/i,
        loader:  'html-loader',
        options: {
            attrs: ["img:src", "link:href"]
        }
    },
    eslint:  {
        test:    /\.(js|jsx)?$/i,
        enforce: 'pre',
        loader:  'eslint-loader'
    },
    babel:   {
        test:   /\.(js|jsx)?$/i,
        loader: 'babel-loader'
    },
    sass:    {
        test:    /\.scss?$/i,
        loaders: [
            'style-loader',
            {loader: 'css-loader', query: {sourceMap: true}},
            {loader: 'resolve-url-loader', query: {keepQuery: true}},
            {loader: 'sass-loader', query: {sourceMap: true}}
        ]
    },
    extract: {
        test:   /\.scss?$/i,
        loader: config.extractCSS.extract({
            loader: [
                {loader: 'css-loader', query: {sourceMap: true}},
                {loader: 'resolve-url-loader', query: {keepQuery: true}},
                {loader: 'sass-loader', query: {sourceMap: true}}
            ]
        })
    }
};

module.exports = config;