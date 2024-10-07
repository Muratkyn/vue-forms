import { z } from "zod";

export const customerSchema = z.object({
  customerName: z.string().min(1, { message: "Nome obbligatorio" }),
  customerLastName: z.string().min(1, { message: "Cognome obbligatorio" }),
  customerEmail: z
    .string()
    .min(1, { message: "Email obbligatoria" })
    .email({ message: "Email non valida" }),
  customerPhone: z
    .string()
    .min(1, { message: "Telefono obbligatorio" })
    .regex(/^\d+$/, { message: "Numero di telefono non valido" }),
  customerNegozio: z.string().min(1, { message: "Negozio obbligatorio" }),
  requestType: z.string().min(1, { message: "Tipo di richiesta obbligatorio" }),
  requestSpecific: z
    .string()
    .min(1, { message: "Specifiche richiesta obbligatorie" }),
  customerImage: z
    .array(z.instanceof(File))
    .min(1, { message: "Allega almeno un file" }),
  checked: z.literal(true, {
    errorMap: () => ({ message: "Devi accettare i termini per procedere" }),
  }),
});
