import type { Tax, Country } from '../types';

const TAXES_API = 'https://685013d7e7c42cfd17974a33.mockapi.io/taxes';
const COUNTRIES_API = 'https://685013d7e7c42cfd17974a33.mockapi.io/countries';

export const fetchTaxes = async (): Promise<Tax[]> => {
  const response = await fetch(TAXES_API);
  if (!response.ok) {
    throw new Error('Failed to fetch taxes');
  }
  return response.json();
};

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch(COUNTRIES_API);
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  return response.json();
};

export const updateTax = async (tax: Tax): Promise<Tax> => {
  const response = await fetch(`${TAXES_API}/${tax.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tax),
  });
  if (!response.ok) {
    throw new Error('Failed to update tax');
  }
  return response.json();
};

