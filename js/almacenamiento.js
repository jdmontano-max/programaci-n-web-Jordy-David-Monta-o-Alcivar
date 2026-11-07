// almacenamiento.js · Guarda y recupera el estado en localStorage.
// Solo se guarda lo que debe sobrevivir al recargar (no la búsqueda ni el filtro).

import { catalogo } from "./datos.js";

const CLAVE = "tiendaTech.estado";
const ENVIOS_VALIDOS = ["retiro", "cuenca", "nacional"];

export function guardar(estado) {
    try {
        const { carrito, envio, pedidos, historial } = estado;
        localStorage.setItem(CLAVE, JSON.stringify({ carrito, envio, pedidos, historial }));
    } catch (error) {
        console.warn("No se pudo guardar el estado:", error);
    }
}

// Devuelve un objeto con los datos válidos, o null si no hay nada guardado.
export function cargar() {
    try {
        const texto = localStorage.getItem(CLAVE);
        if (!texto) return null;
        const datos = JSON.parse(texto);

        // Se descartan productos que ya no existen en el catálogo o con cantidades inválidas
        const carrito = Array.isArray(datos.carrito)
            ? datos.carrito.filter(
                (i) => catalogo.some((p) => p.id === i.id) && Number.isInteger(i.cantidad) && i.cantidad > 0
            )
            : [];

        return {
            carrito,
            envio: ENVIOS_VALIDOS.includes(datos.envio) ? datos.envio : "retiro",
            pedidos: Number.isInteger(datos.pedidos) ? datos.pedidos : 0,
            historial: Array.isArray(datos.historial) ? datos.historial : [],
        };
    } catch (error) {
        console.warn("No se pudo cargar el estado guardado:", error);
        return null;
    }
}
