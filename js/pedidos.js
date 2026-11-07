// pedidos.js · Lógica de los pedidos confirmados (funciones puras, sin DOM)

import { calcularTotales, totalUnidades } from "./calculos.js";

const ETIQUETAS_ENVIO = {
    retiro: "Retiro en el local",
    cuenca: "Envío dentro de Cuenca",
    nacional: "Envío nacional",
};

export const nombreEnvio = (tipo) => ETIQUETAS_ENVIO[tipo] ?? tipo;

// Crea el registro que se guarda en el historial
export function crearPedido(numero, carrito, tipoEnvio) {
    return {
        numero,
        fecha: new Date().toISOString(),
        unidades: totalUnidades(carrito),
        envio: tipoEnvio,
        total: calcularTotales(carrito, tipoEnvio).total,
    };
}

export function formatoFecha(iso) {
    return new Date(iso).toLocaleString("es-EC", { dateStyle: "short", timeStyle: "short" });
}
