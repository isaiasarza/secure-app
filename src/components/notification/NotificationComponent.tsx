import { FC } from "react";
import { Notification } from "../../model/notification/notification";
import { User } from "../../model/user";
import NotificationItem from './notification-item/NotificationItem';

interface IProps {
  user: User;
  notifications: Notification[];
}

const NotificationComponent: FC<IProps> = (props) => {
  return (
    <div>
      {props.notifications.map((n: Notification, index: number) => {
        return (
          <div key={index}>
            <NotificationItem notification={n}></NotificationItem>
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationComponent;
