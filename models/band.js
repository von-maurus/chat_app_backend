const { v4: uuidv4 } = require('uuid');
class Band {
  constructor(id, name, votes) {
    this.id = uuidv4();
    this.name = name;
    this.votes = votes;
  }
}

Band.fromJson = function (json) {
  if (!json) return null;
  return new Band(
    json.id || null,
    json.name || null,
    json.votes || 0
  );
};

Band.prototype.toJson = function () {
  return {
    id: this.id || null,
    name: this.name || null,
    votes: this.votes || 0
  };
};

module.exports = Band;