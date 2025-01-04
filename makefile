#!make
MAKEFLAGS += --silent

SERVICE_TYPE=node-fe
export

-include environment/util-bootstrap.makefile

# ===== Selection of the service =====
# EXCLUDED_TARGETS = make commands to skip
EXCLUDED_TARGETS = create-ui environment-update
ifneq ($(wildcard environment),)
	ifeq (,$(filter $(EXCLUDED_TARGETS),$(MAKECMDGOALS)))
		ifeq (, $(SELECTED_SERVICE))
			SELECTED_SERVICE := $(shell bash $(ENVIRONMENT_PATH)/bin/interactive_menu.sh --question="Choose application"  $(AVAILABLE_SERVICES))
			ENV_FILE := .env.service.$(SELECTED_SERVICE)
			include $(ROOT_PATH)/$(ENV_FILE)
			-include $(ROOT_PATH)/$(ENV_FILE).local
			export
		endif
	endif
endif

ifneq ($(and $(wildcard $(ROOT_PATH)$(ENV_FILE).local), $(wildcard $(ROOT_PATH)$(APPLICATION_DIR)), $(wildcard $(ROOT_PATH)$(ENV_FILE).local)),)
	IS_INSTALLED := true
else
	IS_INSTALLED := false
endif

-include project.makefile
-include environment/util-commands.makefile
-include environment/install.makefile
-include environment/execute.makefile

.PHONY:install environment-update
install: ## Installs microservice from scratch, or initialises existing microservice
ifeq ($(wildcard environment),)
		-git clone git@gitlab.avag.eu:nexus/infrastructure/development/microservice.git ./environment
endif
	$(MAKE) .install

environment-update: .environment-update ## Update environment logic and reinstall project
