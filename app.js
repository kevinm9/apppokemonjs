  //el ultimo pkemon es mi favorito xd
  //estaba entusiasmo por subir la app ya funcinal xd  
  //hay dos puntos para optimizar mejor (peticiones HTTP sol de las url la descripcion y el pokemon cargalos una sola vez y  manipularlos y no estar volviendo a realizar una peticion otra vez y en vez de reenderizar por un arreglo seria mostrar y ocultar las card de los pokemones)la app que pueda en el futuro lo haga en un framewok 
  const items = document.querySelector(".items");
  const searchUser = document.querySelector('#search');
  const checkBoxfiltro = document.querySelector('#checkfiltro');
  const contenedordepaginas = document.querySelector('.contenedordepages');
  const mybutton = document.querySelector("#btnarriba");
  let pokemos;
  let busquedapokemos=[];
  let infopokemo;
  let filtropokemos;
  let detallepokemonid;
  let scrlx = 0;
  let scrly = 0;
  const colorytraducion =  [
                  {
                  "color": "#A8A878",
                  "name": "normal",
                  "esp": "normal"
                  },
                  {
                  "color": "#D56723",
                  "name": "fighting",
                  "esp": "luchador"
                  },
                  {
                  "color": "#536895",
                  "name": "flying",
                  "esp": "volador"
                  },
                  {
                  "color": "#B97FC9",
                  "name": "poison",
                  "esp": "veneno"
                  },
                  {
                  "color": "#7c342b",
                  "name": "ground",
                  "esp": "suelo"
                  },
                  {
                  "color": "#A38C21",
                  "name": "rock",
                  "esp": "roca"
                  },
                  {
                  "color": "#729F3F",
                  "name": "bug",
                  "esp": "bicho"
                  },
                  {
                  "color": "#7B62A3",
                  "name": "ghost",
                  "esp": "fantasma"
                  },
                  {
                  "color": "#9EB7B8",
                  "name": "steel",
                  "esp": "acero"
                  },
                  {
                  "color": "#FD7D24",
                  "name": "fire",
                  "esp": "fuego"
                  },
                  {
                  "color": "#4592C4",
                  "name": "water",
                  "esp": "agua"
                  },
                  {
                  "color": "#9BCC50",
                  "name": "grass",
                  "esp": "planta"
                  },
                  {
                  "color": "#EED535",
                  "name": "electric",
                  "esp": "eléctrico"
                  },
                  {
                  "color": "#F366B9",
                  "name": "psychic",
                  "esp": "psíquico"
                  },
                  {
                  "color": "#51C4E7",
                  "name": "ice",
                  "esp": "hielo"
                  },
                  {
                  "color": "#7038F8",
                  "name": "dragon",
                  "esp": "dragón"
                  },
                  {
                  "color": "#707070",
                  "name": "dark",
                  "esp": "siniestro"
                  },
                  {
                  "color": "#FDB9E9",
                  "name": "fairy",
                  "esp": "hada"
                  },
                  {
                  "color": "#6D6D4E",
                  "name": "unknown",
                  "esp": "desconocido"
                  },
                  {
                  "color": "#705848",
                  "name": "shadow",
                  "esp": "sombra"
                }];


const fetchpokemons = () => {
    try {
      fetch('https://pokeapi.co/api/v2/pokemon?offset=000&limit=158')
      .then(resp1 => resp1.json())
      .then(json1 => { 
        console.log(json1);
        const response = Promise.allSettled(json1.results.map((urlpokemon) => 
        fetch(urlpokemon.url)
          .then(resp3 => resp3.json())
          ))
            .then(json2=> {
              console.log(json2);
              pokemos = json2;
              busquedapokemos = pokemos;
              showpokemons(busquedapokemos);
              searchUser.removeAttribute('disabled');
              checkBoxfiltro.removeAttribute('disabled');
            }).then(resp5 => console.log(resp5))
        })
      .catch(err => alert("ocurrio un error con el servidor *url"+err))
    }catch(error) {console.error(error);}
}



const fetchpokemonsfiltro = () => { 
    try {
      fetch('https://pokeapi.co/api/v2/ability/solar-power')
      .then(resp1 => resp1.json())
      .then(json1 =>{ 
        console.log(json1);
        Promise.allSettled(json1.pokemon.map((urlpokemon) => 
        fetch(urlpokemon.pokemon.url)
          .then(resp2 => resp2.json())))
            .then(json2=> {
              filtropokemos = json2;
              console.log(json2);
            })
        }
        ).catch(err => alert("ocurrio un error con el servidor *url"+err))
    }catch(error) {console.error(error);}
}

const fetchinfopokemon = (id) => {
    try {
      fetch('https://pokeapi.co/api/v2/pokemon-species/'+id)
      .then(r_esp1 => r_esp1.json())
      .then(j_son1 => { 
        infopokemon = j_son1;
        showinfopokemons(infopokemon);
        })
    }catch(error) {console.error(error);}
}

const showinfopokemons = (obj) => {
  document.querySelector('.fotitoinfo').setAttribute("src", "https://pokeres.bastionbot.org/images/pokemon/"+obj.id+".png");
  let txtesp= "";
  let limiteguion = 0;
  obj.flavor_text_entries.forEach(function(el){
        if(el.language.name == "es" && limiteguion<2){
          txtesp += el.flavor_text+" "
          limiteguion++;
        }
    });
  document.querySelector('.tpokedescripcion').innerHTML = txtesp;
  document.querySelector('.tpoketipo').innerHTML = obj.genera[5].genus;
}


function color(txt){
  let cor = "";
  colorytraducion.forEach(function(el){
    if(el.name == txt){ cor = el.color;}
  });
  return cor;
}

