.PHONY: all
all: 
	cd ./configuration_server && mvn package

	cd ./storage_server && mvn package

	docker-compose build
	
	docker-compose up
	