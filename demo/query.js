import { buildSchema, graphql, parse, getOperationAST } from 'graphql';
const profil={nom:'Atlas',prenom:'Nora',metier:'Développeuse full-stack',localisation:'Agadir'};
const competence={id:'c1',nom:'GraphQL',niveau:4,categorie:{id:'cat1',nom:'API'}};
const projet={id:'p1',titre:'Catalogue culturel',description:'Projet fictif de billetterie',technologies:['TypeScript','GraphQL'],competences:[competence]};
const experience={id:'e1',poste:'Développeuse',entreprise:'Atelier Démo',competences:[competence]};
const portfolio={profil,projets:[projet],competences:[competence],experiences:[experience]};
const rootValue={getPortfolio:()=>portfolio,getProfil:()=>profil,getProjets:()=>portfolio.projets,getProjet:({id})=>portfolio.projets.find(p=>p.id===id),
  getCompetences:()=>portfolio.competences,getCompetence:({id})=>portfolio.competences.find(c=>c.id===id),
  getExperiences:()=>portfolio.experiences,getExperience:({id})=>portfolio.experiences.find(e=>e.id===id)};
async function main(){
 const response=await fetch('schema.graphql');
 if(!response.ok)throw new Error('Schéma indisponible');
 const schema=buildSchema(await response.text());
 const button=document.querySelector('button'),input=document.querySelector('textarea'),result=document.querySelector('pre');
 async function run(){
  try {
   const source=input.value;
   if(getOperationAST(parse(source))?.operation!=='query')throw new Error('Cette démo accepte une seule requête de lecture.');
   result.textContent=JSON.stringify(await graphql({schema,source,rootValue}),null,2);
  } catch(error){result.textContent=error.message;}
 }
 button.onclick=run;button.disabled=false;await run();
}
main().catch(error=>{document.querySelector('pre').textContent=error.message;});
