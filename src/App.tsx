import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import * as React from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

import { AuthorizationServiceToken, injector, UserContextServiceToken } from "./injector/injector";
import { useState } from "react";
import { UserContextService } from "./service/user-context/user-context.service";

import HomePage from "./pages/home/HomePage";
import { loadModels } from "./service/face-api/face-api.service";
import FaceScannerComponent from './components/face-scanner/FaceScannerComponent';
import ReportsPage from "./pages/reports/ReportsPage";
import { AuthorizationService } from './service/autz/autz.service';
import GuardsPage from "./pages/guards/GuardsPage";
import ZonesPage from './pages/zones/ZonesPage';
import NotificationPage from "./pages/notifications/NotificationPage";

const App: React.FC = () => {
  const [userContextService] = useState<UserContextService>(
    injector.get(UserContextServiceToken)
  );

  const [autzService] = useState<AuthorizationService>(
    injector.get(AuthorizationServiceToken)
  );

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route
            exact
            path="/home"
            render={(routeProps) => {
              return userContextService.getCurrentUser() != null ? (
                <HomePage {...routeProps} />
              ) : (
                <LoginPage />
              );
            }}
          />
          <Route
            exact
            path="/reports"
            render={(routeProps) => {
              return userContextService.getCurrentUser() != null ? (
                <ReportsPage {...routeProps} />
              ) : (
                <LoginPage />
              );
            }}
          />
          <Route
            exact
            path="/zones" 
            
            render={(routeProps) => {
              return userContextService.getCurrentUser() != null ? (
                <ZonesPage  {...routeProps} />
              ) : (
                <LoginPage />
              );
            }}
          />
           <Route
            exact
            path="/guards"
            render={(routeProps) => {
              return userContextService.getCurrentUser() != null ? (
                <GuardsPage {...routeProps} />
              ) : (
                <LoginPage />
              );
            }}
          />
          <Route
            exact
            path="/notifications" 
            
            render={(routeProps) => {
              return userContextService.getCurrentUser() != null ? (
                <NotificationPage  {...routeProps} />
              ) : (
                <LoginPage />
              );
            }}
          />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
