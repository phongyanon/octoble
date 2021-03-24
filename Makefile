# a helper shell script
MAKE_VERSION=1.1.8

heroku:
	@ git add .
	@ git commit -m "update for test"
	@ git push heroku master