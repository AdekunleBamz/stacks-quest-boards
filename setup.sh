#!/usr/bin/env bash

# Stacks Quest Boards Setup Script

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

print_info "Setting up Stacks Quest Boards..."

if ! command_exists node; then
  print_warning "Node.js not found. Install Node.js 18+ to run the frontend."
else
  print_success "Node.js found."
fi

if command_exists npm; then
  print_info "Installing frontend dependencies..."
  (cd frontend && npm install)
  print_success "Frontend dependencies installed."
else
  print_warning "npm not found. Install npm to proceed."
fi

if [[ ! -f ".env" ]]; then
  cat > .env << EOF
# Stacks Quest Boards env
NEXT_PUBLIC_APP_NAME=Stacks Quest Boards
NEXT_PUBLIC_BASE_URL=http://localhost:3000
EOF
  print_success ".env created."
else
  print_info ".env already exists."
fi

print_success "Setup complete."
echo ""
print_info "Next steps:"
echo "  1. Start dev server: make dev"
echo "  2. Build frontend: make build"
echo "  3. Lint: make lint"