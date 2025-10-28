FROM cypress/base:22.20.0

WORKDIR /app

# Copia los ficheros para instalar dependencias
COPY package.json package-lock.json /app/

# Instala las dependencias
RUN npm ci

# Utiliza como volumen la carpeta cypress del host
VOLUME ["/app/"]

# Test por defecto
CMD ["npx", "cypress", "run", "--spec", "cypress/e2e/dummy.cy.js"]
