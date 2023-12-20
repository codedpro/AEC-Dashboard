import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { userService } from "../../services";

const usersFilePath = path.join(process.cwd(), "src", "data", "users.json");

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const usersData = fs.readFileSync(usersFilePath, "utf-8");
      const users = JSON.parse(usersData);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error reading user data" });
    }
  } else if (req.method === "POST") {
    try {
      const usersData = fs.readFileSync(usersFilePath, "utf-8");
      const users = JSON.parse(usersData);
      const newUser = req.body;
      newUser.id = Date.now().toString();
      users.push(newUser);

      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  } else if (req.method === "PUT") {
    try {
      const usersData = fs.readFileSync(usersFilePath, "utf-8");
      const users = JSON.parse(usersData);
      const updatedUser = req.body;
      const index = users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        users[index] = updatedUser;
        fs.writeFileSync(
          usersFilePath,
          JSON.stringify(users, null, 2),
          "utf-8"
        );
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      const usersData = fs.readFileSync(usersFilePath, "utf-8");
      const users = JSON.parse(usersData);
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        users.splice(index, 1);
        fs.writeFileSync(
          usersFilePath,
          JSON.stringify(users, null, 2),
          "utf-8"
        );
        res.status(204).end();
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
