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
