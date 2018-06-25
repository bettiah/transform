# Transform

Transform is a matrix homeserver built using Typescript and Redis. It is not fully functional yet.

# Design

A lot of the code is auto-generated from the excellent swagger specs for the client-server api.

Redis streams (currently available in 5.0 rc) are used to store the room timelines. Sqlite (or Postrgres) is used to store relational data.

# Contributing

It is early days yet. However, Typescript has enabled safe & rapid progress. Redis streams too seem to have a very well thought out api and the whole thing has been a fun experience so far.

Contributions are very welcome.

Api endpoints can be found within `client-server/` folder. It should be possible to pick an endpoint and work on in until it works to your satisafaction in a client of choice. Please file an issue if you choose an andpoint to work on.

In addition to the server endpoints, a REST api consumer is also available in `client-sever/cli.ts`.

## Getting started

- I use the latest node 10, but 8.0+ outght to work

- Redis 5.0 rc needs to be runnning: `brew install redis --HEAD`

- Clone & `yarn` to install dependencies

- `cp dot_env .env`

- `yarn dev` to start the server

- Riot ui can be used to interact with the server. I have found it easiest to use a release tarball from `https://github.com/vector-im/riot-web/releases` and run it using `serve -l tcp://127.0.0.1:1233` or equivalnt mechanism.
