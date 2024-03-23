# Band Database with MongoDB and Express

This repository contains modules for managing a band database using MongoDB and Express.js. 
The repo is structured to separate concerns into different modules and utilizes async/await for asynchronous code execution.

It includes modules for database connection, collection definitions, data manipulation functions, and an Express.js server for API endpoints.

## Installation

Ensure that Node.js is installed on your machine, and then install the required packages using npm:

`npm install mongodb express`
# bands.js Module

The `bands.js` module provides functions for creating, retrieving, updating, and removing bands from the database. Here are the methods available:

- **create:** Creates a new band in the database.
- **getAll:** Retrieves all bands from the database.
- **get:** Retrieves a band by its ID from the database.
- **remove:** Removes a band from the database.
- **rename:** Renames a band in the database.

Each method includes validation for input parameters and ensures data integrity within the database.
# app.js Usage
The `app.js` file contains an Express.js server with API endpoints to interact with the band database. It demonstrates how to use the functions provided in the bands.js module to handle HTTP requests.
