# IoT-with-Firebase 🔥
An easy to follow tutorial for using Firebase to transfer data from website to Wi-Fi module (NodeMCU). This code focuses on making a simple toggle switch to turn light on and off, but can be expanded for receiving and sending more data (integers, strings or bool) following the same steps.
## Components and Tools Used 🧮
### Softwares 💻

In this project, we will be using Node.js. 
> Node.js® is a JavaScript-based environment which you can use to create web-servers and networked applications. You can also use it to perform helpful tasks on your computer such as concatenating and minifying JavaScript files and compiling Sass files into CSS.


Download and Install [Node.js](https://nodejs.org/en/download/) to your system before continuing. Make sure to also install the `npm package manager`.

> NPM is a “package manager” that makes installing Node “packages” fast and easy. A package is just a code library that extends Node by adding useful features. For example, the “request” package simplifies the process of making HTTP requests so you can easily get web resources from other sites.

To check if the intallation was successful or if you already have Node.js installed, open the Windows Command Prompt, Powershell or a similar command line tool in your systems and type `node -v`; then for checking NPM, type `npm -v`.

[Here](https://treehouse.github.io/installation-guides/windows/node-windows.html#:~:text=Test%20NPM.,see%20something%20like%20this%201.4.) is a good installation and testing guide for Node.js and NPM on Windows.

After following the steps, we will successfully be able to use the following tools to create a webpage:
- HTML
- CSS
- JavaScript 

### Firebase 👩‍🚒
To get started with Firebase, follow these steps:
1. Log into the [Firebase console](https://console.firebase.google.com)
2. Click on **Add Project**
3. Enter the **Project Name** and click **Continue**
4. We don't need **Google Analytics** for this current project, but you can enable it as per your convenience. Click **Create Project** after.
5. In the **Add an app to get started** section, create a web app by clicking `</>` icon. 
6. Register the web app by providing it a nickname (there is no need to set up **Firebase Hosting** yet, but again procede as per your convenience).
7. Next step in registering is to **Add Firebase SDK**. We will be integrating the given code in our project during later steps, but for now, create a separate text file to save the **Initial Firebase** code.
8. Click **Continue to console** after saving.
9. In the side-menu of the console, click on **Realtime Database**, then **Create Database**.
10. Choosee the location setting, then click **Next**.
11. Choose the **Start in test mode** option, then click **Enable**.
12. Now, in the same Realtime Databse Console, go to **Rules** and edit the rules as follows:

```
{
  "rules": {
    ".read": "true",
    ".write": "true",
  }
}
```
13. **Publish** the changes, and we are done! 

### Hardware 👩‍🔧
We will only be requiring a Wi-Fi Module for now as we will only be controlling a small LED. 

I used **NodeMCU ESP8266 Board** for my purposes. If you are using the same board, make sure your Arduino IDE is configured for uploading codes to NodeMCU. [This webpage](https://www.instructables.com/IoT-ESP8266-Series-1-Connect-to-WIFI-Router/) provides a detailed overview of the configurations.

This project can easily be transformed and expanded further by adding more hardware without much need for change in the code. Examples include:
- Adding a relay to control bulb or tubelight for remote control of home lighting system
- Getting data from various sensors and displaying them on your website
- Making web apps for further control of electronic and electrical devices like fans, refrigerators, etc.

## Schematics 🏗️
The data transfer will procede as follows:
```
Web-page ---> Firebase Realtime Database ---> NodeMCU (Wi-Fi Module)
```
The reverse is also possible with slight change in code, but this project's focus is currently only on the given schematic.

## Step-by-Step Guide 👩‍💻
### 1. Creating a Node.js project 🪛
#### 1. Main root directory 📁
This is the folder where all of your subsequent files and folders will be stored. Create this folder and preferably name it the name of your project. Mine is `iot-firebase`.
#### 2. Public 💠
Create this folder inside the root directory (created above). This will contain all the css, html and javascript files we'll be working on.
#### 3. Node_modules 🖱️
1. Open terminal in the root directory and run `npm init`. This will initialize NPM to our project. _This creates a package.json file in the root directory._
2. Now we will add some packages: Express.js & nodemon by typing the following in terminal: `npm i express.js nodemon`. Express.js creates a server; Nodemon is used to run the server continuously. _This step creates a node_modules directory along with package-lock.json files._
3. Open the `package.json` file and change the `scripts` block as follows:
```
"scripts": {
    "start": "nodemon index.js"
  },
```
4. Now creat an `index.js` file in the root directory and write the following code in it:
```
/*Importing the packages we need*/
const express = require('express');
const path = require('path');

let initial_path = path.join(__dirname, "public"); //Store the public folder path inside a variable

const app = express(); //creating express.js server
app.use(express.static(initial_path)); //set public folder path to static path

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "light_switch.html"));
})

/*Running the server on port 8080*/
app.listen("8080", () => {
    console.log('listening.....');
})
```
### 2. Making the toggle switch 🔲
We want to create a webpage with a toggle switch that just changes text for now. For this purpose, we'll be creating 3 files, namely:
- light_switch.html (for web-page)
- style.css (for styling the switch and adding toggle functionality)
- switch.js (for programming what happens which the switch is toggled; in this case only the text bellow the button will change from 'light on' to light 'off' and vice versa.
Create all these files in the `public` directory we created initially.
#### 1. Firstly, we make the html file as follows:
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IoTECO</title>
    <script src="switch.js"></script>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Light Switch</h1>
    <p>LED Control</p>
    <label class="switch">
        <input type="checkbox" onclick="myFunction()">
        <span class="slider round"></span>
    </label>

    <div id="myDIV">Light Off</div>


</body>

</html>
```
> The myFunction() functions is going to be implemented from the Javascript file we'll create.
#### 2. Create the css file:
```
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(73, 72, 72);
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: rgb(0, 0, 0);
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #F9A826;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #F9A826;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
```
You can change the style as you wish. Have fun with it!
#### 3. Creating the JavaSscript file
Here we create myFunction().
```
function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.innerHTML === "Light Off") {
        x.innerHTML = "Light On";
    } else {
        x.innerHTML = "Light Off";
    }
}
```

Now the toggle switch is working perfectly.
### 3.  Integrating Firebase to the Project 🎛️
1. Add the given line inside the `<head></head>` block of the html file:

`<script src="https://www.gstatic.com/firebasejs/5.5.1/firebase.js"></script>`

2. Edit the `input` script as follows:

`<input type="checkbox" onclick="myFunction(), buttonClick()">`

3. Add the following code to the `<body></body>` block:
```
    <pre id='object' hidden></pre>

    <script src="firebase.js"></script>
```

4. Now we'll create the `firebase.js` file to actually integrate the web app with firebase.
    1. We will add the Configuration we saved in the [above step](https://github.com/aceta-minophen/IoT-with-Firebase/edit/main/README.md#firebase).
    2.  Follow the following code and read the comments for information about what is happening:

```
var val = 0;

/*Configure Firebase -- Replace all values with the ones from your database*/
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

/*Setting values in the database -- changes will be visible in a similar fashion on the Realtime database page*/
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
```
Saving this code will successfully enable us to toggle the switch and send data to firebase by toggling the switch.

### 4. Last Step: Code for the Wi-Fi Module 🔐
To be able to control our Wi-Fi Module (NodeMCU), we will first have to install a library which enables us to connect with Firebase.
1. Install `Firebase Arduino Client Library for ESP8266 and ESP32 by Mobitz`
2. Follow [this tutorial](https://randomnerdtutorials.com/esp8266-nodemcu-firebase-realtime-database/#esp8266-read-data-firebase) for installation details, but the code given doesn't work because a few important lines are missing. The missing lines are given in the example by [Mozbit](https://github.com/mobizt/Firebase-ESP8266/blob/master/examples/ExternalClient/RTDB/Basic/Basic.ino) (the person whose library we are using).
3. Before moving on to the code, we need to make a user (for nodemcu) on Firebase by doing the following:
    1.  On the web-app console, in the side-menu, click **Authentication**, then **Get Started**
    2.  Set up a sign-in method of your choice (I used Google)
    3.  Go to the **Users** section and click **Add user** and enter the email and password. We will use this in the next step.
5. Now, the whole code for receiving data from Firebase is:
```
#include <Firebase_ESP_Client.h>
#include <Arduino.h>
#include "ESP8266WiFi.h"


//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// WiFi parameters to be configured
const char* ssid = "ssid"; // Write here your router's username
const char* password = "password"; // Write here your router's passward

#define API_KEY "api-key"
#define DATABASE_URL "https://name.firebaseio.com" 

#define USER_EMAIL "email" //this email should be the one created in "Authentication"
#define USER_PASSWORD "password" //this password should be the one created in "Authentication"

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;


unsigned long sendDataPrevMillis = 0;
int intValue;
float floatValue;
bool signupOK = false;


void setup(void)
{ 
  Serial.begin(115200);
  // Connect to WiFi
  WiFi.begin(ssid, password);

  // while wifi not connected yet, print '.'
  // then after it connected, get out of the loop
  while (WiFi.status() != WL_CONNECTED) {
     delay(300);
     Serial.print(".");
  }
  //print a new line, then print WiFi connected and the IP address
  Serial.println("");
  Serial.println("WiFi connected");
  // Print the IP address
  Serial.println(WiFi.localIP());

  //Firebase initialization
  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("ok");
    signupOK = true;
  }
  else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  if(Firebase.ready()){
    Serial.println("Ready Firebase");
  }
  else{
    Serial.println("Error");
  }

  pinMode(LED_BUILTIN, OUTPUT);
}
void loop() {
  
  if (Firebase.ready()){
    int iVal = 0;
    Serial.printf("Get int ref... %s\n", Firebase.RTDB.getInt(&fbdo, F("/devices/light1"), &iVal) ? String(iVal).c_str() : fbdo.errorReason().c_str());
    int light = 0;    
    Firebase.RTDB.getInt(&fbdo, F("/devices/light1"), &light);
    Serial.println("Light: ");
    Serial.print(light);

    if(light == 1){
      digitalWrite(LED_BUILTIN, LOW);
    }else{
      digitalWrite(LED_BUILTIN, HIGH);
    }
  }
}
```
## Final Comments 😶‍🌫️

Great! Now the built-in LED of the NodeMCU should turn on when the switch on the website is toggled. If there is any problem, feel free to create an issue or contact me!
