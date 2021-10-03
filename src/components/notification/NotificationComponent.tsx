import React, { FC } from "react";
import { User } from '../../model/user';

interface IProps {
    user: User;
    notifications: Notification[];
};

const NotificationComponent:FC<IProps> = (props) => {
    return <div></div>
};

export default NotificationComponent;