FROM node:12-alpine

WORKDIR /app
COPY ./ /app/
RUN npm install 

EXPOSE 5000
RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY PM2_PUBLIC_KEY
ENV PM2_SECRET_KEY PM2_SECRET_KEY

CMD ["pm2-runtime", "app.js"]