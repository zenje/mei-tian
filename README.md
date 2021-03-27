# mei-tian

A React-Flask-based Chinese-English dictionary app! (Additional functionality still in progress!)

View live on heroku: [mei-tian.herokuapp.com/](http://mei-tian.herokuapp.com/)

## About

### Features:

- Lookup of Chinese words with definitions and sample sentences
- Displays random Chinese word on loading homepage
- HSK 2.0 and HSK 3.0 word lists
- Simplified / traditional character view toggle
- Local history of user's word lookups

### Technologies:

This app uses [React](https://reactjs.org) and [Material-UI](https://material-ui.com) for the front-end; Python web framework [Flask](https://flask.palletsprojects.com/en/1.1.x/) for the back-end, served by a [Gunicorn](https://gunicorn.org) web server; deployed on [Heroku](https://www.heroku.com).

Utilizes python package [chinese-english-lookup](https://github.com/zenje/chinese-english-lookup) created for this project to look up Chinese-English definitions.

### Sources:

- Chinese-English definitions from [CC-CEDICT](https://www.mdbg.net/chinese/dictionary?page=cedict)
- Sample Chinese sentences from [jukuu](http://www.jukuu.com)

## Running locally

### Build front-end:

```
npm run build
```

### Run `eslint`, sort imports:

```
npm run lint
```

### Start local gunicorn web server:

```
heroku local -f Procfile.dev
```

## Deployment setup

See [heroku docs](https://devcenter.heroku.com/articles/git) for more info.

### Add buildpacks:

```
heroku buildpacks:set heroku/python
heroku buildpacks:set heroku/nodejs
```

**Note**: The python buildpack should be added first.

This can also be done through heroku app settings.

### Add web dyno:

Create Procfile with web process to start gunicorn:

```
web: gunicorn --chdir flaskr "app:create_app()"
```

Scale app dyno (1 web process); [docs on dynos](https://devcenter.heroku.com/articles/dynos):

```
heroku ps:scale web=1
```

List dynos:

```
heroku ps
```

```bash
=== web (Free): gunicorn --chdir flaskr "app:create_app()" (1)
web.1: idle 2021/03/26 08:02:40 +0000 (~ 9m ago)
```

### Add requirements.txt:

```
touch requirements.txt
pip freeze > requirements.txt
```

(Can remove unnecessary dependencies.) This file should be updated when new dependencies are added.

### Deploying:

```
git push heroku master
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
