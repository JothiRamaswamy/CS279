<script>
    import Todos from './Todos.svelte';

    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';
	
	import {theme} from './store.js';
	import { fly } from 'svelte/transition';

	$: {
		// log the current theme
		console.log($theme);
		// deal with getting the rest of the themes and saving it to use in this file
		let classes = window.document.body.className.split(' ');
		classes.pop();
		classes.push($theme + '-theme');
		window.document.body.className = classes.join(' '); 
	}

	// connecting users to google accounts for convenience
    let user;

	let showThemeBox = false;

    const unsubscribe = authState(auth).subscribe(u => user = u);

	// connect google login to app and sign in with google
    function login() {
        auth.signInWithPopup(googleProvider);
    }

	// signing out of google
	function logout() {
		auth.signOut();
	}
</script>

<svelte:head>
</svelte:head>

<!-- adding some CSS specifically for this file -->
<style>
	main {
		margin-top: 5rem;
		display: grid;
		grid-template-columns: auto 15rem 60rem 15rem auto;
		grid-column-gap: 2rem;
	}
	/* box with entering the todo items */
	#mainBox {
		grid-column: 3 / 4;
	}
	/* box with all the themes you can change to */
	#themeBox {
		height: fit-content;
	}
	/* styles for the header bar with your name */
	.headerBar {
		display: flex;
		margin-bottom: 2rem;
	}
	.headerBar > * {
		white-space: nowrap;		
	}
	/* logout button styles */
	#logoutButton {
		margin-right: 2rem;
	}
</style>

<main class="content">

	<div class="box" id="mainBox">
		{#if user}
		<!-- if the user is logged in -->
		<!-- give an option to log out and show the theme box -->
			<div class="headerBar">
				<h1 class="header top">hello, {user.displayName}!</h1>
				<button on:click={ () => logout() } class="button" id="logoutButton">logout</button>
				<button on:click={ () => showThemeBox = !showThemeBox} class="button" id="themeButton">theme</button>
			</div>

			<section>
				<Todos uid={user.uid} />
			</section>
		{:else}
		<!-- if the user isn't logged in -->
		<!-- ask them to login in order to use the app -->
			<div class="headerBar">
				<h1 class="header top">svelte to-do</h1>
				<button on:click={login} class="button">sign in with google</button>
			</div>

			<p class="text">
				welcome to svelte to-do! this is a to-do list app made with svelte and firebase. 
				<br>
				sign in to get started.
			</p>
		{/if}
	</div>

	{#if showThemeBox}
	<!-- set the theme of the todo list to what you would like to use -->
		<div class="box" id="themeBox" transition:fly="{{ x: 300, duration: 300 }}">
			<h3 class="header top">themes</h3>
			<!-- set to dark theme -->
			<button on:click={ () => theme.set('dark')} class="button">dark</button>
			<br>
			<!-- set to light theme -->
			<button on:click={ () => theme.set('light')} class="button">light</button>
			<br>
			<!-- set to midnight theme -->
			<button on:click={ () => theme.set('midnight')} class="button">midnight</button>
			<br>
			<!-- set to nebula theme -->
			<button on:click={ () => theme.set('nebula')} class="button">nebula</button>
			<br>
			<!-- set to olivia theme -->
			<button on:click={ () => theme.set('olivia')} class="button">olivia</button>
			<br>
			<!-- set to laser theme -->
			<button on:click={ () => theme.set('laser')} class="button">laser</button>
			<br>
			<!-- set to carbon theme -->
			<button on:click={ () => theme.set('carbon')} class="button">carbon</button>
		</div>
	{/if}

</main>