import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { InterviewService } from '../interview.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import add from 'date-fns/add';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Router } from '@angular/router';
import { Observable, Subject, pipe, of, throwError } from 'rxjs';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css'],
  providers: [InterviewService]
})
export class EmpInterviewListComponent implements OnInit {
  interviews;
  interviewDate = [];
  public now: Date = new Date();
  flag = true;
  constructor(
    private modal: NgbModal,
    public interviewService: InterviewService,

    private _flashMessagesService: FlashMessagesService,
    public router: Router
  ) {
    setInterval(() => {
      this.now = new Date();
    }, 3000);
  }


  dateArray: any = [];
  dataa: any = [];
  dataObject: any = {};
  viewSwitch: boolean = true;

  ngOnInit() {
    this.interviewService.fetchInterview();

    this.interviewService.getInterviews().subscribe((data) => {
      this.interviews = data["data"];
      this.interviewDate = this.interviews.map(interview => this.now > new Date(interview["date"]));
    });

    this.interviewService.fetchEmployeeInterview()
      .subscribe(res => {
        this.dataa = res;
        this.dataa.data.forEach(element => {
          this.dataObject =
          {
            start: new Date(element.date),
            end: addHours(new Date(element.date), 1),
            title: 'interview added with ID' + element.id,
            id: element.id,
            color: colors.red,
            actions: this.actions,
            allDay: false,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          }
          this.dateArray.push(this.dataObject);
        });
        this.events = this.dateArray;
      });

  }

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [

  ];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event.id);
    this.router.navigate(["/emprev/details", event.id]);

  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  // }

  showInterviews() {
    this.flag = !this.flag;
    return this.flag;
  }

  toggleView() {
    this.viewSwitch = !this.viewSwitch;
    console.log(this.viewSwitch);

  }
}




