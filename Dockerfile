FROM node:20
WORKDIR /app
COPY . /app
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM httpd:2.4-alpine
COPY --from=0 /app/dist /usr/local/apache2/htdocs/