// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const editor = vscode.window.activeTextEditor;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "b64toString" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let b64ToJSON = vscode.commands.registerCommand(
    "extension.b64toJSON",
    function() {
      // The code you place here will be executed every time your command is executed
      const text = editor.document.getText(editor.selection);
      // Display a message box to the user
      const b64Regex = /^([0-9a-zA-Z+\/]{4})*(([0-9a-zA-Z+\/]{2}==)|([0-9a-zA-Z+\/]{3}=))?$/;
      if (b64Regex.test(text)) {
        let asciiText = Buffer.from(text, "base64").toString("ascii");
        editor.edit(builder => builder.replace(editor.selection, asciiText));
        vscode.window.showInformationMessage("Done!");
      } else {
				vscode.window.showErrorMessage("Not a valid base64 string!")
			}
    }
  );

	context.subscriptions.push(b64ToJSON);

	let JSONtoB64 = vscode.commands.registerCommand(
		"extension.JSONtoB64",
		function() {
			const text = editor.document.getText(editor.selection);
      // Display a message box to the user
			//const b64Regex = /^([0-9a-zA-Z+\/]{4})*(([0-9a-zA-Z+\/]{2}==)|([0-9a-zA-Z+\/]{3}=))?$/;
			let b64String = Buffer.from(text).toString('base64');
			editor.edit(builder => builder.replace(editor.selection, b64String));
			vscode.window.showInformationMessage("Done!");
		}
	)

	context.subscriptions.push(JSONtoB64);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
