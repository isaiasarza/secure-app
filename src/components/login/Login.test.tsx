import { render, screen, fireEvent } from "@testing-library/react";

import LoginComponent from "./Login";

import { act } from "react-dom/test-utils";

describe("LoginComponent", () => {
  beforeEach(async () => {
    render(<LoginComponent></LoginComponent>);
  });

  test("the submit_button should be dfasfasdf", async () => {
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");
    act(() => {
      fireEvent.change(email, {
        target: {
          detail: {
            value: "arza.isaias@gmail.com",
          },
        },
      });
    });
    expect((email as any).detail.value).toBe("arza.isaias@gmail.com");
    act(() => {
      fireEvent.change(password, {
        target: {
          detail: {
            value: "hahaha",
          },
        },
      });
    });

    expect((password as any).detail.value).toBe("hahaha");
  });
});
