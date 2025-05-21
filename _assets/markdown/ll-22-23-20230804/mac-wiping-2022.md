# mac-wiping-2022

- erase all content and settings (through system preferences)
- set up as ll-studio
- rename drive to `ll-backup`
- confirm filevault on, resetting with ll-studio
- add additional apfs partition `ll-color-number` (like `ll-spacegray-2`, say)
- add an additional user with the same name as apfs partition (`ll-spacegray-2`) and give that user administrator privileges (use the usual password)
    - we can change this, ultimately, to a more interesting name
- restart in recovery mode and install macOS on the new partition (the one with the non-`ll-studio` name, like `ll-spacegray-2`)
- install on the new apfs volume, with usual password and the `ll-spacegray-2`-style user id name
- 