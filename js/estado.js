// estado.js · El estado de la app y las ÚNICAS funciones que lo cambian

import { crearPedido } from "./pedidos.js";

export const estado = {
    carrito: [],        // [{ id: 2, cantidad: 3 }, ...]
    busqueda: "",
    categoria: "todas",
    envio: "retiro",
    pedidos: 0,
    historial: [],      // [{ numero, fecha, unidades, envio, total }, ...] el más reciente primero
};

export function agregar(id) {
    const item = estado.carrito.find((i) => i.id === id);
    if (item) {
        item.cantidad++;
    } else {
        estado.carrito.push({ id: id, cantidad: 1 });
    }
}

export function quitar(id) {
    estado.carrito = estado.carrito.filter((i) => i.id !== id);
}

export function cambiarCantidad(id, cambio) {
    const item = estado.carrito.find((i) => i.id === id);
    item.cantidad += cambio;
    if (item.cantidad <= 0) quitar(id);
}

export function vaciar() {
    estado.carrito = [];
}

// Registra un pedido y devuelve su número con formato "001"
export function registrarPedido() {
    estado.pedidos++;
    const numero = String(estado.pedidos).padStart(3, "0");
    estado.historial.unshift(crearPedido(numero, estado.carrito, estado.envio));
    vaciar();
    return numero;
}