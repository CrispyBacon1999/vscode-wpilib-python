"use strict";

import simulate from "./commands/simulate";
import deploy from "./commands/deploy";
import test from "./commands/test";
import opkgGet from "./commands/opkgget";
import installer from "./commands/install";

// import { taskProvider as robotpyTaskProvider } from "./tasks/taskprovider";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Provide commands
  context.subscriptions.push(simulate);
  context.subscriptions.push(deploy);
  context.subscriptions.push(test);
  context.subscriptions.push(opkgGet.downloadOpkg);
  context.subscriptions.push(opkgGet.installOpkg);
  context.subscriptions.push(installer.downloadRobotpy);
  context.subscriptions.push(installer.installRobotpy);
}

// this method is called when your extension is deactivated
// tslint:disable-next-line:no-empty
export function deactivate() {}
