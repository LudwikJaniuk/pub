![Public Underrättelse Board banner](pub.png)

# PUB
Public Underrättelse Board - Where you go to get your news 

# API

## `GET /api/`
response: `{posts: [Post]}`


## `GET /api/post/:id`
response: `{post: Post}`
If 'id' does not correspond to any post, a 404 status instead.


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
