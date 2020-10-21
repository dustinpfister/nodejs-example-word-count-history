# todo list for nodejs-example-word-count-history

## 0.2.0 - create additional wordCount objects
* after starting collection of objects is created for all posts start switching from the oldest commit to the newest
* for each commit get a list of files where changes have happened from last commit
* push new wordCount objects only for posts where changes happened from last commit

## 0.1.0 - create start counts
* starting with the oldest commit in the commit list create an array of objects for each markdown file
* each post object should contain an wordCount object that is an array of word counts, and dates

## 0.0.0 - just get list of commits
* (done) make this project a bin "blog-wc"
* (done) blog-wc will check if the current working dir is a git folder if not it will log an error message
* (done) blog-wc will check for markdown files and stop with an error if none are found
* (done) if current working path is a git folder blog-wc will preform a git log for the past few commits
* can set the number of commits to go back
* the getLogCommitList method returns an array of commits
* have a /lib/git.js and a /lib/markdown.js