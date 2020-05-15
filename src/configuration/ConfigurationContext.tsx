import * as React from "react";
import {useState, useEffect} from "react";
import {Configuration} from "./configurationTypes";
import {isConfiguration} from "./configurationTypeGuards";

export const ConfigurationContext = React.createContext({} as Configuration);

interface Props {
  children: JSX.Element;
}

export const ConfigurationProvider = (props: Props) => {
  const [configuration, setConfiguration] = useState(
    null as Configuration | null
  );

  useEffect(() => {
    console.log("Fetching config.json");
    console.log(process.env.DEMO);

    if (process.env.DEMO === "true") setConfiguration(demoConfig);
    else
      fetch("config.json")
        .then(res => res.json())
        .then(obj => {
          console.log(obj);
          if (!isConfiguration(obj))
            throw Error(`Configuration file failed validation`);
          setConfiguration(obj);
        })
        .catch(e => {
          console.error(e);
        });
  }, []);

  return configuration === null ? null : (
    <ConfigurationContext.Provider value={configuration}>
      {props.children}
    </ConfigurationContext.Provider>
  );
};

const demoConfig = {
  title: "QA Lab Monitor",
  columns: [
    {
      property: "serial",
      title: "Serial #"
    },
    {
      property: "model",
      title: "Model #"
    },
    {
      property: "firmware",
      title: "Firmware Version"
    },
    {
      property: "Property_A",
      title: "Property A"
    },
    {
      property: "Property_B",
      title: "Property B"
    }
  ],
  filters: [
    {
      property: "model",
      title: "Model #",
      options: {"Model A": "Model A", "Model B": "Model B"}
    }
  ],
  logLevel: {
    level: ["x", "y", "z"],
    namespace: ["x", "y", "z"]
  },
  vnc: {
    proxyUrl: "",
    port: "",
    username: "",
    password: "",
    passwordEncrypted: ""
  }
};
