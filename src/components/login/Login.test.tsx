import React from "react";
import { render, screen, waitFor, findByText,fireEvent } from "@testing-library/react";
import { ionFireEvent  } from "@ionic/react-test-utils";

import LoginComponent from "./Login";
import { act } from "react-dom/test-utils";
import user from "@testing-library/user-event";
import { getElement } from "ionicons/dist/types/stencil-public-runtime";

describe("LoginComponent", () => {
  beforeEach(async () => {
    await act(async () =>{render(<LoginComponent></LoginComponent>)});
  });

  it("the submit_button should be disabled", async () => {
    const email = screen.getByTestId("email");
    email.innerText = "blabla";
    // await user.type(email, "blabla");
    const button = screen.getByTestId("submit_button");
    expect(button.getAttribute("disabled")).toBeTruthy();
    console.log("email input value", email.innerText, email.innerHTML);
    /*  act(() => {
      fireEvent(
        email,
        new CustomEvent("ionChange", { detail: { value: "Text" } })
      );
      const button = screen.getByTestId("submit_button");
      expect(button.getAttribute("disabled")).toBeTruthy()
    }); */
  });

  it("the submit_button should be dfasfasdf", async () => {
    const email = screen.getByTestId("email") ;
    const password = screen.getByTestId("password");
    await act(()=>{
      ionFireEvent.ionInput(email,"arza.isaias@gmail.com")
      //ionFireEvent.ionChange(email,"arza.isaias@gmail.com")
      ionFireEvent.ionInput(password,"hahaha")
    })
    jest.setTimeout(500)
    const button2 = screen.getByTestId("submit_button");
    console.log("button disabled after timeout" , button2.getAttribute("disabled"));
  })

  it("the submit_button should be enabled", async () => {
    const email = screen.getByTestId("email") ;
    const email_detail = (email as any).detail
    console.log("email_detail", email_detail)
    
    fireEvent.change(email, {
      target: { value: "arza.isaias@gmail.com"  },
    });
    expect((email as any).detail.value).toEqual("arza.isaias@gmail.com");

    const password = screen.getByTestId("password") as HTMLInputElement;
    fireEvent.change(password, {
      target: {  value: "hahaha"}  ,
    });

    expect((password as any).detail.value).toEqual("hahaha");

    const button = screen.getByTestId("submit_button");
    console.log("button disabled before timeout", button.getAttribute("disabled"));

    jest.setTimeout(1000)
    const button2 = screen.getByTestId("submit_button");
    console.log("button disabled after timeout" , button2.getAttribute("disabled"));

    
    //expect(button).toBeDisabled();
    /*   console.log("email input value", email.innerText, email.innerHTML)
    console.log("password input value", password.innerText, password.innerHTML)
    ;
    expect(button.getAttribute("disabled")).toBeFalsy(); */
  });

 
});
