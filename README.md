![Public Underrättelse Board banner](pub.png)

# PUB
Public Underrättelse Board - Where you go to get your news 

# API

`GET /api/`
response: `{posts: [Post]}`

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

