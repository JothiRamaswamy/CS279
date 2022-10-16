<script>
    export let user = null;
    // set task input box to an empty string initially
    let newTask = '';

    // when the user submits a new task, make sure it isn't empty, then insert into the db
    const handleSubmit = () => {
      // if the new task is null, just return and do nothing, don't update the db
      if (!newTask) return;

      // otherwise insert this new task into the db
      Meteor.call('tasks.insert', newTask);

      // Clear form and reset newTask to an empty string
      newTask = '';
    }
</script>

<form class="task-form" on:submit|preventDefault={handleSubmit}>
  <!-- input field for adding new tasks -->
    <input
            type="text"
            name="text"
            placeholder="Type to add new tasks"
            bind:value={newTask}
    />
    <!-- submit button for adding to the list and db -->
    <button type="submit">Add Task</button>
</form>
