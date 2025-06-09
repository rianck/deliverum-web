export type Company = {
    id: number;
    cnpj: string;
    reasonName: string;
    fantasyName: string;
    cep: string; 
    address: string;
    district: string;
    numberAddress: string;
    city: string;
    complement: string;
    responsible: string;
    email: string;
    phone: string;
    logo?: string; // URL ou base64 da imagem
  }