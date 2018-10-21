# Dough Co. -  Food Pick-up Ordering App

## About

Dough Co. is a food ordering app for a fictitious donut shop with two locations. Users can visit the website, select one or more donuts from a location, and place an order for pick-up. 

When an order is placed the donut shop receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client, and also notifies them via SMS.

This app uses Twilio to implement SMS communication from the website to both the client and restaurant.

## Final Project
!["Screenshot of homepage"](https://github.com/Ianden/doughco/blob/master/public/images/ScreenShot-Homepage.png)
!["Screenshot of menu"](https://github.com/Ianden/doughco/blob/master/public/images/ScreenShot-Menupage.png)
!["Screenshot of checkout"](https://github.com/Ianden/doughco/blob/master/public/images/ScreenShot-Checkoutpage.png)

## Dependencies

- node
- npm
- bcrypt
- body-parser
- cookie-parser
- cookie-session
- dotenv
- ejs
- express
- knex
- knex-logger
- morgan
- node-sass-middleware
- sass
- pg
- sse-express
- twilio

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`
