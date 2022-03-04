var val = 0;

/*Configure Firebase*/
var firebaseConfig = {
    apiKey: "Given app ID",
    authDomain: "name.firebaseapp.com",
    databaseURL: "https://name-default.firebaseio.com/", //find this link on top of your database
    projectId: "name",
    storageBucket: "name.appspot.com",
    messagingSenderId: "ID",
    appId: "app ID"
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


