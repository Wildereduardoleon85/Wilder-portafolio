import { certificados } from "../data/certificados.js";

window.addEventListener('scroll', ()=>{
    sessionStorage.setItem('scrollPosition', window.scrollY);
}, false);

window.addEventListener('load', ()=>{
    if(sessionStorage.getItem('scrollPosition') !== null)
    window.scrollTo(0, sessionStorage.getItem('scrollPosition'));
}, false);

let salida =''; 

certificados.forEach((item, index)=>{

    salida += `
        <div  class="thumbnail">
            <div id="${index}" class="overlay">
                <div>
                    <h2 id="${index}">${item.nombre}</h2>
                    <p id="${index}">Por ${item.emisor}</p>
                </div>
            </div>
            <img src="img/certificados/${item.imagen}" alt="${item.nombre}">
        </div>
    `
});

document.querySelector('#salida').innerHTML = salida;

const elementos = Array.from(document.getElementsByClassName('overlay'));
const elementos2 = Array.from(document.getElementsByClassName('thumbnail'));

const mostrar = (e)=>{
    elementos2.forEach((item)=>{
        item.style.opacity = '0';
    })

    setTimeout(() => {
        elementos2.forEach((items)=>{
            items.remove();
        })
    }, 500); 

    let salida2 = `
        <div id="newDiv" class="single">
            <div class="imagen">
                <img src="img/certificados/${certificados[e.target.id].imagen}" alt="${certificados[e.target.id].nombre}">
            </div>

            <div class="texto">
                <p>
                    ${certificados[e.target.id].descripción}
                </p>

                <div><a href="${certificados[e.target.id].url}" target="_blank">Ver Credencial En Sitio Web</a></div>
                <div class="volver"><a id="volver">Volver</a></div>
            </div>
        </div>
    `;

    setTimeout(()=>{
        document.querySelector('#salida').innerHTML = salida2;
        document.querySelector('#volver').addEventListener('click', ()=>{
            document.querySelector('#newDiv').style.opacity = '0';
            setTimeout(()=>{
                window.location.href = "index.html";
            }, 500);
        })
    }, 500);

    

};

elementos.forEach((item)=>{
    item.addEventListener('click', mostrar)
})








    