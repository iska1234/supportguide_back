import { ApiError } from "../middlewares/error";
import {
  createCompanySettings,
  getCompanySettingsByUserId,
} from "../data/companySettings.data";

export async function createSettingsForUser(
  userId: number,
  isIntroCheck: boolean = false,
  isDedicatoryAvaliable: boolean = false
) {
  const existingSettings = await getCompanySettingsByUserId(userId);

  if (existingSettings) {
    throw new ApiError(
      "El usuario ya tiene configuraciones creadas.",
      400
    );
  }

  const settings = await createCompanySettings(
    userId,
    isIntroCheck,
    isDedicatoryAvaliable
  );

  return settings;
}

export async function getSettingsByUserId(userId: number) {
  const settings = await getCompanySettingsByUserId(userId);

  if (!settings) {
    throw new ApiError(
      "Configuraciones no encontradas para el usuario.",
      404
    );
  }

  return settings;
}
