<script>
  import { TasksCollection } from '../db/TasksCollection';
  import { Meteor } from 'meteor/meteor';
  import Task from './Task.svelte';
  import TaskForm from './TaskForm.svelte';
  import LoginForm from './LoginForm.svelte';

//   boolean for hiding completed tasks
  let hideCompleted = false;

//   using this boolean as a filter in the todo list
  const hideCompletedFilter = { isChecked: { $ne: true } };

// creating variables to be used later
  let incompleteCount;
  let pendingTasksTitle = '';
  let tasks = [];
  let user = null;
  let isLoading = true;

//   subscribing to the db from the client side
  const handler = Meteor.subscribe('tasks');
  $m: {
    user = Meteor.user();

    // if there is a valid user logged in
    if (user) {

        isLoading = !handler.ready();

        // get tasks for this user specifically, and use the completed filter as well
        const userFilter = { userId: user._id };
        const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };


        // get all these tasks based on the above filters from the db
        tasks = TasksCollection.find(
                hideCompleted ? pendingOnlyFilter : userFilter,
                { sort: { createdAt: -1 } }
            ).fetch();

        // get the number of incompleted tasks
        incompleteCount = TasksCollection.find(pendingOnlyFilter).count();

        // add the number of pending tasks into the title of the page
        // for ex: Todo List (7) for 7 pending tasks
        pendingTasksTitle = `${
          incompleteCount ? ` (${incompleteCount})` : ''
        }`;
    }
  }

//   for whether the hideCompleted button should say "Show All" or "Hide Completed"
  const setHideCompleted = value => {
    hideCompleted = value;
  };

//   log this user out if they want to
  const logout = () => Meteor.logout();
</script>

<div class="app">
    <header>
        <div class="app-bar">
            <div class="app-header">
                <!-- title of the page, with the number of pending tasks calculated above -->
                <h1>📝️ To Do List {pendingTasksTitle}</h1>
            </div>
        </div>
    </header>

    <div class="main">
        <!-- for when theres a logged in user -->
        {#if user}
            <!-- logout button displaying the user's username -->
            <div class="user" on:click={logout}>
                {user.username} 🚪
            </div>

            <!-- form from our TaskForm component to add new tasks to our list below -->
            <TaskForm />

            <!-- toggle the button between show all and hide completed based on the boolean value set above -->
            <div class="filter">
                <button on:click={() => setHideCompleted(!hideCompleted)}>
                    {hideCompleted ? 'Show All' : 'Hide Completed'}
                </button>
            </div>

            <!-- if the page is still loading, show this on screen -->
            {#if isLoading}
                <div class="loading">loading...</div>
            {/if}

            <!-- create our list of Task elements from the tasks searched from our db -->
            <ul class="tasks">
              {#each tasks as task (task._id)}
                  <Task task={task} />
              {/each}
            </ul>
        {:else}
        <!-- if the user isn't logged in, show the login form -->
            <LoginForm />
        {/if}
    </div>
</div>
