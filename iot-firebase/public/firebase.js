var val = 0;

/*Configure Firebase*/
var firebaseConfig = {
    apiKey: "AIzaSyAiA1LRQoP0jU4b4SW6mBfgFRnY1cSKFWw",
    authDomain: "suk-dev-9ca7c.firebaseapp.com",
    databaseURL: "https://suk-dev-9ca7c-default-rtdb.firebaseio.com/", //find this link on top of your database
    projectId: "suk-dev-9ca7c",
    storageBucket: "suk-dev-9ca7c.appspot.com",
    messagingSenderId: "780557443801",
    appId: "1:780557443801:web:13269b359f2269788854c8"
};
firebase.initializeApp(firebaseConfig); //Initialize Firebase

/* Data Event Listeners Start */

const preObject = document.getElementById('object'); //Accessing "object" created in light_switch.html

/*Accessing realtime database*/
var ref = firebase.database().ref();
ref.on("value", function (snapshot) {
    preObject.innerHTML = JSON.stringify(snapshot.val(), null, 3);
});

/*Setting values in the database*/
ref.set({
    devices: {
        light1: 1 //1 is an integer value which will ultimately represent "on" configuration
    }
});




var light_stat = firebase.database().ref("devices");


/*Addinng functionality to the toggle switch to send data(update) to Firebase Realtime Database every time the switch is toggled*/
function buttonClick() {
    if (val == 0) {
        val = 1; //light: "on"
    }
    else {
        val = 0; // light: "off"
    }

    light_stat.update({
        "light1": val
    });
}


