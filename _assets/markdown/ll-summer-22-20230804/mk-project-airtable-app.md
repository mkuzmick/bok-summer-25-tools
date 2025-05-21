---
tags: mk, projects
---

# mk-project-airtable-app


following docs [here](https://www.airtable.com/developers/apps/guides/building-a-new-app).

[hello-world tutorial](https://www.airtable.com/developers/apps/guides/hello-world-tutorial)

We've tried it 2 ways: 
1. moving from hello world tutorial
2. moving from the printing app they already have

It might be better to just start from scratch instead of opting for number 2.


## steps

- create custom app in Airtable
- `npm install -g @airtable/blocks-cli`
- `block init KEYXXXXXXXXXXX  --template=https://github.com/Airtable/apps-print-records ll_summer_printing_machine`
- `cd ll_summer_printing_machine`
- `block run`
- copy `https://localhost:9000` and paste into the Airtable interface when prompted


### create and and link github repo



```
echo "# ll-summer-printing-machine" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mkuzmick/ll-summer-printing-machine.git
git push -u origin main
```

## links

- [Airtable Apps user interface guidelines](https://quip.com/qtOIAHJyoiDt)
- [polishing your app in Airtable docs](https://www.airtable.com/developers/apps/guides/polishing-your-app)


