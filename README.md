## Build Authentication Service
### Build all containers, this will run the required server and performs unit testing
```sudo docker-compose up --build```
### Build using docker-compose CLI
```sudo docker-compose build```
### Open running container and run a shell
```sudo docker exec -it [container-id] sh```
### Open new shell to container authentication service.
```sudo docker-compose run --entrypoint sh auth-service```


## Redis
### Open redis-cli
```sudo docker exec -it [container-id] redis-cli```

## Unit testing
### To run unit test, just uncomment the auth-test-service from docker-compose.yml file
```auth-test-service```

### Open shell to test container authentication service.
```sudo docker exec -it [container-id] yarn run test:auth```

### All test files are currenty located at __test__ directory.
```./__test__/*```
### Run test for each services
```mocha ./__test__/services/{directory}```
### Run all test files
```mocha ./__test__ --recursive```
### Alternatively you can run test with the source file
```mocha './services/**/*.test.js'```

## Possible improvements
- make redis connection more robust
- make redis connection pool that can handle multiple request (1M request)
- change lib for request to other alternative http request lib (axios)
