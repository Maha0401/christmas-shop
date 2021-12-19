# ChristmasShop
***Christmas Purchase made easy***

ChristmasShop was made using create-react-app, react-router, chart.js and SASS for the front end, a Node/Express backend API with JWT for auth, and Knex to query a MySQL database. At least for now. We'll see how things change as I continue to build on it.

Functionalities:
 1. Responsive design for shop pages
 2. Search products based on category
 3. Search by textbox
 4. Sort by price
 5. Filter by color
 6. buy using buyButton 
 7. Admin login
 8. Order fullfillment
 9. Available Stocks display
 10. Graphs that displays comparitive sales data on monthly basis for each product

Thanks for stopping by. 🎅🎄❄🎁

—Maha (2021-12-19)


# Installation

Follow these steps to run a local instance of ChristmasShop:  
(You'll need node, npm, and MySQL already installed.)

1. Clone or download this repo.
#### Set up the backend
2. Create a new database in MySQL called `christmas`.
3. Install server dependencies:  
   
   Run `npm install` from inside the server directory.
   ```bash    
   $ cd server
   $ npm install
   ```
4. Run migrations
   ```bash
   $ npx knex migrate:latest
   ```
5. Run seeds
   ```bash
   $ npx knex seed:run
   ```
6. Set environment variables:  
   
   Rename `.env_sample` to `.env` and change placeholder values with your own.
   ```shell
   PORT=8080
   JWT_SECRET=<SECRET KEY>
   DB_HOST=<HOST ADDRESS>
   DB_USER=<YOUR DB USERNAME>
   DB_PSWD=<YOUR DB PASSWORD>
   ```
 
7. Start the server:
   ```bash
   $ npx nodemon server.js
   ```
#### Set up the frontend
8. Install client dependencies:  
   
   Run `npm install` from inside the client directory.
   ```bash    
   $ cd ../client
   $ npm install
   ```
9. Start the React app:
    ```bash
    $ npm start
    ```
10. For admin login (Seeded data)
    username:maha
    password:maha