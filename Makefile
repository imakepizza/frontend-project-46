install: install-deps
install-deps:
	npm ci
gendiff:
	node bin/gendiff.js
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
publish:
	npm publish --dry-run
lint: 
	npx eslint