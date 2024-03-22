# Chatroom #

An overview of the application

- A basic server-side application built with Node.js, Express, and Socket.io. which acts as server to multiple clients to which would connect
- A basic chat app is developed with React, Production build of the same is being served as static file to the port 3000, thus as soon as server is started chat app will be rendered.
- As for the concurrency,it is achieved through an event-driven, non-blocking I/O model of Javascript.

Please follow the steps given below to setup the project,before setting up you need to first get the project on your system for the same please :
- Run this command in you terminal ```git clone https://github.com/omkarChend1kar/chatroom_.git```
- Otherwise download the zipped code file with button named "Code"

Once code is available on your system follow below steps to get it up and running
- Setup for client application
  - After ensuring that you are in project directory, go to the directory client ```cd client```
  - Run ``` npm install ```
  - Run ``` npm build dev ```

Now that client application is ready, let's setup server application

- Setup for server application
  - Since you would be in client directory, you have to get to server directory to get started, thus run ```cd../server```
  - Now run ``` npm install ```
  - Run ``` npm start ```.
  - Now go to port 3000 or go to ``` http://localhost:3000/ ```

All setup!!, Now you must be able to see chat screen, open the same url in different windows for multiple clients.


<img width="1674" alt="Screenshot 2024-03-13 at 3 53 12 PM" src="https://github.com/omkarChend1kar/chatroom_/assets/71365710/df4d1d4b-d303-4758-a46e-a09001af4a4a">




