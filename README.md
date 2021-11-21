
## Installation

1. You need `Node.js` (at least 10.x version) installed on your machine, if you don't have it, you should install it - download [link](https://nodejs.org/en/download/)
2. Clone the repo
3. `cd` to the new `/sinely` folder
4. Install necessary dependencies:
    - **Via node `npm` package manager** - Run `npm install` on the project root
    - **Via `yarn` package manager** - Run `yarn install` on the project root
5. optional : install Gulp globaly : `npm install -g gulp-cli`. The proj uses `npm run gulp` localy

## Configuration for PostgreSQL database and Redis data structure store

##### Via Docker

1. Install **Docker** on your machine
2. Run `docker-compose up -d` in a terminal on the project root. This will start 3 containers:
    - database(PostgreSQL) container;
    - redis container - required for session management;
    - haproxy container - required only for a staging/production setup;

##### Via another chosen solution.

1. Install your **PostgreSQL** database
2. Install your **Redis** server
3. Change connection configuration, from your root `cd` to `env-files` folder and change the following configurations with your own:

###### **For PostgreSQL connection:**
1. Database connection via URL
```bash
DATABASE_URL=http://sinelyUser:sinelyPwd@127.0.0.1:5432/sinelyDb
# Example: DATABASE_URL=http://<user>:<password>@<host>/<database_name>
```
2. Database connection via credentials
```bash
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=sinely
DATABASE_USER=sinelyUser
DATABASE_PASSWORD=sinelyPwd
```

######  **For Redis connection:**
1. REDIS connection via URL
```bash
REDIS_URL=redis://:@127.0.0.1:6379
# Example: redis://:<password>@<host>:<port>
```
2. REDIS connection via credentials
```bash
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
```

## Migrations and seeds

1. For database tables structure, in the project root run: `npm run knex migrate:latest` or `yarn knex migrate:latest` if you are using `yarn` as the default package manager
2. To create a default user, run: `npm run knex seed:run` or `yarn knex seed:run` if you are using `yarn` as the default package manager
3. create folder `uploads`

4. For production the previous commands should be run while Env is set to production otherwise it will use dev as default
5. If in prod run gulp build then => copy public/css/* into dist /css

## Run the application

1. For starting the application, the following script (defined in `package.json` under `scripts`) must be called:
    - via **npm**: `npm run start` or `npm run dev` for starting the development environment, which has livereload enabled;
    =>> if mignified files (aragon.min css and js) are not generated by npm dev then use just `gulp` command.
    - via **yarn**: `yarn start` or `yarn dev` for starting the development environment, which has livereload enabled;

## set environment

If env is not set developement is chosen by default.
To set which env are you on use => `export NODE_ENV=production` but !!! if system restarts the env should be redifened (or set it persistant)

you can update pm2 using `NODE_ENV=production pm2 restart npm_app_name --update-env`

## Compiling for production

`gulp build` you can list all tasts using `gulp --tasks`

/dist The shortform dist stands for distributable and refers to a directory where files will be stored that can be directly used by others without the need to compile or minify the source code that is being reused.
Something similar applies to JavaScript modules. Usually JavaScript code is minified and obfuscated for use in production. Therefore, if you want to distribute a JavaScript library, it's advisable to put the plain (not minified) source code into a src (source) directory and the minified and obfuscated version into the dist (distributable) directoy, so others can grab the minified version right away without having to minify it themselves.

Note: Some developers use names like target, build or dest (destination) instead of dist. But the purpose of these folders is identical.

##  Errors
if you get after `npm run dev`
> [1] (node:7240) UnhandledPromiseRejectionWarning: Error: ENOSPC: System limit for number of file watchers reached, watch '/home/user/aragon/public/vendor/@fortawesome/fontawesome-free/css/fontawesome.min.css'

sol  `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

Also think of running :

 `npm run pm2 start 0  --watch --ignore-watch=“./uploads”`

## tricks
- you can run pm2 using 'npm run pm2 ls'
- To remove containers think of removing volumes too docker volume rm $(docker volume ls -q) !!! THIS to use only in dev this cmd will remove all volumes of all containers!!
## Usage

Register a user or login using :`admin@Sinely.com`:`Sinely@1*2*3` and start testing the preset (make sure to run the migrations and seeds for these credentials to be available).

Besides the dashboard and the auth pages this preset also has an edit profile page.
**NOTE**: _Keep in mind that all available features can be viewed once you login using the credentials provided above or by registering your own user._

## How to add new feature?
All feature routes are mounted in `routes/index.js` from the project root. There you should add your new route and point toward the secondary router that is located under `/features` folder. 
For example, to add a router (let's call it uploader) for uploading files we will follow the steps below:

1- Create a new folder under `/features/uploader` (you can choose a meaningful name for each new feature).

2- Add the secondary router `/features/uploader/routes.js` 

3- Add `const FileUploaderRouter = require('../features/uploader/routes');` and register it using `FileUploaderRouter(router, [isAuthenticated]);` (isAuthenticated is a midelware that restricts accessibility only for authenticated users)

In order to see the available features `cd` into `features` folder, and you will then find a folder for each of the available features, mostly each folder containing:

- A `routes.js` file that usually contains the `GET` and `POST` requests, for example, the profile router looks like this:

```javascript
const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const updateUserInfo = require('./commands/update-user-info');
const { loadPage } = require('./commands/profile');

module.exports = (router, middlewares = []) => {
  router.get('/profile', middlewares.map(middleware => wrap(middleware)), wrap(loadPage));
  router.post('/update-profile-info', wrap(requestBodyValidation), wrap(updateUserInfo));

  return router;
};
```

- A `repository.js` file that contains feature database queries
- A `commands` folder where you can find all feature functionality functions, for example the login template rendering which looks like this:

```javascript
function loadPage(req, res) {
  debug('login:loadPage', req, res);
  res.render('vpages/login');
}
```
- A `constants.js` file, to store all your static variables, for eg:

```
const USERNAME_PASSWORD_COMBINATION_ERROR = 'These credentials do not match our records.';
const INTERNAL_SERVER_ERROR = 'Something went wrong! Please try again.';
```

All feature routes are mounted in `routes/index.js` from the project root.

## For the Front-end side:

##### Templates

- You can find all the templates in `views` folder where you will find:
1. The `layout.ejs` file, the main template layout.
2. A `pages` folder with all the page templates
3. A `partials` folder with the common components (header, footer, sidebar)

## Deploy on prod
https://www.freecodecamp.org/news/you-should-never-ever-run-directly-against-node-js-in-production-maybe-7fdfaed51ec6/
https://medium.com/wultra-blog/achieving-high-performance-with-postgresql-and-redis-deddb7012b16

## Enhancement
appy is a full featured boilerplate web app designed as an end to end solution for mvp development. The frontend is built on Vue.js and utilizes the AdminLTE UI template. The backend implements a hapi server (via rest-hapi) with a MongoDB datastore.
