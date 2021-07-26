import { render, screen, findByText, fireEvent } from '@testing-library/react';
import { ionFireEvent  } from "@ionic/react-test-utils";
import LoginComponent from "./Login";

import { act } from "react-dom/test-utils";


describe("LoginComponent", () => {
 
  beforeEach(async () => {
    const { findByTitle, findByText } = render(<LoginComponent ></LoginComponent>)
    //await act(async () =>{render(<LoginComponent ></LoginComponent>)});
    
    
  });

  

  test("the submit_button should be dfasfasdf", async () => {
    const email = screen.getByTestId("email") ;
    const password = screen.getByTestId("password");
    const button = screen.getByTestId("submit_button");
    act(()=>{
      fireEvent.change(email,{
        target:{
          detail:{
            value:"arza.isaias@gmail.com"
          }
        }
      })
  
     //console.log(button.ge)
      
    })
    expect((email as any).detail.value).toBe("arza.isaias@gmail.com")
    act(()=>{
      fireEvent.change(password,{
        target:{
          detail:{
            value:"hahaha"
          }
        }
      })
    })
   
   expect((password as any).detail.value).toBe("hahaha")

    
  })

  

 
});
