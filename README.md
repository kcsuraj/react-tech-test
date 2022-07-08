# Australia Address Validator

Create an online form using React that accepts a postcode, suburb and state. When the user submits the form, it should check the inputs with the Australia Post API to validate that it is a valid address.

## Pre-requisites

The software has been tested with

- nodejs v16.15.0

## Installing

- Clone the repository

```
git clone https://github.com/kcsuraj/react-tech-test.git <project_name>
```

- Install dependencies

```
cd <project_name>
npm install
```

## Configuration

Create a copy of `.env.sample` as`.env`file with following environment variables

- AUS_POST_API_URL: auspost base URL
- AUS_POST_API_KEY: Auth key for auspost api
- REACT_APP_API_URL: Backend api url. Default is http://localhost:8000

## Development

| Npm Script | Description                                                       |
| ---------- | ----------------------------------------------------------------- |
| `start`    | Run app in development mode and with auto reload onf file changes |
| `build`    | Build files for production mode                                   |
| `serve`    | Start node server in default port 8000                            |
| `test`     | Run test cases                                                    |
| `format`   | Format files using prettier                             |
