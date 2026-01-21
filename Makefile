# Stacks Quest Boards Development Makefile
# Commands for frontend and docs tooling

.PHONY: help install install-frontend dev build lint clean docs-lint docs-serve docker-build docker-run docker-stop setup env-setup info

help: ## Show this help message
	@echo "Stacks Quest Boards Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: install-frontend ## Install dependencies

install-frontend: ## Install frontend dependencies
	cd frontend && npm install

dev: ## Start frontend dev server
	cd frontend && npm run dev

build: ## Build frontend
	cd frontend && npm run build

lint: ## Lint frontend
	cd frontend && npm run lint

docs-lint: ## Lint markdown docs (optional)
	@command -v npx >/dev/null 2>&1 || (echo "npx not found. Install Node.js." && exit 1)
	npx --yes markdownlint-cli '**/*.md' --ignore node_modules

docs-serve: ## Serve docs locally
	@command -v python3 >/dev/null 2>&1 || (echo "python3 not found." && exit 1)
	python3 -m http.server 8000

clean: ## Clean build artifacts
	rm -rf frontend/.next frontend/node_modules/.cache

docker-build: ## Build Docker image
	docker build -t stacks-quest-boards-frontend .

docker-run: ## Run Docker container
	docker run -it --rm -p 3000:3000 stacks-quest-boards-frontend

docker-stop: ## No-op for local dev
	@echo "Nothing to stop."

setup: install ## Setup development environment
	@echo "Setup complete."

env-setup: ## Create .env template
	@echo "Creating .env file..."
	@echo "# Stacks Quest Boards env" > .env
	@echo "NEXT_PUBLIC_APP_NAME=Stacks Quest Boards" >> .env
	@echo "NEXT_PUBLIC_BASE_URL=http://localhost:3000" >> .env

info: ## Show project information
	@echo "Stacks Quest Boards"
	@echo "Frontend: Next.js 16"
	@echo "Docs: Markdown"