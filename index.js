#!/usr/bin/env node
let exec = require('child_process').exec,
git = require('./lib/git.js'),
markdown = require('./lib/markdown.js');

let fs = require('fs'),
promisify = require('util').promisify,
readdir = promisify(fs.readdir);

git.folderCheck()
.catch((e) => {
    return Promise.reject('not a git folder');
})
.catch((e) => {
    return Promise.reject('can not check git log');
})
.then(() => {
    return git.commitList(process.cwd(), 10);
})
.then((commitList) => {

    let i = commitList.length,
    commitObj;

    let loop = (done, error) => {
        i--;
        commitObj = commitList[i];
        console.log(commitObj.commit);
        if (i === 0) {
            done();
        } else {

            git.toCommit(commitObj.commit, process.cwd())
            .then(() => {
                return readdir(process.cwd());
            })
            .then((files) => {
                console.log(files);
                loop(done, error);
            })
            .catch((e) => {
                console.log(e);
                error(e);
            })

        }
    };

    return new Promise((resolve, reject) => {
        loop(() => {
            resolve('looks good');
        }, (e) => {
            reject(e);
        })
    });

})
.then(() => {
    // return to latest commit
    console.log('looks good');
    //return git.toCommit('master');
})
.catch((e) => {
    console.log(e);
});
