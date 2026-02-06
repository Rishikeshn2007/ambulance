# ambulance

#Nearest Ambulance Finder API

A Node.js + Express REST API that finds the nearest ambulance point based on real road travel time, using the OSRM routing service.

This API accepts latitude and longitude as input and returns the closest ambulance location with estimated distance and travel time.

#Features

REST API built with Node.js & Express

Uses real road routes, not straight-line distance

Finds nearest ambulance by travel time

Returns:

Nearest ambulance details

Estimated distance (km)

Estimated travel time (hours)

JSON request & response format

#How It Works

Client sends latitude & longitude to the API

Server calculates routes from user location to all ambulance points using OSRM

Compares travel durations

Returns the fastest reachable ambulance

#Tech Stack

Node.js

Express.js

OSRM (Open Source Routing Machine)

JavaScript (ES6)