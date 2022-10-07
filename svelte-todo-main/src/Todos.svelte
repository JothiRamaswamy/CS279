<script>
    import { db } from './firebase';
    import { collectionData, doc, docData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';
    import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    // style and animations
	const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

        // fallback for the crossfade
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

            // setting other characteristics of the animation like length, etc and other css
			return {
				duration: 300,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

    // current user id
    export let uid;

    // set the text input value to an empty strings
    let text = '';

    // query all the todos for this specfic user ordered
    const query = db.collection('todos').where('uid', '==', uid).orderBy('order');

    // get the todos from this query
    const todos = collectionData(query, 'id').pipe(startWith([]));

	let hovering = null;
    let hoveringComplete = false;

    // add todos to the list
    function add() {
        // get the length to calculate order
        let length = $todos.length;
        // check to make sure we didn't enter an empty string and return if we did
        if (text == '') { return; }
        // update the database with the new todo item
        db.collection('todos').add({ uid, text, complete: false, order: length });
        // print out a log of the update
        console.log(text + ' added with order ' + length);
        // reset the textbox so we can add more todos
        text = '';
    }

    // update the todo status in the db when we check off or uncheck todo items
    function updateStatus(todo) {
        console.log(todo.text + '(' + todo.id + ') marked ' + !todo.complete);
        db.collection('todos').doc(todo.id).update({ complete: !todo.complete });
    }

    // if we press complete all, check off all existing todo items that 
    // are unchecked and update their status in the db
    function updateAllIncomplete() {
        db.collection('todos').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // print out the todo item info
                console.log(doc.data());
                // check if we have the right items that we want to update based on users and status info
                if (doc.data().uid == uid && !doc.data().complete) {
                    // update the status info to be completed
                    doc.ref.update({
                        complete: true
                    });
                }
            });
        });
    }

    // if we press delete all, delete the completed items from the todo list and delete all
    // the items for this user in the db
    function deleteAllComplete() {
        db.collection('todos').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // if we have the right user aand the item is completed, delete from the db
                if (doc.data().uid == uid && doc.data().complete) {
                    doc.ref.delete();
                }
            });
        });
    }

    // delete an item from the todo list
    function removeItem(todo) {
        // log that the item was deleted
        console.log(todo.text + '(' + todo.id + ') deleted')
        // delete the item from the db
        db.collection('todos').doc(todo.id).delete();
    }
    
    // update the text in an existing todo item
    function changeName(event, todo) {
        // log that this todo item's text was changed
        console.log(todo.text + '(' + todo.id + ') name changed to ' + event.target.value);
        // change the text of this specific item in the db
        db.collection('todos').doc(todo.id).update({ text: event.target.value });
    }

    // if we start dragging to reorder the todo items, log the data for the item we want to move
    function dragStart(event, droppedId, complete) {
        hoveringComplete = complete;
        const data = {droppedId, complete};
        // save data in the event so that we can use it when we detect a drop
        event.dataTransfer.setData('text/plain', JSON.stringify(data));
        hovering = droppedId;
	}

    // once we drop a dragged item, move this item to the new location using the saved data from above
    function drop(event, id, complete) {
		event.preventDefault();
        // get the data from above
        const json = event.dataTransfer.getData('text/plain');
        // parse this data as it is saved as a json
		const data = JSON.parse(json);
        // make sure the completed status is correct and return otherwise
        if (complete !== data.complete) { return; }
        // log the id info for the dropped item and the existing item in the spot
        console.log(data.droppedId);
        console.log(id);
        // get the todo info from the db for these two items
        let todo = db.collection('todos').doc(id);
        let droppedTodo = db.collection('todos').doc(data.droppedId);
        // update the order values for these two items
        todo.get().then((doc) => {
            droppedTodo.update({ order: doc.data().order });
        });
        droppedTodo.get().then((doc) => {
            todo.update({ order: doc.data().order });
        });
	}

    // blur the target when we press enter
    function deselectOnEnter(event) {
        if (event.keyCode === 13) {
            event.target.blur();
        }
    }

</script>

