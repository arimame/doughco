# Dough Co. -  Food Pick-up Ordering App

## About

Dough Co. is a food ordering app for a fictitious doughnut shop with two locations. Users can visit the website, select one or more doughnuts from the available menu, and place an order for pick-up. 

When an order is placed, the doughnut shop receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client, and also notifies them via SMS.

This app uses Twilio to implement SMS communication from the website to both the client and restaurant.

## Final Project

#### Screenshot of the homepage

!["Screenshot of homepage"](https://github.com/Ianden/doughco/blob/master/public/images/ScreenShot-Homepage.png)

#### Screenshot of the menu for a specific location

!["Screenshot of menu"](https://github.com/Ianden/doughco/blob/master/public/images/ScreenShot-Menupage.png)

### Screenshot of the checkout page

!["Screenshot of checkout"](https://github.com/Ianden/doughco/blob/master/public/images/ScreenShot-Checkoutpage.png)

## Features

- users may select their preferred location on the homepage, and are then redirected to a menu page which displays the doughnuts available at that specific location (achieved using SQL databases and templating)
- a user may add one or multiple of a specific doughnut to their cart, or remove doughnuts from their cart, which is updated automatically (using cookies and AJAX)
- when the user is done selecting their order, they are redirected to a checkout page, which uses the GoogleMaps API to display to precise pickup location of their order, and provides the user with the options to provide their phone number to receive a confirmation text and method of payment (these fields are prepopulated when the user is logged in with an updated account)
- after confirming their order, the user is redirected to an order processing page and a text is sent to the location owner with the order, using the Twilio API; the owner then replies to the text with the amount of time needed to complete the order, which is sent to the user via a text, and the user's webpage is automatically redirected to an order confirmation page
- users may 'log in' and update their account settings, including their 'payment' and contact information, which is stored using SQL databases (login system is for conceptual purposes, still need to add a registration process)

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
- pg
- sass
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
