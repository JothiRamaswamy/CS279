<script>
  import { Meteor } from 'meteor/meteor';

  // initial username and passwords set to empty strings
  let username = "";
  let password = "";

  // when the user submits their login form, check that this is valid through Meteor
  const handleSubmit = () => {
    Meteor.loginWithPassword(username, password);
  }
</script>

<!-- actual login form html -->
<form class="login-form" on:submit|preventDefault={handleSubmit}>
  <!-- username div -->
  <div>
      <!-- title for username input box -->
        <label htmlFor="username">Username</label>

        <!-- username input box -->
        <input
                type="text"
                placeholder="Username"
                name="username"
                required
                bind:value={username}
        />
    </div>

    <!-- password div -->
    <div>
      <!-- title for password input box -->
        <label htmlFor="password">Password</label>

        <!-- password input box -->
        <input
                type="password"
                placeholder="Password"
                name="password"
                required
                bind:value={password}
        />
    </div>

    <!-- submit div -->
    <div>
      <!-- submit button -->
        <button type="submit">Log In</button>
    </div>
</form>
