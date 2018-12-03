import * as React from "react";
import { useState, useEffect } from "react";
import { Configuration } from "./configurationTypes";

export const ConfigurationContext = React.createContext({} as Configuration);

interface Props {
  children: JSX.Element;
}

export const ConfigurationProvider = (props: Props) => {
  const [configuration, setConfiguration] = useState(
    null as Configuration | null
  );

  useEffect(() => {
    fetch("http://10.91.1.1/config.json")
      .then(res => res.json())
      .then(obj => {
        console.log(obj);
        setConfiguration(obj);
      });
  }, []);

  return configuration === null ? null : (
    <ConfigurationContext.Provider value={configuration}>
      {props.children}
    </ConfigurationContext.Provider>
  );
};
