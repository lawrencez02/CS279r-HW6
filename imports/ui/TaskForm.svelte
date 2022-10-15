<script>
    let newTask = '';

    // helper function for handling when a user submits a new task
    const handleSubmit = () => {
      if (!newTask) return;
      Meteor.call('tasks.insert', newTask);
      // clear the HTML form
      newTask = '';
    }
</script>

<!-- the form for entering in a new task! -->
<form class="task-form" on:submit|preventDefault={handleSubmit}>
    <input
            type="text"
            name="text"
            placeholder="Type to add new tasks"
            bind:value={newTask}
    />
    <button type="submit">Add Task</button>
</form>
