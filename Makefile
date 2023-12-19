DC_FILE = ./compose.yaml

DOCKER_COMPOSE = docker compose -p transcendence --file $(DC_FILE)

all:
	$(DOCKER_COMPOSE) up -d --build

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

remove-images:
	@docker rmi -f $$(docker images -q)

remove-containers:
	@docker container prune -f

remove-all: remove-containers remove-images

clear: down remove-all

re: clear all

.PHONY: all volumes up down clear clear_volume re