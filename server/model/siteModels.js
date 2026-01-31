class AccountCreation {
  constructor(id, names, email) {
    this.id = id;
    this.names = names;
    this.email = email;
    this.postCreated = [];
    this.postCommented = [];
  }
}

module.exports = { AccountCreation };
