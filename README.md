<p align="center">
  <img src="https://media.tenor.com/cVdLW-0baz0AAAAM/cats-chat.gif" />
</p>

# Opa❗Suite Test

A basic chat to assess technical skills



## ✨ Technologies

- React ⚛
- NextJS ⚛
- Socket.IO 🕸
- Express
- MongoDB 🍃
- Mongoose 🍃
- Radix-UI
- JWT
- Docker 🐳
- Bcrypt 🔒
- React-Hook Form
- date-fns
## 💻 Running locally

Clone the project

```bash
  git clone git@github.com:Maymisk/OpaSuite.git
```

Change directories

```bash
  cd OpaSuite
```

### First, let's get down to running the back-end 💻

Change directories

```bash
  cd back
```

Install the dependencies

```bash
  yarn
  or
  npm install
```


Assuming you have docker installed, run the docker-compose file:

```bash
  docker-compose up
```

This will set up the mongoDB database and Mongo Express, a GUI you can use to see the database changes.

### Using Mongo Express 🍃

#### In order to access Mongo Express, [access the link on your browser](http://localhost:8081) (localhost, port 8081).

You will be prompted to insert credentials to access the database. The credentials are as follows: 
```bash
  username: admin
  password: pass
```

Then, you should be able to use Mongo Express freely.

### Running the back-end server

Now, with our database online, it's time to actually run the server. First of all, you should create two environment variables in a .env file, following the example in [.env.example](/.env.example). These are the token secrets and they are necessary for the authentication to work.


Considering you're in the directory /OpaSuite/back and with environment variables set up, run the following command:

```bash
  yarn dev
  or
  npm run dev
```

Now, your back-end should be online.

### Running the client

To run the client, considering you're in the root directory (/OpaSuite), change directories with the following command:

```bash
  cd front
```

Install the dependencies

```bash
  yarn
  or
  npm install
```

In order for the front-end to run properly, your database and back-end should already be online. If that's the case, run the command:


```bash
  yarn dev
```

and you're ready to go!



## ✅ Features

- User Sign Up
- User Login
- Listing of online users
- Notifications
- Real Time chat and status updates



## 🔧 Improvements

- The refresh token feature does not work completely; the token cookies need to be updated in the client in order to maintain the user session and provide a seamless "reauthentication" process to the user. This could probably be done using NextJS middlewares.

- Make the client code more organized and readable.

- Create Tests with Jest

## 📝 Side Notes
- The back-end alone can be tested using software like postman or insomnia; however, the controllers and routes must be manually checked.
