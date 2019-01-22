const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
    min: 1,
    max: 25
  },
  issues: [Schema.Types.ObjectId]
});

const Project = mongoose.model('Project', Project);

module.exports = Project;