function traduccion(txt){
  let nom = "";
  colorytraducion.forEach(function(el){
    if(el.name == txt){ nom = el.esp;}
  });
  return nom;
}

const showpokemons = (obj) => {
      let output = "";
      obj.forEach((ele) => {
          if(ele.status == "fulfilled"){
            output += `<div onclick="adelante(${ele.value.id});" class="pokemonselect w-full rounded-lg overflow-hidden shadow-lg mx-auto cursor-pointer hover:shadow-2xl transition-all duration-200 ease-in-out transform hover:-translate-y-2" style="background-color: rgb(255, 255, 255);"><div class="pokemonselect1 py-32 mx-auto w-full flex items-center justify-center relative" style="background-color:`+ color(ele.value.types[0].type.name)+`;"><p class="text-6xl font-semibold text-black text-opacity-25 absolute tracking-xl inset-x-0 top-0 pointer-events-none">#${ele.value.id}</p><div class="inset-x-auto bottom-0 absolute z-20" style="width: 175px; height: 175px;"><div class="rounded-full absolute z-0 inset-x-auto mx-auto" style="width: 130px; height: 130px; z-index: -10; bottom: 8px; left: 16px; background-color: rgba(255,255,255,0.5);"></div><img onerror="this.src='http://s3.amazonaws.com/gt7sp-prod/decal/88/06/57/5990359323483570688_1.png';" loading="lazy" src="https://pokeres.bastionbot.org/images/pokemon/${ele.value.id}.png" style="filter: blur(0px); transition: filter 500ms ease 0s;" alt="${ele.value.name}"></div></div><div class="bg-white w-full pt-5 pb-8 text-center"><h1 class="capitalize font-semibold text-3xl mb-2">${ele.value.name}</h1><div class="flex flex-wrap mx-auto justify-center"><p class="font-bold uppercase text-sm text-gray-400">${traduccion(ele.value.types[0].type.name)}</p></div></div></div>`
          }
        }
      );
      items.innerHTML = output;
}


const showdetallespokemonid = (obj) => {
  document.querySelector('.tpoketitulo').innerHTML = obj.name;
  document.querySelector('.tpokenombre').innerHTML = obj.name;

  if((obj.abilities).length > 1){
    document.querySelector('.tpokehabilidad2').style.visibility = 'visible';
    document.querySelector('.tpokehabilidad1').innerHTML = obj.abilities[0].ability.name;
    document.querySelector('.tpokehabilidad2').innerHTML = obj.abilities[1].ability.name;
  }else{
    document.querySelector('.tpokehabilidad1').innerHTML = obj.abilities[0].ability.name;
    document.querySelector('.tpokehabilidad2').style.visibility = 'hidden';
    
  }

  document.querySelector('.tpokealtura').innerHTML = (parseInt(obj.height, 10)/10) +" m";
  document.querySelector('.tpokepeso').innerHTML = (parseInt(obj.weight, 10)/10) + " kg";
  document.querySelector('.tpokeexp').innerHTML = obj.base_experience;
  document.querySelector('#HP').value = obj.stats[0].base_stat;
  document.querySelector('#ATK').value = obj.stats[1].base_stat;
  document.querySelector('#DEF').value = obj.stats[2].base_stat;
  document.querySelector('#SATK').value = obj.stats[3].base_stat;
  document.querySelector('#SDEF').value = obj.stats[4].base_stat;
  document.querySelector('#SDP').value = obj.stats[5].base_stat;
}

const fetchdetallespokemonid = (id) => {
    try {
      fetch('https://pokeapi.co/api/v2/pokemon/'+id)
      .then(resp1 => resp1.json())
      .then(json1 => { 
        detallepokemonid = json1;
        showdetallespokemonid(detallepokemonid);
        })
    }catch(error) {console.error(error);}
}

const adelante = (id) => {
  document.querySelector('.tpokedescripcion').innerHTML = "";
  document.querySelector('.tpoketipo').innerHTML = "";
  document.querySelector('.tpoketitulo').innerHTML = "";
  document.querySelector('.tpokenombre').innerHTML = "";
  document.querySelector('.tpokehabilidad1').innerHTML = "";
  document.querySelector('.tpokehabilidad2').innerHTML = "";
  scrly = window.scrollY;
  scrlx = window.scrollX;
  contenedordepaginas.style.transform = "translate(-100%)";
  window.scrollTo(0,0);
  fetchinfopokemon(id);
  fetchdetallespokemonid(id);
}


const atras = () =>{
  contenedordepaginas.style.transform = "translatex(0%)";
  window.scrollTo(scrlx,scrly);
  document.querySelector('.fotitoinfo').setAttribute("src", "https://projectpokemon.org/images/summary-backgrounds/shiny_effect_blue.gif");
}

document.addEventListener("DOMContentLoaded", function() {
  searchUser.setAttribute('disabled', true);
  checkBoxfiltro.setAttribute('disabled', true);
  fetchpokemons();
  fetchpokemonsfiltro();
    });

searchUser.addEventListener('input', e => {
  const element = e.target.value.toLowerCase()
  const nuevo_pokemon = busquedapokemos.filter(function(pokemon){
    if(pokemon.status == "fulfilled"){
    return pokemon.value.name.toLowerCase().includes(element)
    }
  });
  showpokemons(nuevo_pokemon)
  console.log(nuevo_pokemon);
})



checkBoxfiltro.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    busquedapokemos = filtropokemos;
    showpokemons(busquedapokemos);
    searchUser.value="";
  } else {
    busquedapokemos = pokemos;
    showpokemons(busquedapokemos);
    searchUser.value="";
  }
})

