'use client';
import React, { FC, useEffect, useRef, useState, useTransition } from 'react';
import { L10n, registerLicense } from '@syncfusion/ej2-base';
import {
  DataBindingEventArgs,
  Day,
  Inject, Month, NavigatingEventArgs,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
  WorkWeek
} from '@syncfusion/ej2-react-schedule';
import { loadCldr } from '@syncfusion/ej2-base';
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as gregorian from 'cldr-data/main/fr/ca-gregorian.json';
import * as numbers from 'cldr-data/main/fr/numbers.json';
import * as timeZoneNames from 'cldr-data/main/fr/timeZoneNames.json';
import { View } from '@syncfusion/ej2-schedule';
import { getViewBounds } from '@/lib/utils';
import { CalendarSession, Session, SessionsListingFilters } from '@/lib/types/patients/sessions';
import { DataManager } from '@syncfusion/ej2-data';
import { toast } from 'react-toastify';
import { getFilteredSessions } from '@/server/services/sessions';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { createCalendarSessions, getDaySchedule, getWorkingDays } from '@/lib/helpers/agenda';
import useUserStore from '@/stores/user';
import { DefaultOpeningHours } from '@/lib/constants';
import { WeekOpeningHours } from '@/lib/types';
import { SessionTemplate } from '@/components/dashboard/agenda/components/SessionTemplate';
import { User } from '@/lib/types/users';

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);

L10n.load({
  'fr': {
    'schedule': {
      'today': "Aujourd'hui",
      'day': 'Jour',
      'week': 'Semaine',
      'workWeek': 'Semaine de travail',
      'month': 'Mois',
      'agenda': 'Agenda',
    },
    'calendar': {
      'today': "Aujourd'hui",
      'day': 'Jour',
      'week': 'Semaine',
      'workWeek': 'Semaine de travail',
      'month': 'Mois',
      'agenda': 'Agenda',
    }
  }
});

type AgendaComponentProps = {
  users: string[];
  views: View[];
  height?: string;
  containerClassName?: string;
};

export const AgendaComponent:FC<AgendaComponentProps> = ({ users, views, height, containerClassName }) => {
  // @ts-ignore
  registerLicense(process.env.NEXT_PUBLIC_AGENDA_API_KEY || '');

  // @ts-ignore
  const scheduleObj = useRef<ScheduleComponent>(null);
  const [dateRange, setDateRange] = useState<{from: Date; to:Date}>(getViewBounds('WorkWeek', new Date()));
  const [view, setView] = useState<View>('WorkWeek');
  const [date, setDate] = useState<Date>(new Date());
  const [isLoading, startTransition] = useTransition();
  const [sessions, setSessions] = useState<Session[]>([] as Session[]);
  const [dataManager, setDataManager] = useState(new DataManager(createCalendarSessions(sessions)));
  const openingHours = useUserStore((state) => state.currentCabinet.openingHours) as WeekOpeningHours || DefaultOpeningHours;
  // @ts-ignore
  const workingDays = getWorkingDays(openingHours);

  useEffect(() => {
    setDateRange(getViewBounds(view, date));
  }, [view, date]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getFilteredSessions({
          from: dateRange.from,
          to: dateRange.to,
          responsible: users
        });
        if(response.ok && response?.data) {
          setSessions(response.data);
        } else {
          // @ts-ignore
          toast.error('Une erreur est servenue. Veuillez réessayer.');
        }
      } catch (error: any) {
        // @ts-ignore
        toast.error('Une erreur est servenue. Veuillez réessayer.');
      }
    });
  }, [dateRange]);

  useEffect(() => {
    setDataManager(new DataManager(createCalendarSessions(sessions)));
  }, [sessions]);

  const EventTemplate = (event: CalendarSession) => {
    const currentCalendarView = (scheduleObj?.current && scheduleObj?.current.currentView) || 'WorkWeek';
    return SessionTemplate(event, currentCalendarView);
  };

  const onNavigating = (args: NavigatingEventArgs): void => {
    if(args.action === 'date') {
      setDate(args.currentDate as Date);
    }
    if(args.action === 'view') {
      if( args.currentView === 'WorkWeek' ) {
        setView('Week');
      } else {
        setView(args.currentView as View);
      }
    }
  }

  // Set Working Hours
  const onDataBinding = (args: DataBindingEventArgs) => {
    const currentViewDates = scheduleObj?.current && scheduleObj?.current.getCurrentViewDates();
    const currentCalendarView = (scheduleObj?.current && scheduleObj?.current.currentView);
    if(currentCalendarView && currentViewDates && (currentCalendarView === 'Day' || currentCalendarView === 'WorkWeek' || currentCalendarView === 'Week')) {
      scheduleObj?.current && scheduleObj?.current.resetWorkHours();
      currentViewDates.map((day:any):void => {
        const dayIndex = day.getDay();
        // @ts-ignore
        const schedule = getDaySchedule(dayIndex, openingHours);
        scheduleObj?.current && scheduleObj?.current.setWorkHours([new Date(day)], schedule?.from || '', schedule?.to || '');
      })
    }
  }

  return (
    <div className={`relative ${containerClassName}`}>
      {isLoading && <div
        className={`bg-gray-300 opacity-50 absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center`}>
        <LoadingSpinner className={'text-primary'} size={50} />
      </div>}
      <ScheduleComponent
        eventSettings={{
          dataSource: dataManager,
          template: EventTemplate
        }}
        disabled={false}
        ref={scheduleObj}
        selectedDate={date}
        dataBinding={onDataBinding.bind(this)}
        navigating={onNavigating.bind(this)}
        showTimeIndicator={true}
        height={height || '85vh'}
        firstDayOfWeek={1}
        currentView={view}
        workDays={workingDays}
        rowAutoHeight={true}
        locale='fr'
        timeScale={
          {
            interval: 30,
            slotCount: 2,

          }
        }>
        <ViewsDirective>
          {views.includes('Day') && <ViewDirective option='Day' />}
          {views.includes('WorkWeek') &&<ViewDirective option='WorkWeek' />}
          {views.includes('Week') &&<ViewDirective option='Week' />}
          {views.includes('Month') &&<ViewDirective option='Month' />}
        </ViewsDirective>
        <Inject services={[Week, Day, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
  );
};