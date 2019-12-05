import * as vscode from "vscode";
import { createTerminal } from "../util/term";
import { pythonPath } from "../util/config";

const command = () => {
  let mainFile = vscode.workspace.getConfiguration("robotpy").get("main");
  mainFile = mainFile === undefined ? "robot/robot.py" : mainFile;
  let term: vscode.Terminal = createTerminal();
  term.sendText(`${pythonPath()} ${mainFile} sim`);
  term.show();
};

export default vscode.commands.registerCommand("robotpy.simulate", command);
