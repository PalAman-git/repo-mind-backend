# Github api giving 500
working on an api end point, to fetch the content of the file I provided api with owner, repo and encodedURIContent path and it is giving me error.

error path - repo/repo.service

Solved: Used @Query to get the path from the URL instead of using @Params 