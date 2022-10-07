import { writable } from 'svelte/store';

// dealing with the themes showing up on this todo list and the svelte store to save these themes
const storedTheme = localStorage.getItem('theme');
export const theme = writable(storedTheme);
theme.subscribe(value => {
    localStorage.setItem('theme', value ? value : 'dark');
});	