# Node-Microservice-Docker

This is an example of a Node based Microservivce which uses MongoDB running on Docker. The service consists of 3 APIs:

<ul>
    <li>Content API: This API is responsible for storing story content such as title, story, user likes, read count etc</li>
    <li>User API: This API is responsible for storing user related information</li>
    <li>User Interaction API: This API is responsible for user interaction such as read events, like events</li>
</ul>

## Content API
Content API keeps track of the following things:

<ul>
    <li>Story Title</li>
    <li>Story Content</li>
    <li>Story ID: Unique Key to identify a story in DB</li>
    <li>Read Count</li>
    <li>User IDs of users who liked the story</li>
    <li>User IDs of users who read the story</li>
    <li>Date Created</li>
    <li>Date Updated</li>
</ul>

### API DB Schema

The DB for the content API uses the following schema:

`title`: _String_ _Not Null_ Title of the story

`content`: _String Not Null_ story content

`contentID`: String Unique Not Null Unique ID to identify a story

`likeduser`: _String []_ An array which stores User IDs who have liked the story.

`readUser`:  _String []_ An array which stores User IDs who have read the story.

`readCount` _Number_ Keeps track of Story views

`createdAt` _Date_, a Mongoose internal field which stores the date when an entry was created

`updatedAt` _Date_, a Mongoose internal field which stores the date when an entry was updated

The DB also has a compound index which ensures for every story there's a unique `userID` stored in `likedUser`, `readUser`.

### API Routes

The API consists of the following routes

`/get`: Fetches all stories stored in DB (GET Request)

`/get/:contentID`: Fetches a particular story matching contentID given in the URL or a 404 if no story is found. (GET Request)

`/create`: Expects a JSON request body consisting of `title`, `content`, `contentID`. Creates a story based on the JSON Requst body (POST REQUEST)

`/delete`: Expects a JSON request body consisting of `contentID`. Deletes a story with matching `contentID`. (DELETE REQUEST)

`/update/title/:contentID`: Expects a JSON request body consisting of `title`. Updates the story title of the `contentID` given in the url. (PUT REQUEST)

`/update/content/:contentID`: Expects a JSON request body consisting of `content`. Updates the story content of the `contentID` given in the url. (PUT REQUEST)

### API Usage

The entry point of the API is `http://localhost:3000/` if running the container on local service. 
e.g.

`POST http://localhost:3000/content/create` with the response body
```
{
	"title":"My First Story",
	"content":"My first Story",
	"contentID":"story1"
}
```
creates a story and returns the response object consisting of the story created e.g.

```
{
  "likedUser": [],
  "readUser": [],
  "readCount": 0,
  "_id": "61632a975efe30005c418fe9",
  "title": "My first Story",
  "content": "My first Story",
  "contentID": "story1",
  "__v": 0
}
```

## User API 

The DB for the User API uses the following schema:

`firstName`: _String_ _Not Null_ 

`lastName`: _String Not Null_ 

`email`: _String Not Null Unique_ 

`phoneNumber`: _String_ 

`contentID`: String Unique Not Null Unique ID to identify a story.

`likeduser`: _String []_ An array which stores User IDs who have liked the story.

`likedStory`:  _String []_ An array which stores content IDs for stories which the user has liked.

`createdAt` _Date_, a Mongoose internal field which stores the date when an entry was created.

`updatedAt` _Date_, a Mongoose internal field which stores the date when an entry was updated.

The DB also consists of a compound index which ensures for every user there's a unique `contentID` in the `likedStory` array.

### API Routes

The API consists of the following routes

`/get`: Fetches all Users stored in DB (GET Request)

`/get/:userID`: Fetches a particular story matching `userID` given in the URL or a 404 if no user is found. (GET Request)

`/create`: Expects a JSON request body consisting of `firstName`, `lastName`, `email`, `userID`, `phoneNumber`(Optional). Creates a user based on the JSON Requst body (POST REQUEST)

`/delete`: Expects a JSON request body consisting of `userID`. Deletes a story with matching `userID`. (DELETE REQUEST)

`/update-name`: Expects a JSON request body consisting of `firstName`, `lastName`. Updates the user name of the `userId` given in the request body. (PUT REQUEST)

`/update-number`: Expects a JSON request body consisting of `phoneNumber`. Updates the phone number of the `contentID` given in the url. (PUT REQUEST)

### API Usage

The entry point for this API is `http://localhost:3001/` example usage:

```
POST http://localhost:3001/user/create

{
	"firstName":"Hello",
	"lastName":"World",
	"email":"Hello@gmail.com",
	"userID":"user1"
}
```
which return a response consisting of the user created. e.g.
```
{
  "likedStory": [],
  "_id": "61635ad531c735005de0df9c",
  "firstName": "Hello",
  "lastName": "World",
  "email": "Hello@gmail.com",
  "userID": "user1",
  "createdAt": "2021-10-10T21:27:49.531Z",
  "updatedAt": "2021-10-10T21:27:49.531Z",
  "__v": 0
}
```

## Interaction API

The APi handles the interaction between the User and the Content.

it consists of the following routes:

`/read` : Internal route, gets called when a story is fetched based on the request body if an `userID` is found, it will push into the `readUser` array of the story, the `userID` and increment `readCount`. Otherwise just increments the `readCount`.

`/like`: expects a request body consisting of `userID` and 'contentID`. it pushes into the `likedStory` array of the user the `contentID` and in the `likedUser` array of the story the `userID`.



