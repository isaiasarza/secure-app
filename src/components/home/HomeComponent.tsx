import {
  IonCard,
  IonCardSubtitle,
  IonImg,
  IonCol,
  IonCardHeader,
  IonRow,
  IonGrid,
  IonModal,
} from "@ionic/react";
import { FC, useState } from "react";
import { useHistory } from "react-router";
import "./HomeComponent.css";
import FaceScannerComponent from "../face-scanner/FaceScannerComponent";
import { User } from "../../model/user";
import PositionLoggerComponent from "../position-logger/PositionLoggerComponent";
interface IProps {
  user: User;
}

const HomeComponent: FC<IProps> = (props) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const getPeriod = (minutes: number) => {
    return minutes * 60000
  }

  const onFaceScan = async () => {
    //console.log("on go to photo");
    setShowModal(true);
    // history.push("/photo");
  };

  const onViewReports = async () => {
    history.push("/reports");
  };
  return (
    <div className="container">
      <div hidden={true}>
        <PositionLoggerComponent period={getPeriod(3)} user={props.user}></PositionLoggerComponent>
      </div>
      <IonModal
        isOpen={showModal}
        cssClass="my-custom-class"
        showBackdrop={true}
      >
        <FaceScannerComponent
          closeAction={closeModal}
          user={props.user}
        ></FaceScannerComponent>
      </IonModal>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonCard onClick={onFaceScan}>
              <IonImg src="/assets/images/face-recognition.png"></IonImg>
              <IonCardHeader color="primary">
                <IonCardSubtitle>Face Scan</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard>
              <IonImg src="/assets/images/formulario.png"></IonImg>
              <IonCardHeader color="primary">
                <IonCardSubtitle>Nuevo Registro</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard onClick={onViewReports}>
              <IonImg src="/assets/images/documento.png"></IonImg>
              <IonCardHeader color="primary">
                <IonCardSubtitle>Reportes</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard>
              <IonImg src="/assets/images/notificaciones.png"></IonImg>
              <IonCardHeader color="primary">
                <IonCardSubtitle>Notificaciones</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default HomeComponent;
