"use strict";

import simulate from "./commands/simulate";
import deploy from "./commands/deploy";
import opkgGet from "./commands/opkgget";

// import { taskProvider as robotpyTaskProvider } from "./tasks/taskprovider";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  context.subscriptions.push(simulate);
  context.subscriptions.push(deploy);
  context.subscriptions.push(opkgGet.downloadOpkg);
  context.subscriptions.push(opkgGet.installOpkg);
  // vscode.tasks.registerTaskProvider("robotpy", robotpyTaskProvider);

  console.log(
    'Congratulations, your extension "vscode-wpilib-python" is now active!'
  );
}

// this method is called when your extension is deactivated
// tslint:disable-next-line:no-empty
export function deactivate() {}
