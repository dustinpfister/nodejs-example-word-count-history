let fs = require('fs'),
promisify = require('util').promisify,
readdir = promisify(fs.readdir);

// check to see if we have any markdown files
exports.checkForFiles = (dir) => {
    return readdir(dir)
    .then((files) => {
        var i = 0;
        while (i < files.length) {
            let match = files[i].match(/\.md$/);
            if (match) {
                return Promise.resolve('markdown file found');
            }
            i += 1;
        }
        return Promise.reject('no markdown files found.');
    });
};
