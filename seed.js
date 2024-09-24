import userModel, { ROLES } from "./models/user.model.js";
import bcrypt from "bcrypt";

export const createSuperAdmin = async () => {
  const hashedPassword = await bcrypt.hash("1234", 10);
  userModel
    .create({
      username: "admin",
      password: hashedPassword,
      fullName: "SuperAdmin",
      role: ROLES.SUPER_ADMIN,
    })
    .then((res) => {
      console.log("created");
    })
    .catch((err) => {
      console.log(err);
    });
};
