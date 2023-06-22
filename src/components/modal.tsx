import { Fragment, ReactNode, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

export const Modal = ({ children, onClose }: ModalProps) => {
  const [open, setOpen] = useState(true);

  const onModalClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onModalClose}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child as={Fragment}>
              <Dialog.Panel className="relative bg-gray-900 text-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl sm:my-8 sm:max-w-3xl sm:w-full sm:p-6 max-h-[32rem] overflow-y-scroll">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
