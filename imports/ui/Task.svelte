<script>
  export let task;

  // helper function to toggle current task between checked and not checked
  const toggleChecked = () =>
    Meteor.call('tasks.setIsChecked', task._id, !task.isChecked);

  // helper function to delete current task
  const deleteThisTask = () => Meteor.call('tasks.remove', task._id);
</script>

<li>
    <!-- HTML checkbox for this task to be toggled between checked and not checked off -->
    <input
            type="checkbox"
           readonly
           checked={!!task.isChecked}
           on:click={toggleChecked}
    />
    <span>{ task.text }</span>
    <button class="delete" on:click={deleteThisTask}>&times;</button>
</li>
