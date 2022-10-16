import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

Meteor.methods({
  // inserting a task into the list
  'tasks.insert'(text) {
    check(text, String);

    // check to make sure this is a valid user who is logged in
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // insert the task into the MongoDB database, saving the user, date, and task info
    TasksCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  // remove a task from the list
  'tasks.remove'(taskId) {
    check(taskId, String);

    // check to make sure this is a valid user who is logged in
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // get this task for this specific user from the database
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    // check to make sure this is a valid task and accessible by the current user
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    // if all the checks pass, remove this item from the db
    TasksCollection.remove(taskId);
  },

  // toggle whether the todo item is checked off or not
  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    // check to make sure this is a valid user who is logged in
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // get this task for this specific user from the database
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    // check to make sure this is a valid task and accessible by the current user
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    // update the db for the checked value of this specific task
    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
