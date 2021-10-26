## Introduction
Car Clarity Assignment

## Setup

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

## Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

http://localhost:27017/

To view the records in mongodb collection , use MongodB compass
## Install the Dependencies

Next, from the project folder, install the dependencies:

    npm i

## Start the Server

    node index.js

This will launch the Node server on port 3900. If that port is busy, you can set a different point in config/default.json.

Open up your browser and head over to Postman/Insomnia to submit request

http://localhost:3900/api/

## Solution
We have two datastores
Datastore A, local MongoDB(http://localhost:27017/carclarity) 
Datastore B, local file(datastoreB.json)

The Entity is a product which has a title,id,stock details and will be stored in the datastores

Datastore#A API URL
A product can be created by
POST http://localhost:3900/api/datastoreA/products

A product can be updated by
PUT http://localhost:3900/api/datastoreA/products/:id

A product can be fetched by

GET http://localhost:3900/api/datastoreA/products/:id


Datastore#B API URL
A product can be created by
POST http://localhost:3900/api/datastoreB/products

A product can be updated by
PUT http://localhost:3900/api/datastoreB/products/:id

A product can be fetched by

GET http://localhost:3900/api/datastoreB/products/:id


If an product is created/updated in the datastore#A it is synchronized to the datastore#B via Event emitters and vice-versa.


## Timetaken 
Around 4 hrs

## Improvements
Using Message brokers for synchronizing different datastores. 
