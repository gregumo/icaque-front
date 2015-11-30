module.exports = function() {
    var config = {
        copyFile: [
            'src/**/*',
            '!src/resources/**/*.scss',
            '!src/resources/style/**/*',
            '!bower_components/**/*'
        ],
        sass: {
            src: 'src/resources/style/style.scss',
            web: 'web',
            watch: 'src/resources/style/**/*.scss'
        }
    };

    return config;
};
