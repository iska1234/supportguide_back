import { createTopic, getAllTopics, updateTopicById } from "../data/topic.data";
import { Topics } from "../models/topics";

export async function addTopic(
  title: string,
  description: string
): Promise<Topics> {
  if (!title || title.trim() === "") {
    throw new Error("El título es obligatorio");
  }

  const newTopic = await createTopic(title, description);
  return newTopic;
}

export async function fetchAllTopics(): Promise<Topics[]> {
  const topics = await getAllTopics();
  if (!topics || topics.length === 0) {
    throw new Error("No hay topics disponibles");
  }
  return topics;
}

export async function updateTopic(
  id: number,
  updates: Partial<Pick<Topics, "title" | "description" | "isCompleted">>
): Promise<Topics> {
  if (!id || id <= 0) {
    throw new Error("El ID del topic es obligatorio y debe ser mayor que 0.");
  }

  const updatedTopic = await updateTopicById(id, updates);
  return updatedTopic;
}