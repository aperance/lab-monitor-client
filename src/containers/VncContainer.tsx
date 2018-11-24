import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import { VncViewer } from "../components/VncViewer";

const mapStateToProps = ({ userSelection, configuration }: StoreState) => {
  if (userSelection.rows.length !== 1)
    return { url: "", password: "", fileContents: "" };
  else
    return {
      url:
        `${configuration.vnc.proxyUrl}` +
        `?ip=${userSelection.rows[0]}` +
        `&port=${configuration.vnc.port}`,
      password: configuration.vnc.password as string,
      fileContents:
        `[connection]\n` +
        `host=${userSelection.rows[0]}\n` +
        `port=${configuration.vnc.port}\n` +
        `password=${configuration.vnc.passwordEncrypted}`
    };
};

export const VncContainer = connect(mapStateToProps)(VncViewer);
