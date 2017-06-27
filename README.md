# Digital Resource Library

[![Build status][build status image]][ci]

A digital resource library app, based on [express], which looks like [gov.uk]

[![Deploy][heroku deploy image]][heroku deploy hook]

## Edit digital resource data

All the data lives in [app/data/resources.js](app/data/resources.js).
Add/edit content there and submit pull request.

## Mounting the application in a directory

The app will run mounted at `/` by default. To run within a directory, set the
`EXPRESS_BASE_PATH` environment variable.

For example, to mount the application at `/digital-resource-library`, run:

```sh
$ EXPRESS_BASE_PATH=/digital-resource-library npm run start
```

[build status image]: https://api.travis-ci.org/lm-tools/digital-resource-library.svg
[ci]: https://travis-ci.org/lm-tools/digital-resource-library
[express]: http://expressjs.com/
[gov.uk]: https://www.gov.uk/
[heroku deploy image]: https://www.herokucdn.com/deploy/button.svg
[heroku deploy hook]: https://heroku.com/deploy
