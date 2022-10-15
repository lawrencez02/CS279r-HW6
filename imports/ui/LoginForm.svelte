<script>
  // define the login form
  import { Meteor } from 'meteor/meteor';

  let username = "";
  let password = "";

  // helper function that gets called when the user submits the login form
  const handleSubmit = () => {
    Meteor.loginWithPassword(username, password);
  }
</script>

<!-- Form for submitting username and password -->
<form class="login-form" on:submit|preventDefault={handleSubmit}>
    <div>
        <label htmlFor="username">Username</label>

        <input
                type="text"
                placeholder="Username"
                name="username"
                required
                bind:value={username}
        />
    </div>

    <div>
        <label htmlFor="password">Password</label>

        <input
                type="password"
                placeholder="Password"
                name="password"
                required
                bind:value={password}
        />
    </div>
    <div>
        <button type="submit">Log In</button>
    </div>
</form>
