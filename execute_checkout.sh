#!/bin/bash
# Script para ejecutar el contenedor Docker en background eliminando el contenedor al finalizar
# El resultado de la ejecución estará en la carpeta cypress/logs/warnings.log

delay=$((RANDOM % 1140 + 60))
echo "Esperando $delay segundos antes de ejecutar..."
sleep $delay

# Ejecuta el contenedor, mapeando todo el proyecto a /app y estableciendo /app como directorio de trabajo para que Cypress encuentre cypress/support
docker run --rm -v "$(pwd)":/app -w /app fichajegdh:1.0 npx cypress run --spec "cypress/e2e/gdh_close.cy.js"

