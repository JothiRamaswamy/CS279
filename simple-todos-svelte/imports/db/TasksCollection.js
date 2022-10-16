import { Mongo } from 'meteor/mongo';

// for actually updating and saving data to MongoDB
export const TasksCollection = new Mongo.Collection('tasks');
