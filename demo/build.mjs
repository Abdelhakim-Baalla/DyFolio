import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises';
import { build } from 'esbuild';
const source = await readFile('../src/schema/index.ts','utf8');
const document = source.match(/export const typeDefs\s*=\s*gql`([\s\S]*?)`/);
if (!document) throw new Error('Schema GraphQL introuvable');
await mkdir('dist',{recursive:true});
await writeFile('dist/schema.graphql',document[1]);
await copyFile('index.html','dist/index.html');
await build({entryPoints:['query.js'],outfile:'dist/query.js',bundle:true,minify:true});
