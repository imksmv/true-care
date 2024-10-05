"use client";

import { DOCTORS } from "@/lib/constans";
import { Appointment } from "@/lib/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import StatusBadge from "../StatusBadge";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p>{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => <p>{row.original.patient.name}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p>{formatDate(row.original.schedule, "HH:mm — MMM dd, yyyy")}</p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = DOCTORS.find(
        (doc) => doc.name === row.original.primaryPhysician,
      );

      return (
        <div className="flex items-center gap-2">
          <Image
            src={doctor?.image!}
            alt={doctor?.name!}
            width={20}
            height={20}
            priority
          />
          <p>Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4 text-end">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex justify-end gap-3">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />

          <AppointmentModal
            type="cancel"
            status={data.status}
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
        </div>
      );
    },
  },
];
