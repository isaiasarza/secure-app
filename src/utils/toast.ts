import { useIonToast } from "@ionic/react";

export function presentSuccessToast(present: any, message: string) {
  present({
    message: message,
    duration: 3000,
    color: "success",
  });
}

export function presentErrorToast(present: any, message: string) {
  present({
    message: message,
    duration: 3000,
    color: "danger",
  });
}
