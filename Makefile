all: test demo

demo:
	docker compose -f ./docker-compose.yaml up -d

dev:
	$(MAKE) server & $(MAKE) ui

db:
	docker compose -f ./docker-compose.yaml up -d db
server:
	docker compose -f ./docker-compose.yaml up -d backend
uibuild:
	docker compose -f ./docker-compose.yaml up -d frontend

gen: sqlgen oaigen

sqlgen:
	go generate ./sql

oaigen:
	npx openapi --input ./openapi/apispec.yaml --output ./frontend/src/rpcgen
	go generate ./openapi

test:
	go test -race ./...

ui:
	cd ./frontend && npm run dev

stop:
	docker compose down

restart:
	docker compose down
	docker compose up