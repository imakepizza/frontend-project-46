#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<file1> <file2>')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2, program.opts().format));
  });

program.parse();
