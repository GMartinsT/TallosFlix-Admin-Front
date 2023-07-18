# Use a imagem base do Node.js
FROM node:16-alpine

# Defina o usuário
USER root

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /home/app

# Copie todo o código fonte para o diretório de trabalho
COPY . .

# Exponha a porta em que a API será executada
EXPOSE 8080
