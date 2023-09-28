# vscode-blur-linux README

vscode-blur-linux helps to achieve transparent and blurry background to vscode window on linux.


## Features

This extension provides transparency and blurring features. Transparency effect is expected to be
working on all linux distros but the blur effect will only work on KDE Plasma distros for now. We
will be adding the support for blurring on GNOME distros verry soon.

### Make vscode window transparent
![Make vscode window transparent](images/VSCode-Transparent-SS.png)

### Add blur effect to the vscode window (works on KDE Plasma Distros only)
![Add blur effect to the vscode window (works on KDE Plasma Distros only)](images/VSCode-Blur-SS.png)

### Activate or deactivate Blur and change Opacity in Settings
![Activate or deactivate Blur and change Opacity in Settings](images/VSCode-Settings-SS.png)

## Requirements

`vscode-blur-linux` requires `wmctrl` (to get the window ID), `xprop` (to set transparency), and `bash` (to run the transparency commands) installed on your system.

### Install Dependencies on Ubuntu/Debian:

``` bash
sudo apt install -y wmctrl x11-utils bash
```

### Install Dependencies on Arch Linux:
#### pacman:

``` bash
sudo pacman -S wmctrl bash
```

#### yay:

```bash
yay -S pacman bash
```


Also make sure that `blur` is turned on in the settings.
Go to `System Steeings` > `Workspace Behaviour` > `Desktop Effects` > under appearance check the check box `Blur`.
You might need to change the blur strength by clicking the gear icon at the very right side beside `Blur`. and then click `Apply`.
Done!

## Extension Settings

This extension contributes the following settings:

* `vscode-blur-linux.opacity`: opacity can be changed between 0-100 range, default is `88%`.
* `vscode-blur-linux.blur`: enable/disable blur effect behind the window.

## Usage

- Install the extension from marketplace.
- Restart the Visual Studio Code window.

