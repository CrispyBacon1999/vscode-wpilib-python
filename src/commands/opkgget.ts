import * as vscode from "vscode";
import { getOpkgList } from "../util/opkg";
import { createTerminal } from "../util/term";

const downloadOpkg = () => {
  getOpkgList().then(opkgs => {
    vscode.window.showQuickPick(Object.keys(opkgs)).then(pkg => {
      let installer = vscode.workspace
        .getConfiguration("robotpy")
        .get("installer");
      installer =
        installer === undefined ? "py -m robotpy-installer" : installer;
      let term: vscode.Terminal = createTerminal();
      term.sendText(`${installer} download-opkg ${pkg}`);
      term.show();
    });
  });
};

const installOpkg = () => {
  getOpkgList().then(opkgs => {
    vscode.window.showQuickPick(Object.keys(opkgs)).then(pkg => {
      let installer = vscode.workspace
        .getConfiguration("robotpy")
        .get("installer");
      installer =
        installer === undefined ? "py -m robotpy-installer" : installer;
      let term: vscode.Terminal = createTerminal();
      term.sendText(`${installer} install-opkg ${pkg}`);
      term.show();
    });
  });
};

export default {
  downloadOpkg: vscode.commands.registerCommand(
    "robotpy.getopkg",
    downloadOpkg
  ),
  installOpkg: vscode.commands.registerCommand(
    "robotpy.installopkg",
    installOpkg
  )
};
