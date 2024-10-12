import React, {FC, useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {Treatment} from "@/lib/types/patients/treatments";

type TreatmentFiltersDataType = {
  total: number;
  in_progress: number;
}

export const FicheTreatmentFilters:FC<{
  status: string;
  setStatus: (status: string) => void;
  treatments: Treatment[]
}> = ({
        status,
        setStatus,
        treatments
      }) => {

  const [data, setData] = useState<TreatmentFiltersDataType>({
    total: 0,
    in_progress: 0,
  });

  useEffect(()=>{
    setData({
      total: treatments.length,
      in_progress: treatments.filter((t)=>t.status==='IN_PROGRESS').length
    })
  },[treatments]);

  return (
    <div className='gap-y-2 mb-2 grid md:grid-cols-2 grid-cols-1 max-w-[600px] text-sm'>
      <div
        className={cn('px-6 py-2 flex justify-center items-center gap-y-4 border border-transparent border-b-primary text-primary cursor-pointer',
          status === 'ALL' && 'bg-primary text-white',
        )}
        onClick={() => setStatus('ALL')}
      >
        Tous les traitements <span
        className={cn('bg-primary text-white w-5 h-5 flex justify-center items-center rounded-full ml-2',
          status === 'ALL' && 'bg-white text-primary',
        )}>{data.total}</span>
      </div>
      <div
        className={cn('px-6 py-2 flex justify-center items-center gap-y-4 border border-transparent border-b-green-800 text-green-800 cursor-pointer',
          status === 'IN_PROGRESS' && 'bg-green-800 text-white',
        )}
        onClick={() => setStatus('IN_PROGRESS')}
      >
        Traitements en cours <span
        className={cn('bg-green-800 text-white w-5 h-5 flex justify-center items-center rounded-full ml-2',
          status === 'IN_PROGRESS' && 'bg-white text-green-800',
        )}>{data.in_progress}</span>
      </div>
    </div>
  );
};