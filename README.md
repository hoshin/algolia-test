# Algolia test
The purpose of this piece of code is to fiddle around w/ the Algolia API
## The server

### What it does
At this point the server does only the 2 things:

* Allow to add a new record to an Algolia index
* Allow to delete an Algolia record based on its `ObjectID`

### Configuration
The server first needs to be configured, this is done through the `./server/config/base.json` file (there is a sample file in `./server/config/` that can just be renamed and filled in with the appropriate credentials). 

A couple of things to know beforehand : 
* The server won't start without that file.
* As the services provided modify an index, you need to use your private API key there, not the public one

### Starting the server

Once modules are installed, the server can be run two ways : 

* By running `npm start`
* By starting it via PM2 using the configuration file : `pm2 start ./server/server.pm2/json`

## The client

### What it does

It is a sample application that does multiple "reading" tasks using the Algolia JS helper (provided by [algoliasearch / algoliasearch-helper](https://community.algolia.com/algoliasearch-helper-js/))

* Search Bar
* Search Stats
* Pagination
* Hits list
* Refinement list

It then tries to present the results as nicely as possible with some help from [semantic.ui](https://semantic-ui.com/)

### Configuration
The server first needs to be configured, this is done through the `./client/config/base.json` file (there is a sample file in `./client/config/` that can just be renamed and filled in with the appropriate credentials). 

A couple of things to know beforehand : 
* The client won't start without that file.
* As the services provided are purely for reading data (and because, it'll be included in the JS sent to browsers), you should probably use the public API key for your index rather than the private one (which is probably a hazard)

### Starting the client

Once modules are installed, the server can be run two ways : 

* By running `npm start`
* By starting it via PM2 using the configuration file : `pm2 start ./client/client.pm2/json`
