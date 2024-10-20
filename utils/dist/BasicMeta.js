'use strict'
exports.__esModule = true
var head_1 = require('next/head')
var config_1 = require('./config')
function BasicMeta(_a) {
    var title = _a.title,
        description = _a.description,
        keywords = _a.keywords,
        url = _a.url
    return React.createElement(
        head_1['default'],
        null,
        React.createElement(
            'title',
            null,
            title
                ? [title, config_1['default'].site_title].join(' | ')
                : config_1['default'].site_title
        ),
        React.createElement('meta', {
            name: 'description',
            content: description
                ? description
                : config_1['default'].site_description,
        }),
        React.createElement('meta', {
            name: 'keywords',
            content: keywords
                ? keywords.join(',')
                : config_1['default'].site_keywords
                      .map(function (it) {
                          return it
                      })
                      .join(','),
        }),
        React.createElement('meta', {
            name: 'author',
            content: config_1['default'].site_title,
        }),
        React.createElement('link', {
            rel: 'canonical',
            href: config_1['default'].base_url + url,
        }),
        React.createElement('link', {
            rel: 'shortcut icon',
            href: '/favicon.svg',
        }),
        React.createElement('meta', { charSet: 'utf-8' }),
        React.createElement('meta', {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
        }),
        React.createElement('meta', {
            name: 'theme-color',
            content: '#fffffff',
        }),
        React.createElement('meta', {
            property: 'og:title',
            content: config_1['default'].site_title,
        }),
        React.createElement('meta', {
            property: 'og:description',
            content: 'Portfolio',
        }),
        React.createElement('meta', {
            property: 'og:url',
            content: config_1['default'].base_url,
        })
    )
}
exports['default'] = BasicMeta
