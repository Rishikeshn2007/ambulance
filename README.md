# Ambulance Nearest Dispatch API

A small Node.js + Express service that finds the nearest ambulance point (from a fixed in-code list) to a user location.

The service compares travel duration and distance using the public [OSRM routing API](https://router.project-osrm.org).

## Features

- `GET /callambulance` endpoint
- Input validation for latitude/longitude query params
- Computes route distance and travel time from user location to each point
- Returns the nearest point by **minimum travel time**

## Tech Stack

- Node.js (CommonJS)
- Express 5
- Nodemon (dev run)
- OSRM public routing service

## Project Structure

```text
.
├── app.js                 # Express server + API route
├── algorithem/
│   └── search.js          # Routing calls + nearest-point selection logic
├── package.json
└── README.md
```

## Prerequisites

- Node.js 18+ (or newer)
- Internet access (required for calls to `router.project-osrm.org`)

## Installation

```bash
npm install
```

## Run

```bash
npm start
```

Server runs on:

```text
http://127.0.0.1:3000
```

## API

### `GET /callambulance`

Find the nearest ambulance point for a given location.

#### Query Parameters

- `lat` (required): latitude, number between `-90` and `90`
- `lon` (required): longitude, number between `-180` and `180`

#### Example Request

```bash
curl "http://127.0.0.1:3000/callambulance?lat=14.47526&lon=75.88586"
```

#### Success Response (200)

```json
{
  "Time": 0.25,
  "Distance": 12.4,
  "details": {
    "name": "Point C",
    "lan": 14.48501,
    "lon": 75.90384,
    "addess": "ABC markets, 1st cross, Mangalore",
    "contact": 1234567890
  }
}
```

- `Time` is in **hours**
- `Distance` is in **kilometers**

#### Error Responses

- `400` if `lat`/`lon` are missing
- `400` if `lat`/`lon` are invalid numbers
- `400` if values are out of range
- `500` if routing lookup fails

## Notes

- Ambulance points are hardcoded in `algorithem/search.js`.
- Selection is based on shortest travel duration returned by OSRM.
- Field names in current code use `lan` and `addess` (typos preserved from source data).
- `npm start` uses `nodemon`; for production, run with `node app.js` or use a process manager.

## Future Improvements

- Move points data to a database
- Add unit/integration tests
- Add caching and retry logic for external routing calls
- Add production-ready scripts and environment-based configuration
