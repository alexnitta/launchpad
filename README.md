# Launchpad

## A starter kit to help you build a web app

### Technologies:
* React / Webpack (from [create-react-app](https://github.com/facebookincubator/create-react-app))
* [React-Bootstrap](http://react-bootstrap.github.io/)
* Express, driven by Swagger (from [swagger-node](https://github.com/swagger-api/swagger-node/))

### Setup:
* Package & Server Setup
  * The app is set up as two separate NPM packages, one in `client` and one in `server`. To install dependencies, run `npm install` in both the `server` folder and the `client` folder.
  * To run the app locally, `cd` to the `server` folder and do `npm run dev`. This will start a local app server on http://localhost:3000 and an API server on http://localhost:3001.
  * To hit the API server, make a request on the web server and the web server will proxy the request to the API server.
  * This setup was modified from [here](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) with the main difference being that Launchpad stores the server files in a separate `server` directory, rather than the root folder.
* File Management
  * `%PUBLIC_URL%` is replaced with the URL of the `public` folder during the build. Only files inside the `public` folder can be referenced from the HTML. Unlike `/favicon.ico` or `favicon.ico`, `%PUBLIC_URL%/favicon.ico` will work correctly both with client-side routing and a non-root public URL.
