import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

// insert task into the db when this is function is called, associating it with the tasks text, the current user, and the current date
const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

  // default username and password to be used 
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

// start up meteor and add an account to the db for the seed user if its not already there
Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  // get this specific user with the seed username
  const user = Accounts.findUserByUsername(SEED_USERNAME);

  // autopopulate this list with seven default tasks if there isn't already a list of tasks
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
      // insert these default tasks into the db for this user
    ].forEach(taskText => insertTask(taskText, user));
  }
});
