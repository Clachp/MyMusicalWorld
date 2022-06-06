# API - mymusicalworld 

An API rest to store music datas for a user connected on the MyMusicalWorld's app

## Getting Started

Clone the repository on your local machine 
```
git clone <repo's url>
```


### Prerequisites

You need to install the following softwares to get the API running 

- [NodeJS](https://nodejs.org/en/download/) (v12 ou supérieure)
- [PostgreSQL](https://www.postgresql.org/download/) (v12 ou supérieure)
- [Sqitch](https://sqitch.org/download/) (v1 ou supérieure)

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be
Install the npm dependencies by running the command : 

```
npm install
```
Copy an rename the .env.example file to .env and fill the necessary informations 

Copy an rename the squitch.conf.example file to squitch.conf and fill the necessary informations

Make a database in Postgresql by running
```
creatdb musicalworld
```

Deploy on Sqitch by running
```
sqitch deploy
```

To seed your database, run
```
psql -d musicalworld -f ./data/seeding.sql
```

## Running the tests

Run the api by running
```
npm start
```
in the BACK file

### Break down into end to end tests

Go to BACK/apiUser.http to send the requests to test user's related requests
Go to BACK/apiItem.http to send the requests to test music's related requests


### And coding style tests

Firts use the /login road, then copy and paste the Bearer token generated after 
```
@token=
```
in the apiUser.http or apiItem.http files

Run this example to add an album in your database 
```
POST {{host}}/dashboard/album
Authorization:{{token}}
Content-Type: application/json

{
        "name": "abbey road",
        "genre": "rock",
        "artist": "beatles",
        "year": "1969",
        "urlImage": "balbal",
        "apiId": 1
        
    }
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [npm](https://www.npmjs.com/) - Dependency Management


## Versioning

We use [Git](https://git-scm.com/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Claire Chapon** - *Initial work* - [ClaChp](https://github.com/Clachp)
* **Valentin Deschins** - *Initial work* - [ValR08813](https://github.com/ValR08813)



## Acknowledgments

* This project was higly inspired by Nicolas Charpin's work - [Nicoclok](https://github.com/Nicoclock)
