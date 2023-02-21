import { Dialog } from "@headlessui/react";
import { FC } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Modal: FC<Props> = ({
  open,
  onClose,
  children,
  title,
  description,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <Dialog.Backdrop className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded-lg p-4">
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          {children}
        </Dialog.Panel>
      </Dialog.Backdrop>
    </Dialog>
  );
};
