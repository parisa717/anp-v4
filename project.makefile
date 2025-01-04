#!make
MAKEFLAGS += --silent

ifneq ($(UTILS_INCLUDED),true)
	-include environment/utils.makefile
endif

.PHONY:  create-ui logs start start-prod

start: stop ## Starts microservice
ifneq ($(IS_INSTALLED), true)
	echo  "\033[0;33mnexus_$(SERVICE_NAME) is not installed!\033[0m"
	echo  "\033[0;32mnexus_$(SERVICE_NAME) installation started...\033[0m"
	$(MAKE) .install
endif
	$(info Starting nexus_$(SERVICE_NAME))
	docker compose $(DOCKER_COMPOSE_FILES) up -d
	$(MAKE) .project_run_info 2>/dev/null
	echo ""
	@read -p "Show npm logs? [y/N] " ans && ans=$${ans:-N} ; \
	if [ $${ans} = y ] || [ $${ans} = Y ]; then \
		docker compose $(DOCKER_COMPOSE_FILES)  logs -f -t ; \
	fi


build: .assert_is_installed ## Builds an application
	docker exec nexus_$(SERVICE_NAME) npx nx build $(APP_TO_START)

create-ui: .assert_infrastructure_is_running ## Create new UI
ifeq ($(shell id -u), 0)
	echo "\033[1;41;37mDo not run this action as a root.\033[0m"
	echo "\nInstallation process may ask you for the root password later, when it needs it"
	exit 1
endif
	bash $(ENVIRONMENT_PATH)/bin/monorepo/install_frontend_project.sh

test: ## tests are executed in host
	NX_REJECT_UNKNOWN_LOCAL_CACHE=0 npx nx test:component $(APP_TO_START)
