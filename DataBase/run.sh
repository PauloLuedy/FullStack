#!/bin/bash

green='\033[0;32m'
C='\033[0m'
#printf " ${green} Atualizando o linux ............... ${NC}\n"
#sudo apt-get update
#printf " ${green} Instalando Curl para baixar as ferramentas ......................... ${NC}\n"
#sudo apt-get update &&
#sudo apt install curl
#printf " ${green} Instalando Docker ......................... ${NC}\n"
#sudo setfacl -m user:$USER:rw /var/run/docker.sock &&
#sudo apt-get update &&
#sudo apt-get remove docker docker-engine docker.io && 
#sudo apt install docker.io
#printf " ${green} Instalando Node.js v12 ......................... ${NC}\n"
#sudo apt-get update &&
#curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - &&
#sudo apt-get install -y nodejs
#printf " ${green} Verificar versões Node......................... ${NC}\n"
#node -v
#printf " ${green} Verificar versões Docker......................... ${NC}\n"
#docker -v
#printf " ${green} Baixando postgres ......................... ${NC}\n"
#docker run \
#    --name postgres \
#    -e POSTGRES_USER=erickwendel \
#    -e POSTGRES_PASSWORD=minhasenhasecreta \
#    -e POSTGRES_DB=heroes \
#    -p 5432:5432 \
#    -d \
#    postgres
#printf " ${green} Baixando Admin postgres ......................... ${NC}\n"
#docker run \
#    --name adminer \
#    -p 8080:8080 \
#    --link postgres:postgres \
#    -d \
#    adminer
#printf " ${green} Baixando Admin mongoDB ......................... ${NC}\n"
 docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4
printf " ${green} Baixando mongoDB ......................... ${NC}\n"
 docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient
printf " ${green} Configurando mongoDB ......................... ${NC}\n"
 docker exec -it mongodb \
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'erickwendel', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'herois'}]})"
printf " ${green} Iniciando Test nos bancos Mongodb e Postgres ......................... ${NC}\n"
cd ../BackEnd
npm t