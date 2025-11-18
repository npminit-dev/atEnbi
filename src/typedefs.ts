export interface PricingData {
  CountryName: string;
  CountryCode: string | null;
  GB: string;
  Days: number;
  Price: number;
  Comment: string | null;
}

export interface Dictionary {
  [key: string]: any;
}

export interface PricingEntry {
  days: number;
  price: number;
}

export interface CountryPricing {
  countryCode: string;
  plansByGB: {
    [gb: string]: PricingEntry[];
  };
}

export interface PricingDictionary {
  [countryName: string]: CountryPricing;
}

export interface FormState {
  countryName: string;
  countryCode: string;
  gb: string | null;
  plan: { days: number; price: number } | null;
}
