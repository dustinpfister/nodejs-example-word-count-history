#!/usr/bin/env node
let exec = require('child_process').exec,
git = require('./lib/git.js');

let fs = require('fs'),
promisify = require('util').promisify,
readdir = promisify(fs.readdir);

// check to see if we have any markdown files
let mdCheckFor = (dir) => {
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

// git check
//gitFolderCheck()
git.folderCheck()
.catch((e) => {
    console.log(e);
    return Promise.reject('not a git folder');
})
.then(() => {
    return mdCheckFor(process.cwd());
})
.catch((e) => {
    console.log(e);
    return Promise.reject('can not check git log');
})

.then(() => {
    //return gitLogCommitList(process.cwd(), 10);
	return git.commitList(process.cwd(), 10);
})
.then((data) => {
    console.log(data);
})
.catch((e) => {
    console.log(e);
});
