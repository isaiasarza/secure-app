import { IonGrid, IonCard, IonCardHeader, IonRow, IonCol, IonCardSubtitle, IonIcon, IonLabel, IonCardContent, IonItem, IonInput } from '@ionic/react';
import { close, warningOutline } from 'ionicons/icons';
import React, { FC } from "react";
import SelfieComponent from '../selfie/SelfieComponent';

interface IProps {};

const UnknownFaceComponent:FC<IProps> = (props) => {
    return (
        <IonGrid>
          <IonCard className="scroll-content">
            <IonCardHeader>
              <IonRow>
                <IonCol size="11">
                  <IonCardSubtitle>Resultado de Scan</IonCardSubtitle>
                </IonCol>
                <IonCol size="1">
                  <IonIcon
                    icon={close}
                    color="background-constrant"
                  ></IonIcon>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel>ASFD
                  </IonLabel>
                </IonCol>
              </IonRow>
            </IonCardHeader>
            <IonCardContent>
              <div
               
              >
                <div className="frame-icon ion-justify-content-center">
                  <IonIcon
                    className="custom-icon"
                    icon={
                       warningOutline
                    }
                    color={
                      "danger"
                    }
                  ></IonIcon>
                </div>
                <div>
                  
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </IonGrid>
    );
};

export default UnknownFaceComponent;