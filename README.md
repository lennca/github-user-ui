# github-user-ui

An alternative GitHub user search UI built with React/TypeScript and Tailwind. (Demo only)

# Getting Started

## Prerequisites

Ensure that you have the following installed:

* Node.js v16.13.2
* npm v8.1.2
* Docker v20.10.3 (if want to containerize application)

### Clone and install

```bash
git clone git@github.com:lennca/github-user-ui.git
cd github-user-ui
npm install
```

## Demo Development (no access token needed - limited requests)

### Environment variables setup

Create a `.env` file in the root of the project, and add variables needed. Set `DEMO` variable to 'true' to run without access token.

```bash
REACT_APP_DEMO=true
REACT_APP_BASE_URL=https://api.github.com
```

Start the application.

```bash
npm start
```

🔔 Please note: GitHub has API requests rate limits (read more [here](https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting))

## Local Development (access token needed - 'unlimited' requests)

Generate and copy your personal access token from your GitHub account.

[Personal access token](https://github.com/settings/tokens)

### Environment variables setup

Create a `.env` file in the root of the project, and add variables needed. Ignore the `DEMO` variable or set it to false to run with your personal access token.

```bash
REACT_APP_DEMO=false
REACT_APP_ACCESS_TOKEN=xxxx
REACT_APP_BASE_URL=https://api.github.com
```

Start the application.

```bash
npm start
```

## Run app as a container

To run app in a container, set environment as defined above (Demo/Local). Then run docker start script.

```bash
sh ./docker_start.sh
```


## Production build

To build the app for production.

```bash
npm run build
```

The files can be found in the `build` folder.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


🔔 OBS:  The application should only be used for local deployment due to the risk of exposing your personal access token!

# Good articles worth reading

* [Different ways to handle HTTP requests inside a React Application](https://javascript.plainenglish.io/different-ways-to-handle-http-request-inside-react-application-dcd580bbe5a4)
* [Async Await try-catch hell](https://www.linkedin.com/pulse/async-await-try-catch-hell-prasath-ravichandran)
* https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting