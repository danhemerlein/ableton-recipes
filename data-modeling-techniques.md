1. embedding

adding data directly to a document
/ posts
title [string]: My Post
tags [array]:
  [0] [map] {
    name [string]: cool
    url [string]: /tags/cool
  }

2. Root Collection

give each tag its own document and reference ID in a post document

/tags
document ID: cool
    name [string]: cool
    url [string]: /tags/cool

tags are many to many relationship - a post has many tags and a tag has many posts

with a root collection we maintain the relationship - reference the tag IDs on the post document - using an array

3. Subcollection

/posts/[postID]/tags

no need for an array of tag IDs like with the root collection

4. Bucketing

have collections posts and tags that have doucments with the same ID - you could display all the data with just two document reads

SECURITY

match /acounts/{id} {
  // can't be read or written to from a client app

  allow read, write: if false;
}

match /users/{id} {
  // user data that's created by the user
  // email, phone number, etc

  allow read, write: if id == request.auth.uid;
}

match /profiles/{id} {
  // can be read publically but only written to be the profile that created it

  allow read;
  allow write: if id == request.auth.uid
}


