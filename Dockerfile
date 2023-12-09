FROM node:18 as builder

RUN apt-get update && apt-get install -y curl 
#    && rm -rf /va/lib/apt/lists/*
WORKDIR /app
COPY package*.json /app

RUN npm install
COPY . .
RUN npm run build

FROM node:18
WORKDIR /app
COPY --from=builder /app /app
COPY . .

#RUN npm install
#RUN npm ci --only=production
#COPY . /app

EXPOSE 3000
CMD ["npm", "start"]
