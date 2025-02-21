FROM node:22
WORKDIR /app

RUN npm install -g pnpm

ADD package*.json .
ADD pnpm-lock.yaml .
RUN pnpm install

COPY . .
RUN pnpm run build

FROM httpd:2.4-alpine

COPY --from=0 /app/dist/prime-project-main/browser /usr/local/apache2/htdocs/
COPY --from=0 /app/.docker/httpd.conf /usr/local/apache2/conf/httpd.conf