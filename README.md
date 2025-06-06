# prj-vm

## Express 4.18 ==> MongoDB

### You will need to provide an .env file in the root folder with the following values

```shell
    $ cat .env
    MONGO_PWD="<password>"
    MONGO_USERNAME="<username>"
    MONGO_CLIENT_PROTOCOL="<mongodb|mongodb+srv>"
    MONGO_SERVER_AND_PORT="mongodb:<27017>"
    PORT="<web-server-port-number>"
```

### To start the server
```shell
    $ docker compose up -d

    ✔ server  Built 0.0s
    ✔ Network      prj-vm_prj-testimonial-network     Created   0.1s 
    ✔ Container    prj-testimonial-mongodb            Started   1.4s 
    ✔ Container    prj-testimonial-server             Started 
```

### The endpoints

    - curl --request GET --url http://localhost:3000/testimonials
    - curl --request POST --url http://localhost:3000/testimonials --data '{}'
    - curl --request GET --url http://localhost:3000/testimonials/:id
    - curl --request PATCH --url http://localhost:3000/testimonials --data '{}'
    - curl --request DELETE --url http://localhost:3000/testimonials/:id 

### The model

```json
{
  "name": "Kevin Williams",
  "email": "kevinwilliams@fake.edu",
  "hideEmail": true,
  "rating": 4,
  "text": "I So loved your professionalism!"
}
```

## Debugging the site

### Validate the contents of the .env file
```shell
    cat ./.env
```
### If you want to test against a local mongodb, create and/or start the mongodb container
```shell
docker compose -f ./docker-compose.dev.yml --env-file ./.env up --detach
```
### Run the web site
```shell
cd ./server/
npm run start
```