<!-- css styles -->
<style>

    /* texfield styles where you add todo items */
    .field {
        width: 100%;
        color: var(--text-color);
        padding: 0.4rem 0;
        font-family: inherit;
        font-size: inherit;
        background: none;
        border: none;
    }

    .field:focus {
        outline: none;
    }

    /* submit button styles */
    .submit {
        font-size: 1.7em;
        font-weight: 200;
        padding: 0;
        z-index: 100;
        position: relative;
    }

    /* styles for the form elements */
    .form {
        position: relative;
        display: flex;
        border-bottom: 0.1rem solid var(--text-color);
    }

    /* styles for the form elements */
    .form:before {
        content: '';
        position: absolute;
        height: 100%;
        width: 0;
        border-bottom: 0.1rem solid var(--accent-color);
        transition: width 0.2s ease-in-out;
    }

    /*  */
    .form:focus-within:before {
        width: 100%;
        transition: width 0.3s ease-in-out;
    }

    #newItemForm {
        margin: 1rem 0;
    }

    ::placeholder {
        color: var(--sub-color);
    }
    
    .headerBar2 {
        display: flex;
        justify-content: space-between;
    }

    .headerBar2 > * {
		white-space: nowrap;		
	}

    .header2 {
        visibility: hidden;
    }

    .headerBar2:hover > .header2 {
        visibility: visible;
    }

    /* styles for the checkboxes next to items */
    .check {
        background: none;
        display: block;
        position: relative;
        height: 18px;
        width: 18px;
        cursor: pointer;
        border: 0.1rem solid var(--sub-color);
        border-radius: 0.2rem;
    }

    /* style when you hover over a textbox */
    .check:hover {
        border-color: var(--sub-color);
    }

    .check:focus {
        outline: none;
    }

    /* the style of the checkmark specifically in a checkbox */
    .checkmark {
        display: block;
        visibility: hidden;
        pointer-events: none;
        position: relative;
        width: 0.4rem;
        height: 0.8rem;
        right: 0.75rem;
        bottom: 0.1rem;
        border: solid var(--accent-color);
        border-width: 0 0.1rem 0.1rem 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    /* show a checkmark when an item is completed*/
    .checkmark.completed {
        visibility: visible;
    }

    /* the style for the todo item text */
    .name {
        background: none;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        border: none;
	    cursor: text;
        margin-left: 0.5rem;
        width: 100%;
        align-self: center; 
    }

    .name:focus {
        outline: none;
    }
    
    /* cross of text for completed items */
    .name.completed {
        text-decoration: line-through;
    }

    /* style for the delete button */
    .delete {
        visibility: hidden;
        font-size: 1.1em;
        position: relative;
        margin-left: 1rem;
        bottom: 0.2rem;
    }

    /* show the delete button when you hover over the completed title area */
    .line:hover > .delete {
        visibility: visible;
    }

    /* style for the lists of todo items */
    .lists {
        display: flex;
        justify-content: space-between;
    }

    /* adjust the width of the todo list */
    .list {
        width: 100%;
    }

    /* style for incomplete items */
    .incomplete {
        margin-right: 3rem;
    }

    /* location and size constraints for the lines */
    .line {
        position: relative;
        right: 0.3rem;
        background: none;
        padding: 0.2rem 0.4rem;
        margin: 1rem 0;
        border-radius: 0.3rem;
        width: inherit;
        display: flex;
        align-items: center;
        height: 1.5rem;
    }

    .line.is-active {
        box-shadow: inset 0 0 0 0.1rem var(--accent-color);
    }
</style>

<!-- template html for the todo list -->

<!-- form item where you add new todo items to your list -->
<form class="form" id="newItemForm" autocomplete="off" on:submit|preventDefault={add}>
    <!-- type in the new item here -->
	<input class="field" id="newItemField" placeholder="add item..." bind:value={text}>
    <!-- submit this item to the todo list and db -->
    <button type="submit" class="button submit">+</button>
</form>

<!-- the actual todo list -->
<div class="lists">
    <!-- the list of incomplete items -->
    <div class="list incomplete">

        <!-- create the complete all button -->
        <div class="headerBar2">
            <h2 class="header">to-do</h2>
            <button class="button header2" on:click={updateAllIncomplete}>complete all</button>
        </div>

        <!-- filter the todo items for this user that are incomplete -->
        <!-- create the todo item div and add in any necessary animations and other characteristics -->
        {#each $todos.filter(t => !t.complete) as todo (todo.id)}

            <div 
                class="line"
                in:receive="{{key: todo.id}}"
                out:send="{{key: todo.id}}"
                animate:flip="{{duration: 300}}"
                on:drop={event => drop(event, todo.id, false)}
                on:dragstart={event => dragStart(event, todo.id, false)}
                on:dragend={() => hovering = null}
                on:dragenter={() => hovering = todo.id}
                ondragover="return false"
                draggable={true}
                class:is-active={hovering === todo.id && hoveringComplete === todo.complete}
            >
            <!-- add in the checkbox button, the actual checkmark, the input field for updating todo items, and the delete button x -->
                <button class="check" on:click={updateStatus(todo)}></button>
                <span class="checkmark"></span>
                <input class="name" on:change={event => changeName(event, todo)} on:keydown={event => deselectOnEnter(event)} value={todo.text}>
                <button class="button delete" on:click={removeItem(todo)}>✕</button>
            </div>
            
        {/each}
    </div>

    <!-- the completed list -->
    <div class="list complete">

        <!-- create the completed header and delete all button -->
        <div class="headerBar2">
            <h2 class="header">completed</h2>
            <button class="button header2" on:click={deleteAllComplete}>delete all</button>
        </div>
        

        <!-- filter the todo items for this user that are complete -->
        <!-- create the todo item div and add in any necessary animations and other characteristics -->
        {#each $todos.filter(t => t.complete) as todo (todo.id)}
        
            <div
                class="line"
                in:receive="{{key: todo.id}}"
                out:send="{{key: todo.id}}"
                animate:flip="{{duration: 300}}"
                on:drop={event => drop(event, todo.id, true)}
                on:dragstart={event => dragStart(event, todo.id, true)}
                on:dragend={() => hovering = null}
                on:dragenter={() => hovering = todo.id}
                ondragover="return false"
                draggable={true}
                class:is-active={hovering === todo.id && hoveringComplete === todo.complete}
            >
            <!-- add in the checkbox button, the actual checkmark, the input field for updating todo items, and the delete button x -->
                <button class="check" on:click={updateStatus(todo)}></button>
                <span class="checkmark completed"></span>
                <span class="name completed">{todo.text}</span>
                <button class="button delete" on:click={removeItem(todo)}>✕</button>
            </div>
            
        {/each}
    </div>
</div>