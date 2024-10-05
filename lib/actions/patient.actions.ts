"use server";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
} from "@/lib/constans";
import { CreateUserParams, RegisterUserParams } from "@/lib/types/index.types";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { databases, storage, users } from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    );

    return { ...newUser, isExistingUser: false, hasPatientDocument: false };
  } catch (error: any) {
    if (error && error.code === 409) {
      const documents = await users.list([Query.equal("email", user.email)]);
      const existingUser = documents.users[0];

      const patient = await getPatient(existingUser.$id);

      return {
        ...existingUser,
        isExistingUser: true,
        hasPatientDocument: !!patient,
      };
    } else {
      console.log(error);
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)],
    );
    return patients.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  name,
  email,
  phone,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument.get("blobFile") as Blob,
        identificationDocument.get("fileName") as string,
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const existingUser = await users.get(patient.userId);

    if (existingUser.name !== name) {
      await users.updateName(patient.userId, name);
    }
    if (existingUser.email !== email) {
      await users.updateEmail(patient.userId, email);
    }
    if (existingUser.phone !== phone) {
      await users.updatePhone(patient.userId, phone);
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        email: email,
        name: name,
        phone: phone,
        ...patient,
      },
    );

    return newPatient;
  } catch (error) {
    console.log(error);
  }
};
