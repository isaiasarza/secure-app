import { FC } from "react";
import { User } from "../../model/user";
import GuardItem from "./guard-item/GuardItem";

interface IProps {
  guards: User[];
}

const GuardsComponent: FC<IProps> = (props) => {
  
  return (
    <div>
      {props.guards.map((guard: User) => {
        return (
          <div key={guard.uid}>
            <GuardItem guard={guard}></GuardItem>
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default GuardsComponent;
