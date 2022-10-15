import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

// Publish tasks from DB onto website
Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});
