# Cypress tests
This project allows to schedule check in and check out, using cypress JavaScript framework.
Use as a example of Cypress test set. For personal use only. Use at your own risk.
This system is distributed "AS IS" with no warranties.

## Automated files
- `gdh_open.cy.js` - Executes a check in
- `gdh_close.cy.js` - Executes a check out

## Prerequisites
The only requirement is to have Docker Engine or Docker Desktop installed on your system.
To install docker system, refers to:

Windows:
https://docs.docker.com/desktop/setup/install/windows-install/

Linux:
https://docs.docker.com/engine/install/

MacOS
https://docs.docker.com/desktop/setup/install/mac-install/

## Installation instructions
In first place you have to clone this repo, using git (or Visual Studio Code)

```bash
git clone https://github.com/jyefi/fichajegdh
```


## Config Setup
After Docker install you have to use a credentials file. This project includes "cypress.config.js.example" with the structure, you can copy the file into cypress.config.js, using your own credentials to check in and checkout. Those credentials will be used in check in and check out process. The credentials are stored in text clear (case sensitive).

## Docker build
After clone the repository, to implement node setup, you have to complile docker image using this command:
```bash
docker build --pull --rm -f 'Dockerfile' -t 'fichajegdh:1.0' '.'
```

## Execution files
In the project files you can find some helpers to automate the execution of check-in and check-out process. You can program with crontab (Linux) or Task scheduler (Windows), to program the scripts to be executed between 1 and 20 minutes before the time limit.

For example, if your worktime starts at 09:00, you have to program to execute the script at 08:40. In that way, the script will be executed between 08:40 and 09:00

## Execution results
The execution results will be stored in cypress/logs/warning.log file. And also, you can check the result in the gdh system.

## FAQ
Do you need help? Have an issue? Need improvements? Have asuggestion? Ask to the repo owner.
