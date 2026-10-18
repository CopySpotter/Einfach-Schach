import fs from 'fs';
import path from 'path';
import { Chapter } from '../interfaces/training';
import { User } from '../interfaces/user';

const usersFile = path.join(process.cwd(), 'src', 'data', 'users.json');
const emptyUsers: User[] = require('../data/users.example.json');

// users in JSON file for simplicity, store in a db for production applications
// A fresh download deliberately has no users.json yet.  Use the tracked empty
// template until the first profile is saved, instead of preventing the app
// from starting.
let users: User[] = fs.existsSync(usersFile)
  ? JSON.parse(fs.readFileSync(usersFile, 'utf8'))
  : [...emptyUsers];
const chapters: Chapter[] = require('../data/training.json');

export const usersRepo = {
  getAll: () => users,
  getById: (id) => users.find((x) => x.id.toString() === id.toString()),
  find: (x) => users.find(x),
  create,
  updateGame,
  update,
  delete: _delete
};

export const trainingRepo = {
  getAll: () => chapters,
  getById: (id) => chapters.find((x) => x.id.toString() === id.toString()),
  find: (x): Chapter => chapters.find(x)
};

function create(user: User, img: string): User {
  // generate new user id

  user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
  user.name = user.name + user.id.toString();
  if (img) {
    (async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ img: [img], username: user.name })
      };
      const response = await fetch(
        'http://127.0.0.1:5000/register',
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      if (data.success != true) {
        console.log(data.error);
      }
    })();
  }

  // set date created and updated
  user.dateCreated = new Date().toISOString();
  user.dateUpdated = new Date().toISOString();

  // add and save user
  users.push(user);
  saveData();
  return user;
}

function updateGame(id: number, fen: string): boolean {
  const user = users.find((x) => x.id.toString() === id.toString());
  if (!user) return false;

  user.currentGame = fen;
  user.dateUpdated = new Date().toISOString();

  saveData();
  return true;
}

function update(id: number, params: User): boolean {
  const user = users.find((x) => x.id.toString() === id.toString());
  if (!user) return false;

  // set date updated
  user.dateUpdated = new Date().toISOString();

  // update and save
  Object.assign(user, params);
  saveData();
  return true;
}

function _delete(id: number) {
  // filter out deleted user and save
  users = users.filter((x) => x.id.toString() !== id.toString());
  saveData();
}

function saveData() {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 4));
}
