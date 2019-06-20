var packageConfig = require('../package');

exports.getOwnProperty = function (obj) {
    return function (prop) {
        var args = Array.prototype.slice.call(arguments),
            prop = args.shift();

        if (obj.hasOwnProperty(prop)) {
            return typeof obj[ prop ] === 'function'
                ? obj[ prop ].apply(obj, args)
                : obj[ prop ];
        }
    };
}

exports.getDepMods = function () {
    return Object.keys(packageConfig.dependencies);
}