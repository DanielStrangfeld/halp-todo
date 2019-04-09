// ----- ADD -----
var add = document.getElementById('add');
var addBtn = document.getElementsByTagName('button')[1];
var clsBtn = document.getElementsByTagName('button')[2];
var inputData = document.getElementById('inputData');

// ----- USER -----
var profilePhoto = document.getElementsByTagName('img')[0];
var logout = document.getElementsByTagName('button')[0];
var intro = document.getElementById('intro');

// ----- OTHER -----
var topOfList = document.getElementsByTagName('span')[4];



// ----- ADD TODO -----
$(addBtn).click(function() {
	if (!add.classList.contains('active')) {
		add.classList.toggle('active');
	} else if (checkInput(inputData.value)) {
		// The input was good, add it to the database
		addToDo(inputData.value);
		// Close the add todo field
		add.classList.toggle('active');
		// Clear the add todo field
		add.getElementsByTagName('input')[0].value = "";
	}
	return;
});

function checkInput(input) {
	if (!input.length === 0) {
		// The input was empty
		console.warn("Empty string");
	} else if (!input.trim()) {
		// The input was only whitespace
		console.warn("String was only whitespace");
	} else {
		// The input was good
		return true;
	}

	// The input was either blank or had only whitespace
	return false;
}

$(clsBtn).click(function() {
	if (add.classList.contains('active')) {
		add.classList.toggle('active');
		add.getElementsByTagName('input')[0].value = "";
	}
	return;
});



// ----- LOAD TODOS -----
// Create the todo elements
function createToDo(toDoItem) {
	sec = document.createElement("section");

	btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.setAttribute("title", "Done");
	btn.setAttribute("onclick", "deleteToDo(this)")

	check = document.createElement("div");
	check.classList.add("check");

	spn1 = document.createElement("span");
	spn2 = document.createElement("span");
	check.appendChild(spn1);
	check.appendChild(spn2);
	btn.appendChild(check);

	text = document.createElement("p");
	text.textContent = toDoItem;

	sec.appendChild(btn);
	sec.appendChild(text);

	// Append the newly created elements to the page
	topOfList.after(sec);
}



// ----- USER LOGIN / LOGOUT -----

function loadProfile(user) {
	// Set the profile photo
	profilePhoto.setAttribute("src", user.photoURL);
	profilePhoto.style.display = "block";
	// Show the logout button
	logout.style.display = "block";
	// Show the add button
	add.style.display = "flex";
}

function loadLogin() {
	// Show the login / join buttons
	intro.style.webkitAnimationPlayState = "running";
}