export interface Cafe {
  id: string;
  name: string;
  logo: string;
  location: string;
  description: string;
}

export interface CafeState {
  loading: boolean;
  response: CafeListResponse | undefined;
  errors?: string;
}

export interface CafeListResponse {
  data: Cafe[] | [];
  meta: any;
  message?: any;
}

