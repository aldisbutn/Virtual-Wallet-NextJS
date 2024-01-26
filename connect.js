const sqlite3 = require('sqlite3').verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

// Data for seeding the database
const usersData = [
  {
    userID: 1,
    username: 'aldisbutn',
    email: 'aldis.poga@gmail.com',
    password: '$2b$10$E4Wvgg3Spgzh7bXerb3Vau/TR/NhL1aJPdJvSKIKIMTdwuAxm9MFu',
    firstName: 'Aldis',
    lastName: 'Poga',
    country: 'Latvia',
  },
];

const walletsData = [
  {
    walletID: 1,
    userID: 1,
    name: 'My Wallet',
  },
];

const transactionsData = [
  {
    transactionID: 1,
    walletID: 1,
    type: 'deposit',
    amount: 10000,
    date: '2024-01-26 12:31:12',
    fraud: false,
  },
];

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  //Create users table and insert data
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
            userID INTEGER PRIMARY KEY,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT,
            firstName TEXT,
            lastName TEXT,
            country TEXT
        )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Table users created successfully');

      usersData.forEach((user) => {
        const { userID, username, email, password, firstName, lastName, country } = user;
        db.run(
          `INSERT INTO users (userID, username, email, password, firstName, lastName, country) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [userID, username, email, password, firstName, lastName, country],
          (err) => {
            if (err) {
              console.error(err.message);
            } else {
              console.log('Data inserted successfully into users table');
            }
            // Close the database connection when everything is done
            db.close((err) => {
              if (err) {
                return console.error(err.message);
              }
              console.log('Database connection closed.');
            });
          }
        );
      });
    }
  );
  //Create wallets table and insert data
  db.run(
    `CREATE TABLE IF NOT EXISTS wallets (
            walletID INTEGER PRIMARY KEY,
            userID INTEGER,
            name TEXT,
            FOREIGN KEY (userID) REFERENCES users(userID)
        )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Table wallets created successfully');

      walletsData.forEach((wallet) => {
        const { walletID, userID, name } = wallet;
        db.run(`INSERT INTO wallets (walletID, userID, name) VALUES (?, ?, ?)`, [walletID, userID, name], (err) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log('Data inserted successfully into wallets table');
          }
          // Close the database connection when everything is done
          db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Database connection closed.');
          });
        });
      });
    }
  );
  //Create transactions table and insert data
  db.run(
    `CREATE TABLE IF NOT EXISTS transactions (
            transactionID INTEGER PRIMARY KEY,
            walletID INTEGER,
            type TEXT,
            amount INTEGER,
            date TEXT,
            fraud BOOLEAN,
            FOREIGN KEY (walletID) REFERENCES wallets(walletID)
        )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Table transactions created successfully');

      transactionsData.forEach((transaction) => {
        const { transactionID, walletID, type, amount, date, fraud } = transaction;
        db.run(
          `INSERT INTO transactions (transactionID, walletID, type, amount, date, fraud) VALUES (?, ?, ?, ?, ?, ?)`,
          [transactionID, walletID, type, amount, date, fraud],
          (err) => {
            if (err) {
              console.error(err.message);
            } else {
              console.log('Data inserted successfully into transactions table');
            }
            // Close the database connection when everything is done
            db.close((err) => {
              if (err) {
                return console.error(err.message);
              }
              console.log('Database connection closed.');
            });
          }
        );
      });
    }
  );
});
