# React medical App

## Description

This project uses react and rest API to create a medical app that allows users to be authenticated and have access patient records, search for patients, view patient details, view patient details, visits and vital signs.

## Installation

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Run `npm start` to start the development server
   - prefrable to use `HTTPS=true&&npm start` to run the server on https
4. check the server is running on `https://localhost:3000`

### Deployment

This app is deployed on github using github pages

### Challenges, solutions and  learnings

1. At first I was using <https://rest.openmrs.org/#openmrs-rest-api> as the rest API but I was having issues with CORS. I then switched to <https://demo.openmrs.org/openmrs/ws/rest/v1/> and it did not works as well. I then switched to <https://kibana.ampath.or.ke/> and it worked. I was using the wrong domain.

2. All the domain used above were giving me issues with CORS. I then used a chrome extension to bypass CORS and it worked but not always so i decided to use a proxy server on package.json to bypass CORS.

3. Vital endpoint was not working in the beginning and i had to try several times and later realised that i was not passing the correct parameters to the endpoint.

4. The biggest issue was the authentication. I was not able to authenticate the user. I tried several times and i was not able to authenticate the user. I then check the documentation and realised that session endpoint was like a log in endpoint and doesnt require authentication. I then used the session endpoint to authenticate the user and get back the session token. I then used the session token to authenticate the user on the other endpoints.