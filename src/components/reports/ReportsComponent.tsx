import React, { FC } from "react";
import { ReportedPerson } from "../../model/reported.person";
import "./ReportsComponent.css";
import ReportItem from "./report-item/ReportItem";
interface IProps {
  reports: ReportedPerson[];
}

const ReportsComponent: FC<IProps> = (props) => {
  return (
    <div>
      {props.reports.map((r: ReportedPerson, index: number) => {
        return (
          <div>
            <ReportItem report={r}></ReportItem>
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default ReportsComponent;
