const fs = require('fs');

/**
 * @description Fetch existing notes from the file system and parse them into a JavaScript object. try/catch avoids an error message if the file 'notes-data.json' doesn't exist yet.
 */
let fetchNotes = () => {
	try {
		let notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e) {
		return [];
	}
};

/**
 * @description Convert the JavaScript object into a string and save the note into 'notes-data.json'.
 */
let saveNotes = (notes) => {
		fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
	let notes = fetchNotes();
	let note = {
		title,
		body
	};
	let duplicateNotes = notes.filter((note) => note.title === title);

	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

let getAll = () => {
	return fetchNotes();
};

let getNote = (title) => {
	let notes = fetchNotes();
	let filteredNotes = notes.filter((note) => note.title === title);
	return filteredNotes[0];
};

let removeNote = (title) => {
	let notes = fetchNotes();
	let filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);

	return notes.length !== filteredNotes.length;
};

/**
 * @description Boilerplate function for logging the note(s).
 */
let logNote = (note) => {
	console.log('--');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
}

/**
 * @description Export the modules defined above.
 */
module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};
