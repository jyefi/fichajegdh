FROM cypress/base:22.20.0

WORKDIR /app

# 1. Instalamos pnpm globalmente dentro del contenedor
# Aunque evitamos usar npm para dependencias, lo usamos aquí solo para
# hacer el bootstrap de pnpm (o podrías usar corepack enable si la imagen lo soporta)
RUN npm install -g pnpm

# 2. Copiamos el pnpm-lock.yaml en lugar del package-lock.json
# IMPORTANTE: Asegúrate de haber generado este archivo localmente con `pnpm install`
COPY package.json pnpm-lock.yaml /app/

# 3. Instalamos las dependencias
# --frozen-lockfile es el equivalente exacto de 'npm ci' en pnpm
RUN pnpm install --frozen-lockfile

# Utiliza como volumen la carpeta cypress del host
VOLUME ["/app/"]

# 4. Ejecución del test
# Reemplazamos 'npx' por la ejecución directa a través de pnpm
CMD ["pnpm", "cypress", "run", "--spec", "cypress/e2e/dummy.cy.js"]
