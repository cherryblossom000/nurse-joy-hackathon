# STEM Week Hackathon

## Local Development

### Setup

- Node.js v16
- pnpm v6

`.env`:

```sh
DATABASE_URL=mongodb://localhost:27017
DATABASE_NAME=db-name
USERNAME=some-username
PASSWORD=some-password
```

```sh
pnpm install
pnpm init-db
```

## Building

```sh
pnpm build
# do these in different terminal sessions if you want because they both log stuff
pnpm start-db & pnpm start
```

## Preview with HMR

```sh
pnpm watch & pnpm start-db & pnpm dev
```

Alternatively just use the VSCode watch tasks.

## Repl.it

Use the [replit](https://github.com/cherryblossom000/nurse-joy-hackathon/tree/replit)
branch.

This branch *should* work for Node.js v12...

`.env`:

```sh
DATABASE_URL=mongodb://some-actual-mongodb-url
DATABASE_NAME=db-name
DATABASE_USERNAME=database-username
DATABASE_PASSWORD=database-password
USERNAME=some-username
PASSWORD=some-password
```

```sh
# Don't set NODE_ENV=production when doing yarn install!
yarn install
yarn build
NODE_ENV=production yarn start
```
