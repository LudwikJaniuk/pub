![Public Underrättelse Board banner](pub.png)

# PUB
Public Underrättelse Board - Where you go to get your news 

# API

## `GET /api/`
Get all posts.

response: `{posts: [Post]}`


## `GET /api/post/:id`
Get one specific post by ID.

response: `{post: Post}`

If 'id' does not correspond to any post, a 404 status instead.

## `POST /api/post/`
Create a new post and return the id of the newly created post

body: 
```javascript
{
 title, // String
 content, // String
 author, // String
 tags, // [String]
}
```

response: `{id}`

## Definitions
```
Post := {
 title, // String
 content, // String
 author, // String
 post-date, // Date
 tags, // [String]
 id, // String
}
```
