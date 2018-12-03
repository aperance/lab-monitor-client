export interface Configuration {
  readonly title: string;
  readonly columns: Array<{
    property: string;
    title: string;
    replace?: { [x: string]: string };
  }>;
  readonly filters: Array<{
    property: string;
    title: string;
    options: { [x: string]: string };
  }>;
  readonly logLevel: {
    level: string[];
    namespace: string[];
  };
  readonly httpProxy: string;
  readonly logsPath: string;
  readonly statePath: string;
  readonly psTools: {
    [x: string]: {
      name: string;
      mode: string;
      cmd: string;
    };
  };
  readonly vnc: {
    proxyUrl: string;
    port: string;
    username: string;
    password: string;
    passwordEncrypted: string;
  };
}
