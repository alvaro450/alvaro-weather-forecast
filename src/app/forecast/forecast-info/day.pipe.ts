import { Pipe, PipeTransform } from "@angular/core";
import * as dayjs from 'dayjs';
@Pipe({
  name: "day",
})
export class DayPipe implements PipeTransform {
  transform(dateText: string): string {
    // convert to date object
    const date = dayjs(dateText);
    const dayOfWeek = date.day();

    switch (dayOfWeek) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thrusday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "";
    }
  }
}
