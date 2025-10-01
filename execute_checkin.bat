@REM Script para ejecutar el contenedor Docker en background eliminando el contenedor al finalizar
@REM Determina si se está ejecutando en PowerShell o CMD y ajusta el comando de delay entre 1 y 20 minutos

@echo off
if defined PSModulePath (
    echo "Ejecutando en PowerShell"
    powershell -Command "$delay = Get-Random -Minimum 1 -Maximum 20; $seconds = $delay * 60; Start-Sleep -Seconds $seconds"
    docker run --rm -v %cd%/cypress:/app/cypress fichajegdh:1.0 npx cypress run --spec "cypress/e2e/gdh_close.cy.js"

) 
else (
    echo "Ejecutando en CMD"
    set /a "delay=%random% %% 20 + 1"
    set /a "seconds=%delay% * 60"
    timeout /t %seconds% /nobreak
    docker run --rm -v %cd%/cypress:/app/cypress fichajegdh:1.0 npx cypress run --spec "cypress/e2e/gdh_open.cy.js"
)
