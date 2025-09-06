# Airbnb Clone 

Hey! This is my **Airbnb Clone** project. It's a web app where you can create listings, leave reviews, and check out different properties, just like Airbnb. Built using **Node.js, Express, MongoDB, and EJS**.  

## Features 

- Users can **sign up, log in, and log out** 
- Create, edit, and delete **property listings** 
- Upload property images using **Cloudinary** 
- Leave **reviews** on listings 
- Interactive **maps** with MapTiler 
- Works on **desktop and mobile** 

## Tech Stack 

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Auth:** Passport.js, express-session
- **Frontend:** EJS, HTML, CSS, JS
- **Images:** Cloudinary
- **Maps:** MapTiler API

## How to Run 

### Requirements

- Node.js
- MongoDB Atlas or local MongoDB
- Cloudinary account (for images)
- MapTiler API key (for maps)

### Steps

1. Clone the repo:
git clone https://github.com/harsha-9977/airbnb-clone.git
cd airbnb-clone
Install dependencies:

npm install
Create a .env file in the root:

.env
ATLASDB_URL=your_mongoDB_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAP_TOKEN=your_maptiler_api_key
SECRET=your_session_secret

npm start
http://localhost:8050

Live Demo 
Check it out here: Airbnb Clone
https://airbnb-clone-by-harsha.onrender.com
*Note: The live site is currently experiencing issues (502 Gateway error). I'm working on fixing it ASAP!*

Contributing 
Feel free to fork it or use it for learning. Any suggestions or improvements are welcome!

Author 
Harsha A P
GitHub https://github.com/harsha-9977 | LinkedIn https://www.linkedin.com/in/harsha1625/


