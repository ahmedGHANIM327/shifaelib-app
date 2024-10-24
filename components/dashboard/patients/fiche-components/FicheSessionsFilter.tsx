import React, {FC, useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {Session} from "@/lib/types/patients/sessions";

type TreatmentFiltersDataType = {
  total: number;
  scheduled: number;
  attended: number;
  not_attended: number;
  canceled: number;
}

export const FicheSessionsFilter:FC<{
  index: string;
  setIndex: (index: string) => void;
  sessions: Session[];
}> = ({
        index,
        setIndex,
        sessions
      }) => {

  const [data, setData] = useState<TreatmentFiltersDataType>({
    total: 0,
    scheduled: 0,
    attended: 0,
    not_attended: 0,
    canceled: 0,
  });

  useEffect(()=>{
    setData({
      total: sessions.length,
      scheduled: sessions.filter((s)=>s.status==='SCHEDULED').length,
      attended: sessions.filter((s)=>s.status==='ATTENDED').length,
      not_attended: sessions.filter((s)=>s.status==='NOT_ATTENDED').length,
      canceled: sessions.filter((s)=>s.status==='CANCELED').length,
    })
  },[sessions]);

  const TIMELINE_SESSION_FILTERS = 'flex justify-center items-center py-2 border rounded-md cursor-pointer text-sm min-w-[220px]';
  return (
    <div className='w-full my-2 grid xl:grid-cols-5 gap-2 lg:grid-cols-4 md:grid-cols-3'>
      <div
        className={cn('border-black',
          TIMELINE_SESSION_FILTERS,
          index === 'ALL' && 'bg-black text-white',
        )}
        onClick={() => setIndex('ALL')}
      >
        Tous
        <span
          className={cn('bg-black text-xs text-white w-5 h-5 flex justify-center items-center rounded-full ml-2',
            index === 'ALL' && 'bg-white text-black',
          )}>{data.total}</span>
      </div>
      <div
        className={cn('text-blue-600 border-blue-600',
          TIMELINE_SESSION_FILTERS,
          index === 'SCHEDULED' && 'bg-blue-600 text-white',
        )}
        onClick={() => setIndex('SCHEDULED')}
      >
        Programmées
        <span
          className={cn('bg-blue-600 text-xs text-white w-5 h-5 flex justify-center items-center rounded-full ml-2',
            index === 'SCHEDULED' && 'bg-white text-blue-600',
          )}>{data.scheduled}</span>
      </div>
      <div
        className={cn('border-green-600 text-green-600',
          TIMELINE_SESSION_FILTERS,
          index === 'ATTENDED' && 'bg-green-600 text-white',
        )}
        onClick={() => setIndex('ATTENDED')}
      >
        Assistées
        <span
          className={cn('bg-green-600 text-xs text-white w-5 h-5 flex justify-center items-center rounded-full ml-2',
            index === 'ATTENDED' && 'bg-white text-green-600',
          )}>{data.attended}</span>
      </div>
      <div
        className={cn('border-gray-500 text-gray-500',
          TIMELINE_SESSION_FILTERS,
          index === 'NOT_ATTENDED' && 'bg-gray-500 text-white',
        )}
        onClick={() => setIndex('NOT_ATTENDED')}
      >
        Non assistées
        <span
          className={cn('bg-gray-500 text-xs text-white w-5 h-5 flex justify-center items-center rounded-full ml-2',
            index === 'NOT_ATTENDED' && 'bg-white text-gray-500',
          )}>{data.not_attended}</span>
      </div>
      <div
        className={cn('border-red-500 text-red-500',
          TIMELINE_SESSION_FILTERS,
          index === 'CANCELED' && 'bg-red-500 text-white',
        )}
        onClick={() => setIndex('CANCELED')}
      >
        Annulées
        <span
          className={cn('bg-red-500 text-xs text-white w-5 h-5 flex justify-center items-center rounded-full ml-2',
            index === 'CANCELED' && 'bg-white text-red-500',
          )}>{data.canceled}</span>
      </div>
    </div>
  );
};