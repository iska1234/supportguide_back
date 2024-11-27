import bcrypt from "bcryptjs";

import { ApiError } from "../middlewares/error";
import { generateToken } from "../utils/token";
import { getUserIdByEmail, loginUser, registerUser } from "../data/auth.data";
import { UserData } from "../models/users";


export async function registerUserToken(
  name: string,
  lastname:string,
  email: string,
  password: string,
  role: string = "chofer"
): Promise<UserData> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await registerUser(name, lastname ,email, hashedPassword, role);

  return user;
}

export const loginUserToken = async (
  email: string,
  password: string
): Promise<{ id: number; token: string; role: string }> => {
  const userId = await getUserIdByEmail(email);
  if (!userId) {
    throw new ApiError("El usuario no existe", 400);
  }

  const user = await loginUser(email, password);
  if (!user) {
    throw new ApiError("Contraseña incorrecta", 400);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new ApiError("Contraseña incorrecta", 400);
  }

  const token = generateToken({ userId, role: user.role || "" });

  return { id: userId, token, role: user.role };
};