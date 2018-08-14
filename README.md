# README #

This README would normally document whatever steps are necessary to get your application up and running.

### Dependencies ###

* Python 3.x
* Redis 3.x
* PostGreSQL 9.x

### Getting Started ###

* install postgres
	-- sudo apt-get update
	-- sudo apt-get install postgresql postgresql-contrib

* Create a user for postgres : "createuser gabbar --pwprompt"
* Create a db for the application : "createdb gabbar_db"
* Set password for the database : <DB_PASSWORD>


### Virtual Environment Setup ###

* install virtualnev

    -- sudo -H pip3 install --upgrade pip
    -- sudo -H pip3 install virtualenv

* Setup gabbar virtualenv : "virtualenv -p python3 gabbar_env"
* Move to virtualenv and activate its environment
	-- source gabbar_env/bin/activate

### Install dependencies
	-- cd src/
	-- pip install requirements.txt

## DB migrations
	-- python manage.py migrate

## server
	-- python manage.py runserver 0.0.0.0:8000 and check
