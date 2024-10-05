"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { toast } from "sonner";
import { databases } from "../appwrite.config";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID } from "../constans";
import { Appointment } from "../types/appwrite.types";
import {
  CreateAppointmentParams,
  UpdateAppointmentParams,
} from "../types/index.types";

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

    revalidatePath("/control-panel");
    return newAppointment;
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
    );
    return appointment;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentsList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")],
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount += 1;
            break;

          case "pending":
            acc.pendingCount += 1;
            break;

          default:
            acc.cancelledCount += 1;
            break;
        }

        return acc;
      },
      initialCounts,
    );

    const data = {
      totalCounts: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  appointment,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment,
    );

    if (!updatedAppointment) {
      toast.error("An error occurred while updating the appointment.");
    }

    revalidatePath("/control-panel");

    return updatedAppointment;
  } catch (error) {
    console.log(error);
  }
};
