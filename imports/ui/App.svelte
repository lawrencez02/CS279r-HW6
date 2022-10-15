<!-- Svelte for rendering frontend of website -->

<script>
  import { TasksCollection } from '../db/TasksCollection';
  import { Meteor } from 'meteor/meteor';
  import Task from './Task.svelte';
  import TaskForm from './TaskForm.svelte';

  // Default is to show all tasks
  let hideCompleted = false;
  const hideCompletedFilter = { isChecked: { $ne: true } };


  let incompleteCount;
  let pendingTasksTitle = '';
  let tasks = [];
  let isLoading = true;

  // subscribe to tasks DB 
  const handler = Meteor.subscribe('tasks');
  $m: {
    isLoading = !handler.ready();

    // find all relevant tasks using the handler above
    tasks = TasksCollection.find(
        hideCompleted ? hideCompletedFilter : {},
            // sort tasks by when they were created at
            { sort: { createdAt: -1 } }
        ).fetch();

    // the number of incomplete/not checked off tasks
    incompleteCount = TasksCollection.find(hideCompletedFilter).count();

    pendingTasksTitle = `${
        incompleteCount ? ` (${incompleteCount})` : ''
    }`;
  }

  // helper function for setting whether to hide checked off tasks or not
  const setHideCompleted = value => {
    hideCompleted = value;
  };

</script>

<!-- The actual HTML for the app -->
<div class="app">
  <header>
    <div class="app-bar">
      <div class="app-header">
        <!-- The title of the app -->
        <h1>📝️ To Do List {pendingTasksTitle}</h1>
      </div>
    </div>
  </header>
  <div class="main">
    <!-- the form for inputting new tasks-->
    <TaskForm />
    <!-- the filter button for filtering completed tasks out -->
    <div class="filter">
      <button on:click={() => setHideCompleted(!hideCompleted)}>
        {hideCompleted ? 'Show All' : 'Hide Completed'}
      </button>
    </div>

    <!-- print loading message if DB is still loading -->
    {#if isLoading}
      <div class="loading">loading...</div>
    {/if}

    <!-- for each task that we've retrieved, display it -->
    <ul class="tasks">
      {#each tasks as task (task._id)}
        <Task {task} />
      {/each}
    </ul>
  </div>
</div>
