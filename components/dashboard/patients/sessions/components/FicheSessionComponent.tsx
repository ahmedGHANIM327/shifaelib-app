import React, { FC } from 'react';
import { Session } from '@/lib/types/patients/sessions';
import { stringifyDateFormat } from '@/lib/utils';
import { SessionStatusComponent } from '@/components/dashboard/agenda/components/SessionStatusComponent';
import { EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSessionStore from '@/stores/patient/sessions';

export const FicheSessionComponent:FC<{session: Session}> = ({session}) => {

  const setViewAgendaSession = useSessionStore((state) => state.setViewAgendaSession);

  const openViewSession = () => {
    setViewAgendaSession({
      open: true,
      type: 'view',
      data: session
    });
  }

  return (
    <div className='mb-3 px-2 relative rounded-md border flex justify-between gap-x-4 p-2'>
      <div>
        <p className="text-sm">{stringifyDateFormat(session.startTime, 'frenchLocalDate')}</p>
        <p
          className="text-sm">{stringifyDateFormat(session.startTime, 'hh:mm')}-{stringifyDateFormat(session.endTime, 'hh:mm')}</p>
        <p className="text-sm font-mono text-primary mt-2">{session.tarif} MAD</p>
      </div>
      <div className="flex flex-col items-end justify-between gap-y-6 h-full top-0">
        <Button variant="link" className={'p-0'} onClick={openViewSession}>
          <EyeIcon size={15} />
        </Button>
        <SessionStatusComponent
          status={session.status}
        />
      </div>
    </div>
  );
};