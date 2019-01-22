const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IssueSchema = Schema({
  issueTitle: {
    type: String,
    required: true,
    min: 1,
    max: 25
  },
  description: {
    type: String,
    required: true,
    min: 1,
    max: 280
  },
  name: {
    type: String,
    required: true,
    min: 1,
    max: 25
  },
  assign: {
    type: String,
    default: '',
    max: 25
  },
  status: {
    type: String,
    default: '',
    max: 25
  },
  dateCreated: {
    type: String,
    default: new Date(),
    max: 25 
  },
  dateUpdated: {
    type: String,
    default: new Date()
  },
  open: {
    type: Boolean,
    required: true
  },
  project: {
    type: String,
    required: true,
    min: 1,
    max: 25
  }
  
});

const Issue = mongoose.model('Issue'. IssueSchema);
module.exports = Issue;