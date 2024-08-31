import { Gender } from "./types/index.types";

export const PATIENT_FORM_DEFAULT_VALUES = {
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsentCheck: false,
  disclosureConsentCheck: false,
  privacyConsentCheck: false,
};

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

export const GENDER_OPTIONS = ["male", "female", "other"];

export const DOCTORS = [
  {
    image: "/dr-green.png",
    name: "John Green",
  },
  {
    image: "/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const IDENTIFICATION_TYPES = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];
