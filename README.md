2019-03-31
This repository was split off from `scholar.eigenfactor.org` using:
```
git merge eb_redesign --allow-unrelated-histories -s recursive -Xtheirs
git filter-branch --subdirectory-filter scholar/app/static/js/citationVis master
```
(see <https://help.github.com/en/articles/splitting-a-subfolder-out-into-a-new-repository>)
Then I pushed this to a new repository.
