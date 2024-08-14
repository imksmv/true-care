export const SETTINGS = {
  name: "True Care",
  description: "True Care is an app",
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

export const GENDER_OPTIONS = ["Male", "Female", "Other"];

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
