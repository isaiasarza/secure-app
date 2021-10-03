import { IonRow, IonCol, IonFabButton } from "@ionic/react";
import moment from "moment";
import React, { FC } from "react";
import { Notification } from "../../../model/notification/notification";
import { NotificationType } from "../../../model/notification/notification-type.enum";

interface IProps {
  notification: Notification;
}

const NotificationItem: FC<IProps> = (props) => {
  return (
    <div className="report-item">
      <div className="report-item-content">
        {/*  */}
        <IonRow>
          <IonCol>
            <h3>"{props.notification.pushNotification.title}"</h3>
          </IonCol>
        </IonRow>
        <div className="sub-item">
          <IonRow>
            <IonCol>
              <b>Descripción:</b> {props.notification.pushNotification.body}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <b>Fecha:</b> {moment(props.notification.receivedDate).format('dd/MM/YYYY')}
            </IonCol>
          </IonRow>
        </div>
        {props.notification.type === NotificationType.GUARD_REPORT_ADDED ? (
          <div className="sub-item">
            <IonRow>
              <IonCol size="6">
                <b>Guardia Reportador:</b> {props.notification.pushNotification.data.guard.firstname + ' ' + props.notification.pushNotification.data.guard.lastname }
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
                <b>Persona Reportada:</b> {props.notification.pushNotification.data.reportedPerson.firstname + ' ' + props.notification.pushNotification.data.reportedPerson.lastname }
              </IonCol>
            </IonRow>
          </div>
        ) : (
          ""
        )}

        <br />
      </div>
    </div>
  );
};

export default NotificationItem;
