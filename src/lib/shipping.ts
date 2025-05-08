import type { Address, Rate } from "@/types/shipping";
import axios from "axios";

const SHIPENGINE_API = "https://api.shipengine.com/v1/rates/estimate";

export async function getRates(to: Address, weightOz: number): Promise<Rate[]> {
  const { data } = await axios.post(
    SHIPENGINE_API,
    {
      carrier_ids: [], // optional: limit to USPS/UPS IDs
      from_country_code: "US",
      to_country_code: to.country,
      weight: { value: weightOz, unit: "ounce" },
    },
    { headers: { "API-Key": process.env.SHIPENGINE_KEY! } }
  );

  // Map response to a light object
  return data.rate_response.rates.map((r: any) => ({
    service: r.service_code,
    provider: r.carrier_friendly_name,
    amount: r.shipping_amount.amount,
    estimatedDays: r.delivery_days,
  }));
}
