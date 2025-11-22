export interface Tax {
  id: string;
  name: string;
  country: string;
  [key: string]: any; // For any additional fields from API
}

export interface Country {
  id: string;
  name: string;
  [key: string]: any; // For any additional fields from API
}

