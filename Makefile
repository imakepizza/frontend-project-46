install: install-deps
install-deps:
	npm ci
gendiff:
	node bin/gendiff
publish:
	npm publish --dry-run
lint: 
	npx eslint