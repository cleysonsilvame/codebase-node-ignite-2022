import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date?: Date): number {
    const startDateUTC = this.convertToUTC(start_date);
    const endDateUTC = this.convertToUTC(end_date);

    return dayjs(startDateUTC).diff(endDateUTC, "hours");
  }
  convertToUTC(date?: Date): string {
    return dayjs(date).utc().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date?: Date, end_date?: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(start_date_utc).diff(end_date_utc, "days");
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  compareIfBefore(start_date: Date, end_date?: Date): boolean {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    return dayjs(start_date_utc).isBefore(end_date_utc);
  }
}

export { DayjsDateProvider };
