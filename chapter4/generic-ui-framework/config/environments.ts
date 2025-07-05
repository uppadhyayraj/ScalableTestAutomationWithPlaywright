// config/environments.ts
import test from "node:test";
import users from "../data/users.json";
export const environments = {
  dev: {
    baseUrl: "https://dev.saucedemo.com",
    username: "",
    password: "",
    testDataFiles: ["../data/product.json","../data/users.json"],
  },
  staging: {
    baseUrl: "https://staging.saucedemo.com",
    username: "",
    password: "",
    testDataFiles: ["../data/product.json", "../data/users.json"],
  },
  prod: {
    baseUrl: "https://www.saucedemo.com",
    username: users.standardUser.username,
    password: users.standardUser.password,
    testDataFiles: ["../data/product.json", "../data/users.json"],
  }
};

export const currentEnv = process.env.TEST_ENV || "prod";
export const envConfig = environments[currentEnv];