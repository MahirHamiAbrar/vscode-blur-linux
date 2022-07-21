"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// get opacity of vscode window
	let opacity = vscode.workspace.getConfiguration("vscode-blur-linux").get("opacity");
	if (!opacity) opacity = 88;

	// get blur status of vscode window
	let blur = vscode.workspace.getConfiguration("vscode-blur-linux").get("blur");
	if (blur == null) blur = true;

	// commands
	var mainC = `bash -c 'for W in $(wmctrl -l |grep "Visual Studio Code" |awk '"'"'{print $1}'"'"'); do `;
	var transpC = `xprop -id $W -format _NET_WM_WINDOW_OPACITY 32c -set _NET_WM_WINDOW_OPACITY $(printf 0x%x $((0xffffffff * ${opacity} / 100))); `;
	var blurC = `xprop -id $W -format _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0; `;
	var unblurC = `xprop -id $W -format _KDE_NET_WM_BLUR_BEHIND_REGION 32a -set _KDE_NET_WM_BLUR_BEHIND_REGION -1; `;
	var doneC = ` done'`;

	// now create the final command based on some conditions
	var cmd = mainC + transpC;
	if (blur == true) cmd += blurC;
	else if (blur == false) cmd += unblurC;
	cmd += doneC;

	// create terminal object
	const terminal = vscode.window.createTerminal('vscode-blur-linux-activation');

	// send the command to the terminal to excute
	terminal.sendText(cmd);
	// when done, exit.
	terminal.sendText(`exit`);

	// just for debugging
	// vscode.window.showInformationMessage("the blur status is: " + blur + "; And Opacity is: " + opacity);

}

// this method is called when your extension is deactivated
function deactivate() {

	// set the window opacity to 100
	var opacity = 100;

	// create the transparency command
	const cmd = `bash -c 'for W in $(wmctrl -l |grep "Visual Studio Code" |awk '"'"'{print $1}'"'"'); do xprop -id $W -format _NET_WM_WINDOW_OPACITY 32c -set _NET_WM_WINDOW_OPACITY $(printf 0x%x $((0xffffffff * ${opacity} / 100))); xprop -id $W -format _KDE_NET_WM_BLUR_BEHIND_REGION 32a -set _KDE_NET_WM_BLUR_BEHIND_REGION -1; done'`;
	// create terminal object
	const terminal = vscode.window.createTerminal('vscode-blur-linux-deactivation');

	// send the command to the terminal to excute and then exit
    terminal.sendText(cmd);
    terminal.sendText(`exit`);

}

exports.activate = activate;
exports.deactivate = deactivate;
