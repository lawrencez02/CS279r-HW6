// Master list of task-related api methods that we will support!
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

Meteor.methods({
  // insert into the DB a new task with its text/title and when it was created at
  'tasks.insert'(text) {
    check(text, String);
    TasksCollection.insert({
      text,
      createdAt: new Date(),
    });
  },

   // delete the specified task with the taskId from the DB
  'tasks.remove'(taskId) {
    check(taskId, String);
    const task = TasksCollection.findOne({ _id: taskId });
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }
    TasksCollection.remove(taskId);
  },

   // for the given task with the taskID, toggle its checked status
  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);
    const task = TasksCollection.findOne({ _id: taskId });
    if (!task) {
      throw new Meteor.Error('Access denied.');
    }
    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
