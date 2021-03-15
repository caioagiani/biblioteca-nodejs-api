.PHONY: up
up:
	  docker-compose up -d

.PHONY: stop
stop:
	  docker-compose stop

.PHONY: down
down:
	  docker-compose down

.PHONY: logs
logs:
	  docker-compose logs --tail="all" -f api

.PHONY: test
test:
	  docker-compose run --rm api npm test
