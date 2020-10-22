# todo list for nodejs-example-word-count-history


## 0.2.0 - create word count objects for each markdown file
* starting with the oldest commit in the commit list create an array of objects for each markdown file found
* if no markdown files are found go to the next commit in the commit list
* each post object should contain an wordCount object that is an array of word counts, and dates

## 0.1.0 - Improved git.commitList method
* make it so the git.commitList method returns an array of objects where each object contains a commit prop
* this commit prop refers to the current text id of a given commit
* make it so that there is a date property for each object also

## 0.0.0 - just get list of commits
* (done) make this project a bin "blog-wc"
* (done) blog-wc will check if the current working dir is a git folder if not it will log an error message
* (done) blog-wc will check for markdown files and stop with an error if none are found
* (done) if current working path is a git folder blog-wc will preform a git log for the past few commits
* (done) can set the number of commits to go back
* (done) the getLogCommitList method returns an array of commits
* (done) have a /lib/git.js and a /lib/markdown.js