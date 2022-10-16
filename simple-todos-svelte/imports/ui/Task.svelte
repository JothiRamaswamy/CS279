<script>
  export let task;

  // change whether a specific task is checked or not checked based on user input
  const toggleChecked = () =>
    Meteor.call('tasks.setIsChecked', task._id, !task.isChecked);

// if the user wants to delete a task, delete it from the db
  const deleteThisTask = () => Meteor.call('tasks.remove', task._id);
</script>

<!-- list item for the list of tasks in App.svelte -->
<li>
  <!-- checkbox for the associated task item and toggling whether it is checked or not -->
    <input
            type="checkbox"
           readonly
           checked={!!task.isChecked}
           on:click={toggleChecked}
    />
    <!-- displays the task text -->
    <span>{ task.text }</span>
    <!-- delete button for this specific task -->
    <button class="delete" on:click={deleteThisTask}>&times;</button>
</li>
