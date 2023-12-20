# Usa la imagen de Node.js como base
FROM node:18.17.0-alpine

# Instala dependencias necesarias para Chromium
RUN apk --no-cache add \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install  --legacy-peer-deps

# Copia el resto de la aplicación
COPY . .

# Ejecuta el comando 'npm run build' para construir la aplicación Next.js
RUN npm run build

# Expone el puerto 3000 en el contenedor
EXPOSE 3000

# Configura variables de entorno para Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_BIN /usr/bin/chromium-browser

# Inicia la aplicación cuando se ejecuta el contenedor
CMD ["npm", "start"]
