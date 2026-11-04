FROM node:17.2.0-alpine3.14 as base
LABEL org.opencontainers.image.vendor="Superklok Labs"
LABEL org.opencontainers.image.authors="trev@superklok.com"
LABEL org.opencontainers.image.title="SliderPilerPointCa"
LABEL org.opencontainers.image.description="Slider Piler (Français)"
LABEL org.opencontainers.image.version="2.3.11"
LABEL org.opencontainers.image.created="2026-11-03"
LABEL org.opencontainers.image.url="https://hub.docker.com/r/superklok/sliderpilerpointca"
LABEL org.opencontainers.image.source="https://github.com/Superklok/SliderPilerPointCa"
LABEL org.opencontainers.image.licenses="ISC"
ENV NODE_ENV=production
WORKDIR /usr/src/app
EXPOSE 80
ENV PORT 80
COPY package*.json ./
RUN npm i
COPY . .

FROM base as dev
ENV NODE_ENV=development
CMD ["npm", "start"]
USER node

FROM dev as test
RUN npm audit
USER root

FROM base as prod
RUN npm run build
RUN npm i serve -g
CMD ["serve", "-s", "build", "-p", "80"]
USER node