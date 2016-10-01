# DOJO_Node_2

Guia: 

CREATE TABLE restaurant (
    id      SERIAL PRIMARY KEY,
    name        VARCHAR(40),
    city        VARCHAR(40),
    address VARCHAR(100),
    phone       INTEGER
);

CREATE TABLE menu (
    id      SERIAL PRIMARY KEY,
    name        VARCHAR(40),
    description     VARCHAR(40),
    price       INTEGER,
    restaurant  INTEGER NOT NULL references restaurant(id)
);Peticiones GET desde Navegador


Obtener TODOS los restaurantes
http://localhost:4242/api/restaurants/
Obtener UN restaurante
http://localhost:4242/api/restaurants/Torino

Peticiones POST desde Terminal
curl --data "name=Arbóreo&city=Medellín&address=UdeA&phone=2192000" \
http://127.0.0.1:4242/api/restaurants

curl --data "name=Rikuritas&city=Medellín&address=UdeA&phone=2192010" \
http://127.0.0.1:4242/api/restaurants

curl --data "name=Torino&city=Medellín&address=UdeA&phone=2192020" \
http://127.0.0.1:4242/api/restaurants

Peticiones PUT desde Terminal
curl -X PUT --data "name=Torino&city=Medellin&address=Bosque Plaza&phone=7513696" \
http://127.0.0.1:4242/api/restaurants/3

Peticiones DELETE desde Terminal
curl -X DELETE http://127.0.0.1:4242/api/restaurants/2
