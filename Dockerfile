FROM node:12.18.4-alpine
ADD . src/
WORKDIR /src
RUN npm i
CMD npm run dev