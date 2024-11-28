import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middlewares/error";
import z from "zod";
import { verifyEmail } from "../data/auth.data";
import { fetchUserDataById, loginUserToken, registerUserToken } from "../services/auth.service";
import { userSchema } from "../models/users";


export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, lastname, email, password, role } = userSchema.parse(req.body);
    const existingUser = await verifyEmail(email);
    if (existingUser) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "El correo electrónico ya está registrado",
        }
      });
    }
    const user = await registerUserToken(name, lastname ,email, password || '', role);

    return res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      data: user,
    });
  } catch (error: any) {
    console.error("Error en el registro:", error);

    if (error.code === "23505" && error.constraint === "users_email_key") {
      return res.status(400).json({
        ok: false,
        error: {
          message: "El correo electrónico ya está registrado",
        }
      });
    } else if (error instanceof ApiError) {
      return res.status(error.status).json({
        ok: false,
        error: { message: error.message, details: error.details || {} }
      });
    } else if (error instanceof z.ZodError) {
      const details: Record<string, string> = {}

      error.errors.forEach(err => {
        switch (err.path[0]) {
          case 'name':
            details['name'] = "El campo 'name' es obligatorio";
            break;
          case 'lastname':
            details['lastname'] = "El campo 'lastname' es obligatorio";
            break;
          case 'email':
            details['email'] = "El formato del campo 'email' es inválido";
            break;
          case 'password':
            details['password'] = "La contraseña debe tener al menos 5 caracteres";
            break;
          default:
            break;
        }
      });

      if (!('name' in req.body)) {
        details['name'] = "No se encontró el campo 'name' en la solicitud";
      }
      if (!('lastname' in req.body)) {
        details['lastname'] = "No se encontró el campo 'lastname' en la solicitud";
      }
      if (!('email' in req.body)) {
        details['email'] = "No se encontró el campo 'email' en la solicitud";
      }
      if (!('password' in req.body)) {
        details['password'] = "No se encontró el campo 'password' en la solicitud";
      }

      const errorMessage = "Error en el registro";

      return res.status(400).json({
        ok: false,
        error: {
          message: errorMessage,
          details: details
        }
      });
    } else {
      return next(new ApiError("Error interno del servidor", 500));
    }
  }
};


export const login = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const { token } = await loginUserToken(email, password);


    return res.json({
      success: true,
      message: "Successful login",
      data: { token },
    });
  } catch (error) {

    if (error instanceof ApiError) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getUserByIdController = async (
  req: Request & { userId?: number },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "No autorizado. No se encontró el userId en el token.",
      });
    }

    const user = await fetchUserDataById(userId);

    return res.json({
      success: true,
      message: "Usuario encontrado",
      data: user,
    });
  } catch (error: any) {
    return next(new ApiError("Error interno del servidor", 500));
  }
};

// export const logout = (req: Request, res: Response, next: NextFunction) => {
//   req.session.destroy((error) => {
//     if (error) {
//       next(error);
//     } else {
//       res.clearCookie("connect.sid");
//       res.json({ ok: true, message: "Logout exitoso" });
//     }
//   });
// };