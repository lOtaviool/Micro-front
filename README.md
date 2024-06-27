Como executar o projeto:
O container se comunica com as portas específicadas em cada url, com isso, para rodar a aplicação siga os passos abaixo:

Abra um terminal pra cada aplicação e execute:
root - (container)
C:\...\Micro-front\root> npm start -- --port 9000

nav-bar - (menu lateral)
C:\...\Micro-front\nav-bar> npm run start -- --port 8081

app1 - (app react)
C:\...\Micro-front\app1> npm run start -- --port 8080

app2 - (app angular)
C:\...\Micro-front\app2> npm run start -- --port 8082

app3 - (app vue)
C:\...\Micro-front\app3> npm run serve -- --port 8083
