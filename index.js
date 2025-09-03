import { DB } from "./connect.js";

import express, { json } from "express";
import bodyParser from "body-parser";
import router from "./view/routes.js";
import categories from "./view/categories.js";
import product from "./view/product.js";
import sizes from "./view/sizes.js";
import tags from "./view/tags.js";
import vendor from "./view/vendor.js";
import productSizes from "./view/productSizes.js";
import productCategories from "./view/productCategories.js";
// import fetchData from "./controller/scraper.js";
// import fetchDataa from "./controller/puppeteerScrapper.js";
// import fetchDataa from "./controller/temp.js";
import { fetchDataa } from "./controller/newtemp.js";
import brand from "./view/brand.js";
import productBrand from "./view/productBrand.js";
import { baseUrls } from "./baseUrls.js";
import fs from 'fs';
import cors from 'cors';
// const PORT = process.env.PORT || 5000;
const PORT = 80; // Force port 80 for production behind Cloudflare




// // List of possible Chromium paths
// const chromiumPaths = ["/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/lib/chromium/chrome"];

// // Function to find the first existing Chromium path
// const getChromiumPath = () => {
//     for (const path of chromiumPaths) {
//         if (fs.existsSync(path)) {
//             console.log(`✅ Chromium found at: ${path}`);
//             return path;
//         }
//     }
//     console.error("❌ Chromium NOT found. Puppeteer may not work!");
//     return null;
// };

// // Log the detected Chromium path
// console.log("🔍 Checking for Chromium...");
// // const chromiumPath = process.env.PUPPETEER_EXECUTABLE_PATH || getChromiumPath()
// const chromiumPath =  getChromiumPath()
// console.log(`Path Found ${chromiumPath}`);





const app = express()
app.use(express.json());// for parsing application/json
// Enable CORS for all routes
app.use(cors({
    // origin: 'http://localhost:5173', // Allow requests from this origin
    // origin: ['http://localhost:5173', 'https://your-frontend-domain.com'], // Allow specific origins
    // credentials: true, // Allow credentials (cookies, authorization headers)

    origin: '*', // Allow requests from all origin
    credentials: false,// Allow credentials (cookies, authorization headers)

    methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
}));
app.options('*', cors()); // Handle preflight requests for all routes

app.get('/', async (req, res) => {
    console.log("working");

    res.set('content-type', 'application/json');
    res.status(200).json({ status: 200, server: "Runnnig" });

});

app.use(router)
app.use('/category', categories)
app.use('/product', product)
app.use('/size', sizes)
app.use('/tag', tags)
app.use('/vendor', vendor)
app.use('/productsize', productSizes)
app.use('/productcategories', productCategories)
app.use('/brand', brand)
app.use('/productbrand', productBrand)

app.get('/devproductupdates', (req, res) => {
    res.set('content-type', 'application/json');
    // Get the current timestamp
const timestamp = Date.now();

// Convert the timestamp to a Date object
const date = new Date(timestamp);

// Format the date and time with time zone
const options = {
  weekday: 'short', // "Fri"
  year: 'numeric', // "2017"
  month: 'short', // "Nov"
  day: 'numeric', // "17"
  hour: '2-digit', // "19"
  minute: '2-digit', // "15"
  second: '2-digit', // "15"
  timeZone: 'Asia/Kolkata', // Time zone for Kolkata
  timeZoneName: 'longOffset', // "GMT+05:30"
};

// Format the date and time
const formattedDate = date.toLocaleString('en-IN', options);
    try {
        fetchDataa(baseUrls);
        res.status(200).json({ status: 200, message: `Scrapping started at: ${formattedDate}`  });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }

})


app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server is running on port ${PORT}`);

})

