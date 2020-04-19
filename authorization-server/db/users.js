'use strict';

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

/**
 * This is the configuration of the users that are allowed to connected to your authorization
 * server. These represent users of different client applications that can connect to the
 * authorization server. At a minimum you need the required properties of
 *
 * id       : A unique numeric id of your user
 * username : The user name of the user
 * password : The password of your user
 * name     : The name of your user
 */

const userSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, unique: true, required: true },
  password: { type: String },
  email: { type: String, lowercase: true, trim: true, unique: true },
  created: { type: Date, default: Date.now },
  location: {
    lat: { type: String },
    lon: { type: String },
    sdefID: { type: String },
    sdefName: { type: String },
  },
  legalSignOffs:{
    name: { type: String },
    date: { type: Date },
  },
});

// Virtual
// eslint-disable-next-line func-names
userSchema.virtual('name').get(function () {
  return `${this.first_name} ${this.last_name}`;
});

// Creates auto incrementing id
userSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Users', userSchema);
