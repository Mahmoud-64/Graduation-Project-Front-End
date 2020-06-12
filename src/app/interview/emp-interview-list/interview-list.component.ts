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
import { Subject } from 'rxjs';
import add from 'date-fns/add';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Router } from '@angular/router';

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
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./interview-list.component.css'],
  providers: [InterviewService]
})
export class EmpInterviewListComponent implements OnInit {

  constructor(
    private modal: NgbModal,
    public interviewService: InterviewService,
    private _flashMessagesService: FlashMessagesService,
    public router: Router
  ) { }
  // ngOnInit() {
  //   this.interviewService.fetchInterview();
  //   console.log(this.interviewService.fetchInterview());   dataa: any;

  dateArray: any = [];
  dataa: any = [];
  dataObject: any = {};
  arr: any = [5];

  ngOnInit() {
    this.interviewService.fetchInterview();
    this.interviewService.fetchEmployeeInterview()
      .subscribe(res => {
        this.dataa = res;
        // console.log(this.dataa);
        // this.arr[0] = 6;
        // console.log("inside subscribe");
        this.dataa.data.forEach(element => {
          this.dataObject =
          {
            start: startOfDay(new Date(element.date)),
            end: startOfDay(new Date(element.date)),
            title: 'interview added with ID' + element.id,
            id: element.id,
            color: colors.red,
            actions: this.actions,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
          }
          this.dateArray.push(this.dataObject);
          // console.log(this.dateArray);
        });
        console.log(this.dateArray);
        this.events = this.dateArray;
      });
    // setTimeout(function () { console.log(this.arr); }, 2000);
    // console.log(this.arr);
    // console.log("outside subscribe");


    console.log(this.dateArray);

    // for (let singleData of this.dataa) {
    //     this.dataObject =
    //     {
    //         start: startOfDay(add(new Date(singleData.date), { months: -1 })),
    //         end: startOfDay(add(new Date(singleData.date), { months: -1 })),
    //         title: 'A 3 day event',
    //         color: colors.red,
    //         actions: this.actions,
    //         allDay: true,
    //         resizable: {
    //             beforeStart: true,
    //             afterEnd: true,
    //         },
    //         draggable: true,
    //     }
    //     this.dateArray.push("1");
    //     console.log('3');
    // }

  }
  // ngOnChange() {
  //     console.log(this.arr);

  // }
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
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
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
}






