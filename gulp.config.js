module.exports = function() {
    var config = {
        copyFile: [
            'src/**/*',
            '!src/**/*.scss',
            '!bower_components/**/*'
        ]
    };

    return config;
};
