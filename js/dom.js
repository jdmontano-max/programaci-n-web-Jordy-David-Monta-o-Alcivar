// dom.js · Ayudante reutilizable para crear elementos en una sola línea
//
// Export por defecto (reto 4). Se importa SIN llaves: import crearElemento from "./dom.js";
// Ventaja: sintaxis corta y natural cuando el módulo hace UNA sola cosa principal.
// Desventaja: quien importa puede ponerle cualquier nombre (import crear from "./dom.js"),
//   lo que genera inconsistencias entre archivos y dificulta buscar/renombrar usos;
//   además, un módulo solo puede tener un export por defecto.
//
// crearElemento("span", { clase: "precio", texto: "$25.00" })
// crearElemento("button", { texto: "+", datos: { accion: "mas" } })
export default function crearElemento(etiqueta, { clase, texto, datos } = {}) {
    const el = document.createElement(etiqueta);
    if (clase) el.classList.add(...clase.split(" "));
    if (texto !== undefined) el.textContent = texto;
    if (datos) {
        for (const [clave, valor] of Object.entries(datos)) {
            el.dataset[clave] = valor;
        }
    }
    if (etiqueta === "button") el.type = "button";
    return el;
}
