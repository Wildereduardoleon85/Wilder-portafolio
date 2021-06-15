import { proyectos } from "../data/proyectos.js";

window.addEventListener('scroll', ()=>{
    sessionStorage.setItem('scrollPosition', window.scrollY);
}, false);

window.addEventListener('load', ()=>{
    if(sessionStorage.getItem('scrollPosition') !== null)
    window.scrollTo(0, sessionStorage.getItem('scrollPosition'));
}, false);

let salida = '';

proyectos.forEach((item, index)=>{

    salida+=`
        <div id="proyecto" class="thumbnail2">
            <div id="${index}" class="overlay2">
                <div>
                    <h2 id="${index}">${item.nombre}</h2>
                    <p id="${index}">${item.lenguajes}</p>
                </div>
            </div>
            <img src="img/proyectos/${item.imagen}" alt="${item.nombre}">
        </div>
    `;
});

document.querySelector('#salida-pro').innerHTML = salida;

const pro_elementos2 = Array.from(document.getElementsByClassName('overlay2'));
const pro_elementos3 = Array.from(document.getElementsByClassName('thumbnail2'));

pro_elementos2.forEach((item)=>{
    item.addEventListener('click', (e)=>{

        pro_elementos3.forEach((item)=>{
            item.style.opacity = '0';
            setTimeout(()=>{  
                item.remove();
            }, 500);
        });

        const titulo =  document.createElement('h2');
        titulo.className= 'subtitulo';
        titulo.id = 'titulo-proyecto'
        titulo.innerHTML = proyectos[e.target.id].nombre;
        
        const div =  document.createElement('div');
        div.className= 'single-pro';
        div.id= 'single-pro';
        div.innerHTML = `

            <div class="left">
                <div class="resp"><img src="img/proyectos/${proyectos[e.target.id].imagen3}" alt=""></div>
                <div class="normal">
                    <div ><img src="img/proyectos/${proyectos[e.target.id].imagen}" alt=""></div>
                    <div style="margin-top: 15px;"><img src="img/proyectos/${proyectos[e.target.id].imagen2}" alt=""></div>
                </div>
            </div>

            <div class="right">
                <p>
                    ${proyectos[e.target.id].descripcion}
                </p>
                <p class="links">
                    ${proyectos[e.target.id].demo_url ? `<a href="${proyectos[e.target.id].demo_url}" target="_blank">Live Demo </a><span>` : ``}
                    <a href="${proyectos[e.target.id].repositorio}" target="_blank"> Repositorio Github</a></span>
                    <a id="sub-volver"> Volver</a>
                </p>
            </div>
        `;

        setTimeout(()=>{
            document.querySelector('h2.subtitulo', '#salida-pro').remove();
            document.querySelector('#proyectos').appendChild(titulo);
            document.querySelector('#proyectos').appendChild(div);

            document.getElementById('sub-volver').addEventListener('click', ()=>{
                document.querySelector('#single-pro').style.opacity = '0';
                document.querySelector('#titulo-proyecto').style.opacity = '0';
                setTimeout(()=>{
                    document.querySelector('#single-pro', '#titulo-proyecto').remove();
                    window.location.href="index.html";
                }, 500)
                
                });
            }, 500);
    })
});

