import { User } from "../user";
import { Zone } from "../zone/zone";
import { ReportedPerson } from '../reported.person';

export enum NotificationType {
  GUARD_ZONE_ENTERED = "GUARD_ZONE_ENTERED",
  GUARD_ZONE_LEAVING = "GUARD_ZONE_LEAVING",
  GUARD_REPORT_ADDED = "REPORT_ADDED",
  ZONE_CREATED = "ZONE_CREATED",
  GUARD_ASSIGNED = "GUARD_ASSIGNED",
}

export function getNotificationTitle(
  notificationType: NotificationType
): string {
  switch (notificationType) {
    case NotificationType.GUARD_ZONE_ENTERED:
      return "Guardia ingresando a zona";
    case NotificationType.GUARD_ZONE_LEAVING:
      return "Guardia saliendo de zona";
    case NotificationType.GUARD_ASSIGNED:
      return "Asignación de guardia";
    case NotificationType.ZONE_CREATED:
      return "Zona creada";
    case NotificationType.GUARD_REPORT_ADDED:
      return "Nuevo reporte de guardia";
  }
}

export function getNotificationDescription(
    notificationType: NotificationType,
    data: any
  ): string {
      console.log("getNotificationDescription", data)
      const guard: User = data.guard as User;
      const zone: Zone = data.zone as Zone;
      const report: ReportedPerson = data.reportedPerson as ReportedPerson
    switch (notificationType) {
      case NotificationType.GUARD_ZONE_ENTERED:
        return "El guardia " + guard.firstname + ' ' + guard.lastname + ' ha ingresado a la zona ' + zone.name;
      case NotificationType.GUARD_ZONE_LEAVING:
        return "El guardia " + guard.firstname + ' ' + guard.lastname + ' ha salido de la zona ' + zone.name;
      case NotificationType.GUARD_ASSIGNED:
        return "Asignación de guardia";
      case NotificationType.ZONE_CREATED:
        return "Zona creada";
      case NotificationType.GUARD_REPORT_ADDED:
        return "La persona " + report.firstname + ' ' + report.lastname + ' fue reportada como sospechosa por el guardia ' + guard.firstname + ' ' + guard.lastname;
    }
  }
