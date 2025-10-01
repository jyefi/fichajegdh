#!/bin/bash
# Script para ejecutar el contenedor Docker en background eliminando el contenedor al finalizar
# El resultado de la ejecución estará en la carpeta cypress/logs/warnings.log

delay=$((RANDOM % 1140 + 60))
echo "Esperando $delay segundos antes de ejecutar..."
sleep $delay

# Ejecuta el contenedor, mapeando la carpeta cypress, en modo temporal (elimina el contenedor al terminar la ejecución)
docker run --rm -v $(pwd)/cypress:/app/cypress fichajegdh:1.0 npx cypress run --spec "cypress/e2e/gdh_open.cy.js"

