"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface ConfirmModalProps {
  open: boolean;

  title: string;

  description?: string;

  onClose: () => void;

  onConfirm: () => void;

  confirmText?: string;

  cancelText?: string;

  loading?: boolean;
}

export default function ConfirmModal({
  open,
  title,
  description,
  onClose,
  onConfirm,
  confirmText = "Ya",
  cancelText = "Batal",
  loading = false,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>

          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-description">{description}</p>
    </Modal>
  );
}
