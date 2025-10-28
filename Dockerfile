FROM cypress/base:22.20.0

WORKDIR /app

# Copia los ficheros para instalar dependencias
#Se omite la carpeta cypress.js dado que ahí deben estar las credenciales del usuario
COPY package.json package-lock.json /app/

# Utiliza como volumen la carpeta cypress del host
VOLUME ["/app/cypress"]

# Instala las dependencias
RUN npm ci

# Test por defecto para comprobar que todo funciona correctamente
CMD ["npx", "cypress", "run", "--spec", "cypress/e2e/dummy.cy.js"]