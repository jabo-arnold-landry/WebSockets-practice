const { post } = require("../authantication");

class AccountCreation {
  constructor(id, names, email) {
    this.id = id;
    this.names = names;
    this.email = email;
    this.postCreated = [];
    this.postCommented = [];
  }
}

class Idea {
  constructor(postID, postOwnerID, postContents) {
    this.postID = postID;
    this.postOwner = postOwnerID;
    this.postContents = postContents;
    this.comments = [];
  }
}

const users = [
  {
    id: "7c30335f-b5eb-4975-92d6-7f477db6835e",
    names: "arnold",
    email: "arnoldjabo@gmail.com",
    postCreated: [],
    postCommented: [],
  },
];
module.exports = { AccountCreation, Idea, users };
