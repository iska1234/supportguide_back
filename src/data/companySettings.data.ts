import { query } from "../db/index";

export async function createCompanySettings(
  userId: number,
  isIntroCheck: boolean = false,
  isDedicatoryAvaliable: boolean = false
) {
  const { rows } = await query(
    `INSERT INTO companySettings (userId, isIntroCheck, isDedicatoryAvaliable)
     VALUES ($1, $2, $3) RETURNING *`,
    [userId, isIntroCheck, isDedicatoryAvaliable]
  );

  return rows[0];
}

export async function getCompanySettingsByUserId(userId: number) {
  const { rows, rowCount } = await query(
    `SELECT * FROM companySettings WHERE userId = $1`,
    [userId]
  );

  if (rowCount === 0) return null;
  return rows[0];
}
