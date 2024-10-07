export type Data = {
  customerName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  customerNegozio: string;
  requestType: string;
  requestSpecific: string;
  customerImage: File[];
  checked: boolean;
};

export type CustomerField = {
  name: string;
  label: string;
};

export type RequestType = {
  name1: string;
  name2: string;
  label1: string;
  label2: string;
  selections: Selection[];
};

export type Selection = {
  name: string;
  label: string;
  value: string;
  options: Option[];
};

export type Option = {
  name: string;
  label: string;
  value: string;
};
