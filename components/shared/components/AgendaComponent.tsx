'use client';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { L10n, registerLicense } from '@syncfusion/ej2-base';
import {
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
import { CalendarSession, Session } from '@/lib/types/patients/sessions';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { toast } from 'react-toastify';
import { getFilteredSessions } from '@/server/services/sessions';
import { LoadingSpinner } from '@/components/shared/components/LoadingSpinner';
import { createCalendarSessions } from '@/lib/helpers/agenda';

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

export const AgendaComponent = () => {
  registerLicense('ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Xd0xiXHtYdHJUQWRd');

  const [dateRange, setDateRange] = useState<{from: Date; to:Date}>(getViewBounds('WorkWeek', new Date()));
  const [view, setView] = useState<View>('WorkWeek');
  const [date, setDate] = useState<Date>(new Date());

  const scheduleObj = useRef<ScheduleComponent>(null);
  const [isLoading, startTransition] = useTransition();
  const [sessions, setSessions] = useState<Session[]>([] as Session[]);

  const [dataManager, setDataManager] = useState(new DataManager(createCalendarSessions(sessions)));

  useEffect(() => {
    setDateRange(getViewBounds(view, date));
  }, [view, date]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getFilteredSessions({
          from: dateRange.from,
          to: dateRange.to,
          responsible: [],
          patient: [],
          service: [],
          status: 'ALL'
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

  return (
    <div>
      <ScheduleComponent
          eventSettings={{
            dataSource: dataManager,
          }}
          disabled={false}
          selectedDate={date}
          ref={scheduleObj}
          navigating={onNavigating.bind(this)}
          showTimeIndicator={true}
          height={'80vh'}
          firstDayOfWeek={1}
          currentView={view}
          rowAutoHeight={true}
          locale='fr'
          timeScale={
            {
              interval: 30,
              slotCount: 1,

            }
          }>
          <ViewsDirective>
            <ViewDirective option='Day' />
            <ViewDirective option='WorkWeek' />
            <ViewDirective option='Week' />
            <ViewDirective option='Month' />
          </ViewsDirective>
          <Inject services={[Week, Day, WorkWeek, Month]} />
        </ScheduleComponent>
    </div>
  );
};