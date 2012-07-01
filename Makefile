# Reusable commands & options
vows = ./node_modules/vows/bin/vows
vowsOpts = --spec --isolate

# Test directories

basic           = ./test/basic.js
api_methods     = ./test/api-methods.js
help_methods    = ./test/help-methods.js
user_methods    = ./test/user-methods.js
contact_methods = ./test/contact-methods.js
lists_methods   = ./test/lists-methods.js
message_methods = ./test/message-methods.js
report_methods  = ./test/report-methods.js
clean_up        = ./test/clean-up.js

# Make commands

default:
		@echo
		@echo "* Project Tasks"
		@echo "make deps             Install Dependencies"
		@echo "make deps-clean       Removes the node_modules directory"
		@echo "make lint             Run Code Analysis tool (scans entire project)"
		@echo
		@echo "* Test Suites"
		@echo "make tests            Run All tests"
		@echo "make test-basic       Run Basic tests (module specific tests)"
		@echo "make test-api         Run API Methods tests (test fixtures required)"
		@echo "make test-user        Run User Methods tests (test fixtures required)"
		@echo "make test-contact     Run Contact Methods tests (test fixtures required)"
		@echo "make test-lists       Run Lists Methods tests (test fixtures required)"
		@echo "make test-message     Run Message Methods tests (test fixtures required)"
		@echo "make test-report      Run Report Methods tests (test fixtures required)"
		@echo "make test-cleanup     Run Cleanup Methods tests (test fixtures required)"
		@echo

deps:
		@npm install -d
		@./tools/remove-sys-notice

deps-clean:
		@rm -Rf ./node_modules

lint:
		@ls -F | egrep / | egrep -v "(node_modules|test|tools)" | NODE_ENV=lintall xargs -n 1 ./tools/lint
		@echo

test:
		@echo "\nAvailable Test Commands: tests  test-basic test-api test-user test-contact test-lists test-message test-report test-cleanup\n"

tests:
		@${vows} ${vowsOpts} ${basic} ${api_methods} ${help_methods} ${user_methods} ${contact_methods} ${lists_methods} ${message_methods} ${report_methods} ${clean_up}

test-basic:
		@${vows} ${vowsOpts} ${basic}

test-api:
		@${vows} ${vowsOpts} ${api_methods}

test-help:
		@${vows} ${vowsOpts} ${help_methods}

test-user:
		@${vows} ${vowsOpts} ${user_methods}

test-contact:
		@${vows} ${vowsOpts} ${contact_methods}

test-lists:
		@${vows} ${vowsOpts} ${lists_methods}

test-message:
		@${vows} ${vowsOpts} ${message_methods}

test-report:
		@${vows} ${vowsOpts} ${report_methods}

test-cleanup:
		@${vows} ${vowsOpts} ${clean_up}
