import * as vscode from "vscode";
import { createTerminal } from "../util/term";

const command = () => {
  let mainFile = vscode.workspace.getConfiguration("robotpy").get("main");
  mainFile = mainFile === undefined ? "robot/robot.py" : mainFile;
  let term: vscode.Terminal = createTerminal();
  term.sendText(`py ${mainFile} deploy`);
  term.show();
};

export default vscode.commands.registerCommand("robotpy.deploy", command);
