# Barnes and Undignified Reviews

> Reviews microservice for a bookseller's website designed using service oriented architecture. Front-end is created using React components. Reviews are stored in mongoDB, and can be upvoted and downvoted, as well as sorted based on various parameters.

## Related Projects

  - https://github.com/Sweet-Treat/barnesandundignifiedItemSelection
  - https://github.com/Sweet-Treat/barnesandundignifiedAlsoBought
  - https://github.com/Sweet-Treat/barnesandundignifiedProductAndAuthor
  - https://github.com/Sweet-Treat/barnesandundignifiedreviewsproxy

## Usage
From root directory:
### Run npm install
```
npm install
```
### MongoDB Database Setup
Edit /database/index.js line 3 to have your MongoDB username, password, and ip address
```
npm run db:setup
```
This will seed a database called barnesandundignified with 100 mock reviews data.

### Build Bundle Using Webpack
Run the following to generate the bundle.js file
```
npm run build
```

### Starting server
Run the following to initiate the server
```
npm run start
```
and point your browser to **localhost:8000**

> Use url params to specify an ISBN number for a specific book to load review module for that book. Dropdown menu can be used to sort reviews by different metrics, and the arrows at the bottom can be used to traverse the reviews if there are more that the 8 review maximum that can be displayed on one page.
