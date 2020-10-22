#!/usr/bin/env node
let exec = require('child_process').exec,
git = require('./lib/git.js'),
markdown = require('./lib/markdown.js');

let fs = require('fs'),
promisify = require('util').promisify,
readdir = promisify(fs.readdir);

/*
let forCommit = (commitObj) => {

return git.toCommit(commitObj.commit)
.then(() => {
console.log(commitObj);
return readdir(process.cwd());
})
.then((files) => {
console.log(files);
return Promise.resolve('forCommit cal good');
})

};
 */
git.folderCheck()
.catch((e) => {
    return Promise.reject('not a git folder');
})
/*
.then(() => {
return markdown.checkForFiles(process.cwd());
})
 */
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
            loop(done, error)
        }
    };

    return new Promise((resolve, reject) => {
        loop(() => {
            resolve('looks good');
        }, () => {
            reject('oh no');
        })
    });

    /*
    return Promise.all(commitList.map((commitObj) => {
    return forCommit(commitObj);
    }));
     */
})
.then(() => {
    // return to latest commit
    console.log('looks good');
    //return git.toCommit('master');
})
.catch((e) => {
    console.log(e);
});
