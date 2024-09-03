import { ID } from "node-appwrite";
import { databases } from "../appwrite.config";
import { DATABASE_ID, PATIENT_COLLECTION_ID } from "../constans";
import { CreateAppointmentParams } from "../types/index.types";

export const createAppointment = async (
  appointment: CreateAppointmentParams,
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      appointment,
    );

    return newAppointment;
  } catch (error) {
    throw error;
  }
};
