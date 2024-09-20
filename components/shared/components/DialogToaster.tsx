import React, { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { SendIcon } from 'lucide-react';

type DialogToasterProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
};

export const DialogToaster: FC<DialogToasterProps> = ({
  isOpen,
  setIsOpen,
  description,
  icon,
  actions
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="px-10 py-6 md:max-w-2xl max-w-[90%]">
        <DialogHeader className="items-center space-y-4">
          <DialogTitle>
            {icon}
          </DialogTitle>
          <DialogDescription className="text-center text-sm mt-4 text-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex gap-2 items-center !justify-center'>
          {actions}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
