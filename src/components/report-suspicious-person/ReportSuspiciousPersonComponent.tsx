import { Geolocation } from "@capacitor/geolocation";
import { yupResolver } from "@hookform/resolvers/yup";
import { IonButton, IonCol, IonGrid, IonLoading, IonRow, useIonToast } from "@ionic/react";
import moment from "moment";
import { FC, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { v4 as uuid } from "uuid";
import {
  FCMServiceToken, injector, NotificationServiceToken, ReportServiceToken, UserServiceToken
} from "../../injector/injector";
import { Notification } from "../../model/notification/notification";
import {
  getNotificationDescription, getNotificationTitle,
  NotificationType
} from "../../model/notification/notification-type.enum";
import { ReportedPerson } from "../../model/reported.person";
import { User } from "../../model/user";
import {
  getFullFaceDescription,
  loadModels
} from "../../service/face-api/face-api.service";
import { FCMService } from "../../service/fcm/fcm.service";
import { NotificationService } from "../../service/notification/notification.service";
import { ReportService } from "../../service/report/report.service";
import { UserService } from "../../service/user/user.service";
import { presentErrorToast, presentSuccessToast } from "../../utils/toast";
import FormInputWrapper from "../formInputWrapper/formInputWrapper";
import SelfieComponent from "../selfie/SelfieComponent";
import {
  getInitialValues,
  getValidations,
  SuspiciousPersonForm
} from "./validations/RegisterValidations";

interface IProps {
  user: User;
  goHome: Function;
  closeAction: Function;
}

const ReportSuspiciousPersonComponent: FC<IProps> = (props) => {
  const TAG = "ReportSuspiciousPersonComponent";
  const [reportService] = useState<ReportService>(
    injector.get(ReportServiceToken)
  );
  const [notificationService] = useState<NotificationService>(
    injector.get(NotificationServiceToken)
  );
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: getInitialValues(),
    mode: "all",
    resolver: yupResolver(getValidations()),
  });
  const [showLoading, setShowLoading] = useState(false);
  const [present] = useIonToast();
  const [blob, setBlob] = useState<Blob>();
  const [descriptorsError, setDescriptorsError] = useState(false);
  const [fcmService] = useState<FCMService>(injector.get(FCMServiceToken));
  const [userService] = useState<UserService>(injector.get(UserServiceToken));
  const { isValid, errors } = useFormState({ control });

  const sendNotification = async (
    guard: User,
    reportedPerson: ReportedPerson
  ) => {
    
    guard['descriptors'] = []
    guard['local_selfie_url'] = ''
    guard['selfie_url'] = ''

    reportedPerson['descriptors'] = []
    reportedPerson['local_selfie_url'] = ''
    reportedPerson['selfie_url'] = ''
    reportedPerson['reporterSelfieUrl'] = ''
    const data = { guard: guard, reportedPerson: reportedPerson};
    const title = getNotificationTitle(NotificationType.GUARD_REPORT_ADDED);
    const description = getNotificationDescription(
      NotificationType.GUARD_REPORT_ADDED,
      data
    );
    const notification: Notification = {
      receivedDate: moment().toISOString(),
      type: NotificationType.GUARD_REPORT_ADDED,
      pushNotification: {
        id: NotificationType.GUARD_REPORT_ADDED,
        title: title,
        body: description,
        data: data
      }
    };
    console.log(
      NotificationType.GUARD_REPORT_ADDED,
      " sending notification",
      notification
    );
    notificationService.add(notification);
    fcmService.sendNotification(
      notification.pushNotification,
      await userService.getUserTokens()
    ); 
  };
  const onSubmit = async (data: SuspiciousPersonForm) => {
    setShowLoading(true);
    try {
      const coordinates = await Geolocation.getCurrentPosition();

      console.log("Current position:", coordinates);
      const reportedPerson: ReportedPerson = {
        uuid: uuid(),
        firstname: data.firstname,
        lastname: data.lastname,
        dni: data.dni,
        lat: coordinates.coords.latitude,
        long: coordinates.coords.longitude,
        date: moment().toISOString(),
        time: moment().toISOString(),
        description: data.reason,
        reporterUid: props.user.uid || "",
        reporterDni: props.user.dni,
        reporterFirstname: props.user.firstname,
        reporterLastname: props.user.lastname,
        reporterSelfieUrl: props.user.selfie_url || "",
        descriptors: data.descriptors,
      };
      await reportService.add(reportedPerson, blob);
      sendNotification(props.user, reportedPerson);
      presentSuccessToast(
        present,
        "Se envió el reporte de forma satisfactoria"
      );
      setShowLoading(false);
      props.closeAction();
      props.goHome();
      //history.push("/home",{props:{user: props.user}});
    } catch (error) {
      // error, no se pudo enviar el reporte
      setShowLoading(false);
      presentErrorToast(present, "No se enviar el reporte, intente nuevamente");
    }
  };
  const handler = async (webPath: string) => {
    // const res = await fetch(webPath);
    // const blob = await res.blob();
    const fileName = "";
    console.log(TAG, "selfie handler", webPath, fileName);
    setValue("webPath", webPath, { shouldValidate: true });
    try {
      const res = await fetch(webPath);
      const _blob = await res.blob();
      setBlob(_blob);
      setShowLoading(true);
      await loadModels();
      const fullDesc = await getFullFaceDescription(webPath);
      const descriptors: number[] = Array.from(fullDesc[0].descriptor);
      console.log("descriptors", descriptors);
      if (descriptors?.length < 1) throw new Error();
      setValue("descriptors", descriptors, { shouldValidate: true });
    } catch (error) {
      setDescriptorsError(true);
      presentErrorToast(
        present,
        "No se pudo detectar el rostro correctamente, vuelva a tomar la foto"
      );
    }
    setShowLoading(false);
  };

  return (
    <IonGrid style={{ width: "100%" }}>
      <form
        id="report-suspicious-person-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <IonLoading isOpen={showLoading} message={"Por favor, espere"} />
        <div>
          <SelfieComponent
            readonly={false}
            selfieUrl={""}
            handler={handler}
          ></SelfieComponent>
        </div>
        <p>{errors.webPath?.message}</p>
        <p>{errors.descriptors?.message}</p>
        <IonRow>
          <IonCol>
            <FormInputWrapper
              position={"stacked"}
              name={"firstname"}
              type={"text"}
              control={control}
              label={"Nombre"}
            ></FormInputWrapper>
            <p>{errors.firstname?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <FormInputWrapper
              position={"stacked"}
              name={"lastname"}
              type={"text"}
              control={control}
              label={"Apellido"}
            ></FormInputWrapper>
            <p>{errors.lastname?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <FormInputWrapper
              position={"stacked"}
              name={"dni"}
              type={"text"}
              control={control}
              label={"DNI"}
            ></FormInputWrapper>
            <p>{errors.dni?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <FormInputWrapper
              position={"stacked"}
              name={"reason"}
              type={"text"}
              control={control}
              label={
                "¿Porque razón motivo o cirscunstancia usted reporta a esta persona?"
              }
              inputType={"textarea"}
            ></FormInputWrapper>
            <p>{errors.reason?.message}</p>
          </IonCol>
        </IonRow>
        <IonButton expand="full" type="submit" disabled={!isValid}>
          Enviar Reporte
        </IonButton>
      </form>
    </IonGrid>
  );
};

export default ReportSuspiciousPersonComponent;
