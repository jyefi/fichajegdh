FROM cypress/base:22.20.0

WORKDIR /app

# Copia los ficheros para instalar dependencias
COPY package.json package-lock.json cypress.config.js ./

# Utiliza como volumen la carpeta cypress del host
VOLUME ["/app/cypress"]

# Instala las dependencias
RUN npm ci

# Test por defecto para comprobar que todo funciona correctamente
CMD ["npx", "cypress", "run", "--spec", "cypress/e2e/dummy.cy.js"]