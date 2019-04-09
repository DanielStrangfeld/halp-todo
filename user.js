// The current user's profile
var profile = firebase.auth().currentUser;


// Check if signed in on load
firebase.auth().onAuthStateChanged(async function(user) {
	if (user) {
		// Set the current user
		profile = user;
		// Update the profile photo
		loadProfile(user);

		var getDoc = db.collection("users").doc(user.uid).get()
			.then(doc => {
				if (!doc.exists) {
					addNewUser(profile);
				}
			})
			.catch(err => {
				console.log('Error getting document', err);
			});

		// Load all of the user's todo's
		loadData(user);
	} else {
		// Return to the login screen
		loadLogin();
	}
});

// Login on button click
function logIn() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (!user) {
			// Firebase provier
			var provider = new firebase.auth.GoogleAuthProvider();
			// Redirect to the Google sign in page
			firebase.auth().signInWithRedirect(provider);
		}
	});
}


// Log out and return to homepage
function logOut() {
	// Check to make sure that there is a user signed in
	if (profile) {
		// Sign the user out
		firebase.auth().signOut().then(function() {
			// logout was successfull
			// updateProfile();
		}).catch(function(error) {
			alert("Error logging out: " + error);
		});
		// Reload the page
		location.reload();
	}
}

// Connect the Firestore database
const db = firebase.firestore();


function loadData(user) {
	db.collection("users").doc(user.uid).collection("todos").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			createToDo(doc.data().td);
		});
	});
}


function addToDo(input) {
	// Add a new document with a generated id
	db.collection("users").doc(profile.uid).collection("todos").add({
			td: input
		})
		.then(function(docRef) {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});

	// Add the todo on the page
	createToDo(input);
}


function deleteToDo(btn) {
	// Get the data
	db.collection("users").doc(profile.uid).collection("todos").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			// Check if the current document is the one that holds this todo item
			if (doc.data().td == btn.nextSibling.textContent) {
				// Delete the document
				db.collection("users").doc(profile.uid).collection("todos").doc(doc.id).delete().then(function() {
					console.log("Document successfully deleted!");
					// Remove the todo from the page
					btn.parentNode.remove();
				}).catch(function(error) {
					console.error("Error removing document: ", error);
				});
			}
		});
	});
}

function addNewUser(profile) {
	// Add a new document for the user with a generated id
	db.collection("users").doc(profile.uid).set({

		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});

	// Add a new "todos" collection for the user with a generated id and then place their first todo in it
	db.collection("users").doc(profile.uid).collection('todos').add({
		td: "Create your first to-do item by clicking the + button above"
	});
	createToDo("Create your first to-do item by clicking the + button above");
}