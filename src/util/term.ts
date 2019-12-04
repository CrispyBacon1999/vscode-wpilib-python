import * as vscode from "vscode";

/**
 * Create a new terminal or return the currently existent one with a matching name.
 * @param name name to assign the terminal
 */
export const createTerminal = (name: string = "robotpy"): vscode.Terminal => {
  let terms = vscode.window.terminals;
  for (let i = 0; i < terms.length; i++) {
    let term = terms[i];
    console.log(term);
    if (term.name === name) {
      term.show(true);
      return term;
    }
  }
  return vscode.window.createTerminal({ name: name });
};
