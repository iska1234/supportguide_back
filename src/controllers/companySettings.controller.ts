import { NextFunction, Request, Response } from "express";
import z from "zod";
import {
  createSettingsForUser,
  getSettingsByUserId,
} from "../services/companySettings.service";
import { ApiError } from "../middlewares/error";

const companySettingsSchema = z.object({
  userId: z.number(),
  isIntroCheck: z.boolean().optional().default(false),
  isDedicatoryAvaliable: z.boolean().optional().default(false),
});

export const createCompanySettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, isIntroCheck, isDedicatoryAvaliable } =
      companySettingsSchema.parse(req.body);

    const settings = await createSettingsForUser(
      userId,
      isIntroCheck,
      isDedicatoryAvaliable
    );

    return res.status(201).json({
      success: true,
      message: "Configuraciones creadas exitosamente",
      data: settings,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Error de validación en los datos enviados",
        details: error.errors,
      });
    }
    return next(new ApiError("Error interno del servidor", 500));
  }
};

export const getCompanySettings = async (
  req: Request,
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
    const settings = await getSettingsByUserId(userId);

    return res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return next(new ApiError("Error interno del servidor", 500));
  }
};
