import * as vscode from "vscode";
import { spawnSync } from "child_process";

export const pythonPath = () => {
  // Pull the configured pythonpath from the python extension config
  let p = vscode.workspace.getConfiguration("python", null).get("pythonPath");
  p = p === undefined || p === "" ? "python" : p;
  return p;
};

export const mainFile = () => {
  let mainFile = vscode.workspace.getConfiguration("robotpy").get("main");
  mainFile =
    mainFile === undefined || mainFile === "" ? "src/robot.py" : mainFile;
  return mainFile;
};
export const targetYear = () => {
  // Super janky way of getting the package version
  // Also super slow. But it works?
  let pip_vers = spawnSync(`${pythonPath()}`, ["-m", "pip", "freeze"]);
  let packages = pip_vers.stdout.toString().split("\n");
  packages = packages.filter(val => {
    return val.search("robotpy-installer") !== -1;
  });
  let year = 0;
  if (packages.length > 0) {
    let i = packages[0].indexOf("==") + 2;
    year = parseInt(packages[0].substring(i, i + 4));
  }
  console.log(year);
  return year;
};
export const installerMethod = () => {
  let installer = vscode.workspace.getConfiguration("robotpy").get("installer");
  installer =
    installer === undefined || installer === ""
      ? "robotpy-installer"
      : installer;
  return installer;
};
