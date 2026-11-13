import { describe, it, expect } from "vitest"
import { contactoSchema } from "./contacto"

const payloadValido = {
    nombre: "Ada Lovelace",
    email: "ada@ejemplo.com",
    asunto: "Consulta sobre el catalogo",
    mensaje: "Hola, queria hacer una consulta sobre un juego en particular.",
}

describe("contactoSchema", () => {
    it("acepta un payload valido completo", () => {
        const resultado = contactoSchema.safeParse(payloadValido)
        expect(resultado.success).toBe(true)
    })

    it("acepta el minimo exacto de caracteres en mensaje", () => {
        const resultado = contactoSchema.safeParse({
            ...payloadValido,
            mensaje: "1234567890",
        })
        expect(resultado.success).toBe(true)
    })

    it("rechaza un payload vacio", () => {
        const resultado = contactoSchema.safeParse({
            nombre: "",
            email: "",
            asunto: "",
            mensaje: "",
        })
        expect(resultado.success).toBe(false)
        expect(resultado.error.issues.map((i) => i.path[0])).toEqual(
            expect.arrayContaining(["nombre", "email", "asunto", "mensaje"])
        )
    })

    it("rechaza un email con formato invalido", () => {
        const resultado = contactoSchema.safeParse({ ...payloadValido, email: "no-es-un-email" })
        expect(resultado.success).toBe(false)
        expect(resultado.error.issues[0].path).toEqual(["email"])
    })

    it("rechaza un nombre con menos de 3 caracteres", () => {
        const resultado = contactoSchema.safeParse({ ...payloadValido, nombre: "Al" })
        expect(resultado.success).toBe(false)
        expect(resultado.error.issues[0].message).toBe(
            "El nombre debe tener como minimo 3 caracteres"
        )
    })

    it("rechaza un asunto con menos de 4 caracteres", () => {
        const resultado = contactoSchema.safeParse({ ...payloadValido, asunto: "ay" })
        expect(resultado.success).toBe(false)
        expect(resultado.error.issues[0].path).toEqual(["asunto"])
    })

    it("rechaza un mensaje con menos de 10 caracteres", () => {
        const resultado = contactoSchema.safeParse({ ...payloadValido, mensaje: "corto" })
        expect(resultado.success).toBe(false)
        expect(resultado.error.issues[0].message).toBe(
            "El mensaje debe tener como minimo 10 caracteres"
        )
    })

    it("rechaza un mensaje de mas de 500 caracteres", () => {
        const resultado = contactoSchema.safeParse({
            ...payloadValido,
            mensaje: "a".repeat(501),
        })
        expect(resultado.success).toBe(false)
        expect(resultado.error.issues[0].message).toBe(
            "El mensaje no puede superar los 500 caracteres"
        )
    })

    it("recorta los espacios antes de validar", () => {
        const resultado = contactoSchema.safeParse({
            ...payloadValido,
            nombre: "   Ada Lovelace   ",
        })
        expect(resultado.success).toBe(true)
        expect(resultado.data.nombre).toBe("Ada Lovelace")
    })

    it("devuelve mensajes de error en espanol", () => {
        const resultado = contactoSchema.safeParse({ ...payloadValido, email: "abc" })
        expect(resultado.success).toBe(false)
        expect(resultado.error.issues[0].message).toMatch(/email/i)
        expect(resultado.error.issues[0].message).not.toMatch(/\ban? (invalid|required)\b/i)
    })
})
