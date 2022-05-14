.PHONY: help

KERNEL_NAME := $(shell uname -s)
ifeq ($(KERNEL_NAME),Linux)
    OPEN := xdg-open
else ifeq ($(KERNEL_NAME),Darwin)
    OPEN := open
else
    $(error unsupported system: $(KERNEL_NAME))
endif

CONTRACT_NAME=StarNotary
DEPLOYED_NETWORK=rinkeby
PROJECT_ROOT_PATH:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

help: ## Print this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

verify: ## Publish and verify contract to etherscan
	truffle run verify $(CONTRACT_NAME) --network $(DEPLOYED_NETWORK)

deploy: ## Compile and deploy contract
	truffle migrate --reset --network $(DEPLOYED_NETWORK)
