import App from './App.svelte';

// create the actual app that gets run with code from the other svelte files
const app = new App({
    target: document.body,
    props: {
        name: 'To-do'
    }
});

export default app;