import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      // set the user to a random id so we aren't changing an actual user's todo list
      const userId = Random.id();
      let taskId;

      // add in test tasks for the purpose of the following tests
      beforeEach(() => {
        TasksCollection.remove({});
        taskId = TasksCollection.insert({
          text: 'Test Task',
          createdAt: new Date(),
          userId,
        });
      });

      // test for whether a user can delete their own task
      it('can delete owned task', () => {
        // remove the task from the db
        mockMethodCall('tasks.remove', taskId, { context: { userId } });
        // check that the task was properly deleted
        assert.equal(TasksCollection.find().count(), 0);
      });

      // check for whether a deletion fails when there isn't a valid user deleting the task
      it("can't delete task without an user authenticated", () => {
        // mock tasks.remove for the sake of the tests
        const fn = () => mockMethodCall('tasks.remove', taskId);
        // check that an error was thrown saying "Not Authorized"
        assert.throw(fn, /Not authorized/);
        // assert that no item was deleted from the list
        assert.equal(TasksCollection.find().count(), 1);
      });

      // check that you can't delete someone else's task
      it("can't delete task from another owner", () => {
        const fn = () =>
        // mock tasks.remove for the sake of the tests, with the user id being changed
          mockMethodCall('tasks.remove', taskId, {
            context: { userId: 'somebody-else-id' },
          });
        // check that an error was thrown saying "Access Denied"
        assert.throw(fn, /Access denied/);
        // assert that no item was deleted from the list
        assert.equal(TasksCollection.find().count(), 1);
      });

      // assert that you can properly check/uncheck items from the list and update the db
      it('can change the status of a task', () => {
        // get this task from the db
        const originalTask = TasksCollection.findOne(taskId);
        // mock setIsChecked for the sake of the test
        mockMethodCall('tasks.setIsChecked', taskId, !originalTask.isChecked, {
          context: { userId },
        });
        // get the new task data from the db
        const updatedTask = TasksCollection.findOne(taskId);
        // assert that the previous status and the current status are now different
        assert.notEqual(updatedTask.isChecked, originalTask.isChecked);
      });

      // assert that a user can properly insert tasks into their own list
      it('can insert new tasks', () => {
        // text for the task
        const text = 'New Task';
        // mock the insert method
        mockMethodCall('tasks.insert', text, {
          context: { userId },
        });
        // get all the tasks for this user
        const tasks = TasksCollection.find({}).fetch();
        // assert that the length of the list is now 2, so the task was added
        assert.equal(tasks.length, 2);
        // assert that the taskk is in the db with the right text value
        assert.isTrue(tasks.some(task => task.text === text));
      });
    });
  });
}
