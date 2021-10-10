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

The DB for content API uses the following schema:


