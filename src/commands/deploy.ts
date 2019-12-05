import * as vscode from "vscode";
import { createTerminal } from "../util/term";
import { mainFile, pythonPath } from "../util/config";

const command = () => {
  let file = mainFile();
  let term: vscode.Terminal = createTerminal();
  term.sendText(`${pythonPath()} ${file} deploy`);
  term.show();
};

export default vscode.commands.registerCommand("robotpy.deploy", command);
