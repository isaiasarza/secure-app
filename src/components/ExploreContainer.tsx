import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
} from "@ionic/react";
import "./ExploreContainer.css";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonCard>
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

export default ExploreContainer;
