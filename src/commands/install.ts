import * as vscode from "vscode";
import { installerMethod } from "../util/config";
import { createTerminal } from "../util/term";

const installRobotpy = () => {
  // This is a super hacky way to find whether `robotpy-installer download-robotpy` has been run
  // Definitely open to better solutions
  let robotpyFiles = vscode.workspace
    .findFiles("**/robotpy-hal*/.tar.gz")
    .then(files => {
      if (files.length > 0) {
        let term: vscode.Terminal = createTerminal();
        let installer = installerMethod();
        term.sendText(`${installer} install-robotpy`);
        term.show();
      } else {
        vscode.window
          .showErrorMessage(
            "Can't find the robotpy files in this directory, do you want to try to download them?",
            "Download",
            "No"
          )
          .then(response => {
            if (response === "Download") {
              downloadRobotpy();
            }
          });
      }
    });
};

const downloadRobotpy = () => {
  let term: vscode.Terminal = createTerminal();
  let installer = installerMethod();
  term.sendText(`${installer} download-robotpy`);
  term.show();
};

export default {
  installRobotpy: vscode.commands.registerCommand(
    "robotpy.installrobotpy",
    installRobotpy
  ),
  downloadRobotpy: vscode.commands.registerCommand(
    "robotpy.downloadrobotpy",
    downloadRobotpy
  )
};
