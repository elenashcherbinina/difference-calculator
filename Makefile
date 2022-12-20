install:
	npm ci

publish:
	npm publish --dry-run

lint: 
	npx eslint .

gendiff:
	node bin/gendiff.js

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-watch:
	npx jest --watch

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

coverageCommand: 
	make test-coverage