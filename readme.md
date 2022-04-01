This is a simple, but effective template for iterating over the "products" on the backend.
To test it you need: 
-download the package
-grab your mongodb atlas connection string 
-replace process.env.MONGO_URI with your connection string/ create your own .env file with MONGO_URI variable, that contains connection string
-run npm install
-run node populate.js (this will upload products.json file to the database)
-run node app.js (or you could install nodemon)
-play around 

The goal of this project was to create API that is capable of sorting and filtering products with different filters, parametrs or choose certain fields, that a user would like to grab. 

Tech used: 

-Node.js
-Express.js
-JS
-RegEx
-MongoDB
-Mongoose

Extra packages: 

-Nodemon
-http-status-codes
-dotenv
-express-async-errors
