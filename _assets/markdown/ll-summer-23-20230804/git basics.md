---
tags: code
---
# git basics

git into terminal.

1. log in on github
2. profile--settings-
3. developer settings--(look at bottom of right hand menu)
4. personal access tokens--Tokens (classic)
5. generate token--classic
6. check all the top level boxes. 
7. generate token and copy


create your app...

then in terminal, inside your app directory
`git remote add origin https://github.com/J0RD4NK0FFM4N/lluf-reports-22-23.git
git branch -M main
git push -u origin main`
* a dialog box promtping pw might pop up, enter your computer's pw.

or...

`git initgit add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/J0RD4NK0FFM4N/lluf-reports-22-23.git
git push -u origin main
`
it will throw an error: error: remote origin already exists.
it will prompt you for your username and git pw. input the token as your pw


then `git add .`
`git commit -m "a little message to yourself about what you've changed"`
`git push -u origin main`

