#!/usr/bin/env node

let gitFolderCheck = (dir) => {
    return new Promise((resolve, reject) => {
        resolve();
    });
};

gitFolderCheck(process.cwd())

.then(() => {

    console.log('hello');

})

.catch((e) => {

    console.log(e.message);

});
