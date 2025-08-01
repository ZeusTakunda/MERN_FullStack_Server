import express from "express"

import { create, deleteUser, getUserByid, updateUser } from "../controller/userController.js"
import { getAllUsers } from "../controller/userController.js"

const route = express.Router();

route.post("/user", create);
route.get("/users", getAllUsers);
route.get("/user/:id", getUserByid);
route.put("/update/user/:id", updateUser);
route.delete("/delete/user/:id", deleteUser);

export default route;

