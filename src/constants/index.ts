import type { CustomerField, RequestType } from "@/types";

export const customerData: CustomerField[] = [
  {
    name: "customerName",
    label: "Nome",
  },
  {
    name: "customerLastName",
    label: "Cognome",
  },
  {
    name: "customerEmail",
    label: "Indirizzo email",
  },
  {
    name: "customerPhone",
    label: "Numero di telefono",
  },
  {
    name: "customerNegozio",
    label: "Qual è il tuo negozio preferito? ",
  },
];

export const requestType: RequestType = {
  name1: "motivo1",
  name2: "motivo2",
  label1: "Seleziona motivo di richiesta",
  label2: "Specifica",
  selections: [
    {
      name: "productOrder",
      label: "PRODOTTO/ORDINE",
      value: "1",
      options: [
        {
          name: "productDamaged",
          label: "PRODOTTO DANNEGGIATO",
          value: "11",
        },
        {
          name: "productDefected",
          label: "PRODOTTO DIFETTOSO",
          value: "12",
        },
        {
          name: "productMistaken",
          label: "PRODOTTO SBAGLIATO",
          value: "13",
        },
      ],
    },
    {
      name: "productPayment",
      label: "PAGAMENTO",
      value: "2",
      options: [
        {
          name: "paymentFailed",
          label: "PAGAMENTO ERRATO",
          value: "21",
        },
        {
          name: "documentFailed",
          label: "DOCUMENTO ERRATO ",

          value: "22",
        },
        {
          name: "productExpensive",
          label: "PREZZO ALTO ",

          value: "23",
        },
      ],
    },
    {
      name: "productDelay",
      label: "RITARDO",
      value: "3",
      options: [
        {
          name: "placeNotRespected",
          label: "LUOGO NON RISPETTATO",
          value: "31",
        },
        {
          name: "poseNotRespected",
          label: "POSE NON RISPETTATO ",

          value: "32",
        },
        {
          name: "delayDelivery",
          label: "RITARDO CONSEGNA ",
          value: "33",
        },
      ],
    },
  ],
};
