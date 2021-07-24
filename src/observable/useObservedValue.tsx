import * as React from "react";
export const useObservable = (observable: any) => {
  const [value, setValue] = React.useState();

  React.useEffect(() => {
    const subscription = observable.subscribe((v: any) => {
      setValue(v);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [observable]);

  return value;
};
