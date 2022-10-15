import { Mongo } from 'meteor/mongo';

// MongoDB for storing tasks
export const TasksCollection = new Mongo.Collection('tasks');
