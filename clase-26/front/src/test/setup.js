import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

// RTL no auto-limpia cuando no usamos globals de Vitest
afterEach(() => {
    cleanup()
})
