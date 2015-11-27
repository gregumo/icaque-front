module.exports = function() {
    var config = {
        copyFile: [
            'app/**/*',
            '!app/**/*.scss',
            '!bower_components/**/*'
        ]
    };

    return config;
};
