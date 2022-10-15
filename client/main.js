import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';

// When Meteor starts up, create the application!
Meteor.startup(() => {
  // eslint-disable-next-line no-new
  new App({
    target: document.getElementById('app'),
  });
});
