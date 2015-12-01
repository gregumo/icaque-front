module.exports = function() {
    var config = {
        root: {
            src: 'src',
            dest: 'web'
        },
        bower: {
            dest: 'web/bower_components'
        },
        images: {
            src: 'src/resources/images/**/*',
            dest: 'web/resources/images',
            watch: 'src/resources/images/**/*'
        },
        copy: {
            src: [
                'src/**/*',
                '!src/resources/**/*.scss',
                '!src/resources/style/**/*',
                '!bower_components/**/*'
            ]
        },
        fonts: {
            src: 'src/resources/fonts/**/*',
            dest: 'web/resources/fonts',
            watch: 'src/resources/fonts/**/*'
        },
        sass: {
            src: 'src/resources/style/style.scss',
            dest: 'web',
            watch: 'src/resources/style/**/*.{scss,css}'
        },
        html: {
            src: 'web/**/*.html',
            watch: 'src/**/*.html'
        },
        js: {
            watch: 'src/**/*.js'
        }
    };

    return config;
};
