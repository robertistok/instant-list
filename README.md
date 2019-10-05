# InstantList - Work in Progress

Shopping list generation and recipe storage app integrated with the [Todoist API](https://developer.todoist.com/sync/v8/).

## Running it locally

1. git clone `https://github.com/robertistok/instant-list.git`
2. `npm install`
3. `npm run start` - this will start both the server and the client

## Deploying the database

1. `cd server`
2. `npm run prisma:deploy` (you should have a `.env` file ready)
3. Follow the steps

### Environment variables

#### Server  

**TODOIST_CLIENT_ID** - get it by registering your application [here](https://developer.todoist.com/appconsole.html)  
**TODOIST_CLIENT_SECRET** - get it by registering your application [here](https://developer.todoist.com/appconsole.html)   
**TODOIST_AUTH_CALLBACK** 
**TODOIST_RANDOM** - a random string  
**JWT_SECRET** - a random string used to sign the jwt tokens  
**FRONTEND_URL**
**PRISMA_SECRET** - to protect your prisma db  
**PRISMA_MANAGEMENT_API_SECRET** - obtained from the prisma console  
**PRISMA_ENDPOINT** - the endpoint of the deployed prisma db  

#### Client  

You can find the config files in the `/client/config.js` file.  

You need to replace the `TODOIST_CLIENT_ID` and the `TODOIST_CLIENT_SECRET` with your credentials.  

The `devEndpoint` and the `prodEndpoint` should point to your database instance url.


## Questions?
Feel free to open an issue and we can take it from there.
