"use client";

import { CircleAlert, CircleCheck, Info, XCircle } from "lucide-react";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertModalProps {
  open: boolean;

  title: string;

  description: string | string[];

  type?: AlertType;

  buttonText?: string;

  onClose: () => void;
}

export default function AlertModal({
  open,
  title,
  description,
  type = "info",
  buttonText = "OK",
  onClose,
}: AlertModalProps) {
  const config = {
    success: {
      icon: CircleCheck,
      color: "text-success",
      bg: "bg-success/10",
    },

    error: {
      icon: XCircle,
      color: "text-danger",
      bg: "bg-danger/10",
    },

    warning: {
      icon: CircleAlert,
      color: "text-warning",
      bg: "bg-warning/10",
    },

    info: {
      icon: Info,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  };

  const Icon = config[type].icon;

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center">
        <div
          className={`mb-5 flex h-16 w-16 items-center justify-center rounded-full ${config[type].bg}`}
        >
          <Icon size={34} className={config[type].color} />
        </div>

        <h2 className="text-xl font-semibold text-text">{title}</h2>

        <p className={`mt-3 text-description ${(typeof description != "string") && "bg-red-100 p-3 rounded-md text-red-500"}`}>{typeof description == 'string' ? description : description.map((e) => <>{e}<br/></>)}</p>

        <div className="mt-8 w-full">
          <Button fullWidth onClick={onClose}>
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
