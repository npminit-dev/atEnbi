import Papa from "papaparse";
import { useEffect, useState } from "react";
import pricingCSV from '../assets/pricing.csv?raw';
import type { PricingData, PricingDictionary } from "../typedefs";
import { GBs } from "../utils";

const usePricing = () => {
  const [pricingData, setPricingData] = useState<PricingDictionary|null>(null);

  useEffect(() => {
    const { data: parsedData }: Papa.ParseResult<PricingData> = Papa.parse(pricingCSV, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      preview: 717,
      transformHeader: header => {
        if (header === "Column 1") return "CountryName";
        return header.replaceAll(" ", "");
      },
    });

    const reduced = parsedData.reduce((acc, curr) => {
      if (curr.CountryCode && GBs.includes(curr.GB)) {
        if (!acc[curr.CountryName]) {
          acc[curr.CountryName] = {
            countryCode: curr.CountryCode,
            plansByGB: {
              [curr.GB]: [
                {
                  days: curr.Days,
                  price: curr.Price,
                },
              ],
            },
          };
        } else {
          const gbPlans = acc[curr.CountryName].plansByGB[curr.GB];
          if (gbPlans) {
            gbPlans.push({ days: curr.Days, price: curr.Price });
          } else {
            acc[curr.CountryName].plansByGB[curr.GB] = [
              { days: curr.Days, price: curr.Price },
            ];
          }
        }
      }
      return acc;
    }, {} as PricingDictionary);

    setPricingData(reduced);
  }, []);

  return { pricingData };
};

export default usePricing;
