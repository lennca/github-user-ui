#!/bin/bash
echo "Build docker image"
docker build -t app:prod .
echo "Start docker container"
docker run -d -p 8080:80 app:prod