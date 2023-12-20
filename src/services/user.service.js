import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "../helpers/";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  getAll,
  getFirstName,
  getUsername,
  getLastName,
  getRole,
  getUserInfo,
  authorize,
};

function login(username, password) {
  return fetchWrapper
    .post(`${baseUrl}/authenticate`, { username, password })
    .then((user) => {
      userSubject.next(user);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function authorize(allowedRoles) {
  const user = userSubject.value;

  if (!user) {
    return false;
  }

  if (allowedRoles && allowedRoles === user.role) {
    return false;
  }

  return true;
}

function logout() {
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/login");
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}
function getUsername() {
  const user = userSubject.value;
  return user ? user.username : null;
}

function getFirstName() {
  const user = userSubject.value;
  return user ? user.firstName : null;
}

function getLastName() {
  const user = userSubject.value;
  return user ? user.lastName : null;
}

function getRole() {
  const user = userSubject.value;
  return user ? user.role : null;
}

function getUserInfo() {
  const user = userSubject.value;
  return user
    ? {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      }
    : null;
}
