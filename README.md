# Setup
To start the application in devmode, simply run:

`$ make`

## Development

Other scripts available:

- `$ make gen`
- - `$ make sqlgen`
- - - prerequisites: [sqlc](https://docs.sqlc.dev/en/latest/overview/install.html)
- - `$ make oaigen`
- - - prerequisites: running `npm install`
- `$ make ui`
- - prerequisites: cd frontend/ and run `npm install`
- `$ make server`, prerequisites: `docker`
- `$ make stop`, stops all containers/services.