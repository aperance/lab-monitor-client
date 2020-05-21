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
      property: "ipAddress",
      title: "IP Address"
    },
    {
      property: "timestamp",
      title: "Updated At"
    },
    {
      property: "hardware",
      title: "Hardware"
    },
    {
      property: "firmware",
      title: "Firmware"
    },
    {
      property: "propertyA",
      title: "Property A"
    },
    {
      property: "propertyB",
      title: "Property B"
    },
    {
      property: "propertyC",
      title: "Property C"
    }
  ],
  filters: [
    {
      property: "hardware",
      title: "Hardware",
      options: {
        "Rev A": "Rev A",
        "Rev B": "Rev B",
        "Rev C": "Rev C",
        "Rev D": "Rev D",
        "Rev E": "Rev E"
      }
    },
    {
      property: "firmware",
      title: "Firmware",
      options: {
        "v1.0.5": "v1.0.5",
        "v2.0.4": "v2.0.4",
        "v3.0.3": "v3.0.3",
        "v4.0.2": "v4.0.2",
        "v5.0.1": "v5.0.1"
      }
    }
  ],
  logLevel: {
    level: ["x", "y", "z"],
    namespace: ["x", "y", "z"]
  },
  vnc: {
    proxyUrl: process.env.VNC_PROXY || "",
    port: process.env.VNC_PORT || "",
    username: "",
    password: process.env.VNC_PASSWORD || "",
    passwordEncrypted: process.env.VNC_PASSWORD || ""
  }
};
