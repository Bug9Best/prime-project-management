FROM node:22
WORKDIR /app
COPY . /app
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM httpd:2.4-alpine
COPY --from=0 /app/dist/prime-project-main/browser /usr/local/apache2/htdocs/