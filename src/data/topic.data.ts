import { query } from "../db";
import { Topics } from "../models/topics";

export async function createTopic(
  title: string,
  description: string
): Promise<Topics> {
  const { rows } = await query(
    `
      INSERT INTO topics (title, description, isCompleted)
      VALUES ($1, $2, $3)
      RETURNING id, title, description, isCompleted, created_at, updated_at
      `,
    [title, description, false]
  );

  return rows[0];
}

export async function getAllTopics(): Promise<Topics[]> {
  const { rows } = await query(
    `
      SELECT id, title, description, isCompleted, created_at, updated_at
      FROM topics
      ORDER BY created_at DESC
      `
  );

  return rows;
}

export async function updateTopicById(
  id: number,
  updates: Partial<Pick<Topics, "title" | "description" | "isCompleted">>
): Promise<Topics> {
  const fields = [];
  const values: any[] = [id];
  let index = 2;

  if (updates.title !== undefined) {
    fields.push(`title = $${index++}`);
    values.push(updates.title);
  }

  if (updates.description !== undefined) {
    fields.push(`description = $${index++}`);
    values.push(updates.description);
  }

  if (updates.isCompleted !== undefined) {
    fields.push(`isCompleted = $${index++}`);
    values.push(updates.isCompleted);
  }

  const queryText = `
    UPDATE topics
    SET ${fields.join(", ")}, updated_at = NOW()
    WHERE id = $1
    RETURNING id, title, description, isCompleted, created_at, updated_at
  `;

  const { rows } = await query(queryText, values);

  if (rows.length === 0) {
    throw new Error("No se encontró el topic con el ID proporcionado.");
  }

  return rows[0];
}