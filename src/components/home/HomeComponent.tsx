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
import FaceScannerComponent from '../face-scanner/FaceScannerComponent';
interface IProps {}

const HomeComponent: FC<IProps> = (props) => {
  const history = useHistory();
  const [showModal,setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  };

  const onFaceScan = async () => {
    //console.log("on go to photo");
    setShowModal(true)
   // history.push("/photo");
  };
  return (
    <div className="container">
      <IonModal
        isOpen={showModal}
        cssClass="my-custom-class"
        showBackdrop={true}
      >
        <FaceScannerComponent
          closeAction={closeModal}
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
            <IonCard>
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
