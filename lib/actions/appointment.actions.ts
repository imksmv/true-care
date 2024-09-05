"use server";

import { ID } from "node-appwrite";
import { databases } from "../appwrite.config";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID } from "../constans";
import { CreateAppointmentParams } from "../types/index.types";

export const createAppointment = async (
  appointment: CreateAppointmentParams,
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment,
    );
    console.log(newAppointment);

    return newAppointment;
  } catch (error) {
    console.log(error);
  }
};
