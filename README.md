# Frontend test
[Demo site](https://frontend-test-southparkstan123.herokuapp.com/)

## Overview
The SPA for fetching the free apps and recommended apps in iOS with searching feature.

## Skill Set

1. React-Hooks
2. Redux
3. Jest + Enzyme for unit test
4. SASS
5. Flow for static type checker

## Setup the app

1. Clone the git repo
2. Run `yarn install` to install the dependencies for the app

### Start-up the app in development mode

1. Create file `.env.local` for adding the environment values
2. Run `yarn dev`
3. Open http://localhost:3000 in web browser

### Start-up the app in production mode

1. Create file `.env.production` for adding the environment values
2. Run `yarn build` and `serve -s build`
3. Open http://localhost:5000 in web browser

### Unit Test

1. Create file `.env.test` for adding the environment values
2. Run `yarn test`

### Fix lint problems

Run `yarn lint:fix` 

### Flow type checking

Run `yarn flow`

Enjoy :)