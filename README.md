
# ALL Threads API  
Welcome to the ALL Threads API, a Node.js-based RESTful API for managing user profiles and posts. This API allows users to create accounts, follow each other, and create, view, and interact with posts. The API is hosted at nodejsthreads.onrender.com.

 ## Table of Contents
 **User API**
- *Profile*
- *Signup*
- *Login*
- *Logout*
- *Follow*
- *Update Profile*

**POST API** 
 - *Feed*
- *Get Post*
- *Create Post*
- *Delete Post*
- *Like Post*
- *Reply to Post*
## Author

- **Abhishek**: As the sole developer, Abhishek conceptualized and implemented this application, leveraging his expertise in web development and user experience design.
  


## Technologies Used
- **Node.js:** JavaScript runtime environment for building scalable network applications.
- **Express.js:** Web application framework for Node.js, providing a robust set of features for web and mobile applications.
- **MongoDB:** NoSQL database for storing user and post data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Cloudinary:** Cloud-based media management platform

## Development Tools 
- **Nodemon:** Tool for automatically restarting the Node.js - - application when file changes in the directory are detected.
- **Postman:** Platform for API development, testing, and collaboration.
- **VS Code:** Code editor for development

# Getting Started

- To run this application locally, follow these steps:

## 1. Clone the Repository
- git clone https://github.com/yourusername/threads-api.git

## 2.cd threads-api
- cd threads-api


## 3. Install dependencies
- npm install

## API Endpoints ##
- **User API**

- **Profile**
- **Endpoint:** GET /api/v1/user/profile/:username
- **Description:** Retrieve user profile information.
- **Example:** https://nodejsthreads.onrender.com/api/v1/user/profile/username

- **Signup:**
- **Endpoint:** POST /api/v1/user/signup
- **Description:** Create a new user account.
- **Example:** https://nodejsthreads.onrender.com/api/v1/user/signup

- **Login**
- **Endpoint:** POST /api/v1/user/login
- **Description:** Authenticate a user.
- **Example:** https://nodejsthreads.onrender.com/api/v1/user/profile/login

- **Logout:**
- **Endpoint:** POST /api/v1/user/logout
- **Description:** Log out the current user.
- **Example:** https://nodejsthreads.onrender.com/api/v1/user/logout

- **Follow:**
- **Endpoint:** POST /api/v1/user/follow/:id
- **Description:** Follow another user.
- **Example:** https://nodejsthreads.onrender.com/api/v1/user/follow/id

- **Update Profile:**
- **Endpoint:** PUT /api/v1/user/update/:userid
- **Description:** Update user profile information.
- **Example:** https://nodejsthreads.onrender.com/api/v1/user/update/id


- **Post API**
- **Feed**
- **Endpoint:** GET /api/v1/post/feed
- **Description:** Retrieve a feed of posts.
- **Example:** https://nodejsthreads.onrender.com/api/v1/post/feed

- **Get Post**
- **Endpoint:** GET /api/v1/post/getpost/:postId
- **Description:** Retrieve a specific post by its ID.
- **Example:** https://nodejsthreads.onrender.com/api/v1/post/getpost/postId

- **Create Post**
- **Endpoint:** POST /api/v1/post/create
- **Description:** Create a new post.
- **Example:**https://nodejsthreads.onrender.com/api/v1/post/create

- **Delete Post**
- **Endpoint:** DELETE /api/v1/post/delete/:userid
- **Description:** Delete a post by user ID.
- **Example:** https://nodejsthreads.onrender.com/api/v1/post/delete/userid

- **Like Post**
- **Endpoint:** POST /api/v1/post/like/:userid
- **Description:** Like a post.
- **Example URL:** https://nodejsthreads.onrender.com/api/v1/post/like/userid

- **Reply to Post**
- **Endpoint:** POST /api/v1/post/reply/:userid
- **Description:** Reply to Post.
- **Example URL:** https://nodejsthreads.onrender.com/api/v1/post/reply/userid


## Gratitude
We sincerely thank you for exploring Threads Application. We hope it serves you well in crafting the perfect resume and advancing your career journey.




