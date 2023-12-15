DC_FILE = ./compose.yaml

DOCKER_COMPOSE = docker compose -p transcendence --file $(DC_FILE)

all:
	$(DOCKER_COMPOSE) up -d --build

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

clear: down
	docker system prune -af

re: clear all

.PHONY: all volumes up down clear clear_volume re