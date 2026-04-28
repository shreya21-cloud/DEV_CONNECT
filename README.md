Developer Blog Platform
A full-stack web application for writing, publishing, and managing technical blogs.

Features


Create, edit, delete blog posts


User authentication (JWT)


Like and comment system


Search functionality


Responsive UI



Tech Stack


Frontend: React.js


Backend: Node.js, Express.js


Database: MongoDB



Project Structure
developer-blog/├── backend/│   ├── controllers/│   ├── models/│   ├── routes/│   └── config/│├── frontend/│   ├── components/│   ├── pages/│   └── assets/│├── .env├── .gitignore└── README.md


Environment Variables
Create a .env file:
PORT=5000MONGO_URI=your_mongodb_uriJWT_SECRET=your_secret_key

Run the Application
# start backendnpm run server# start frontendnpm start

API Endpoints (Sample)
MethodEndpointDescriptionPOST/api/authRegister/LoginGET/api/blogsGet all blogsPOST/api/blogsCreate blogPUT/api/blogs/:idUpdate blogDELETE/api/blogs/:idDelete blog

Future Improvements


Tags & categories


Bookmark feature


Pagination


Deployment



License
MIT License
