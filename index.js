#!/usr/bin/env node
let exec = require('child_process').exec,
git = require('./lib/git.js'),
markdown = require('./lib/markdown.js');

git.folderCheck()
.catch((e) => {
    console.log(e);
    return Promise.reject('not a git folder');
})
.then(() => {
    return markdown.checkForFiles(process.cwd());
})
.catch((e) => {
    console.log(e);
    return Promise.reject('can not check git log');
})
.then(() => {
    return git.commitList(process.cwd(), 10);
})
.then((data) => {
    console.log(data);
})
.catch((e) => {
    console.log(e);
});
