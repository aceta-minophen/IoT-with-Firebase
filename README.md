# IoT-with-Firebase
An easy to follow tutorial for using Firebase to transfer data from website to Wi-Fi module (NodeMCU). This code focuses on making a simple toggle switch to turn light on and off, but can be expanded for receiving and sending more data (integers, strings or bool) following the same steps.
## Components and Tools Used 🧮
### Softwares

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

### Firebase
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

