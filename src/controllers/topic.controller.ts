import { Request, Response, NextFunction } from "express";
import { addTopic, fetchAllTopics, updateTopic } from "../services/topic.service";
import { ApiError } from "../middlewares/error";

export const createTopicController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "El título es obligatorio",
      });
    }

    const newTopic = await addTopic(title, description);

    return res.status(201).json({
      success: true,
      message: "Topic creado exitosamente",
      data: newTopic,
    });
  } catch (error: any) {
    return next(new ApiError("Error interno del servidor", 500));
  }
};

export const getAllTopicsController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topics = await fetchAllTopics();

    return res.json({
      success: true,
      message: "Topics obtenidos exitosamente",
      data: topics,
    });
  } catch (error: any) {
    return next(new ApiError("Error interno del servidor", 500));
  }
};

export const updateTopicController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "El ID del topic es obligatorio y debe ser un número.",
      });
    }

    const updates: Partial<{ title: string; description: string; isCompleted: boolean }> = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (isCompleted !== undefined) updates.isCompleted = isCompleted;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Debe proporcionar al menos un campo para actualizar.",
      });
    }

    // Llamar al servicio de actualización
    const updatedTopic = await updateTopic(Number(id), updates);

    return res.status(200).json({
      success: true,
      message: "Topic actualizado exitosamente",
      data: updatedTopic,
    });
  } catch (error: any) {
    if (error.message.includes("No se encontró")) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return next(new ApiError("Error interno del servidor", 500));
  }
};