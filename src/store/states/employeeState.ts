export interface Employee {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    startdate: string;
    cafe_id: string;
  }
 
  export interface EmployeeState {
    loading: boolean;
    response: EmployeeListResponse | undefined;
    errors?: string;
  }
  
  export interface EmployeeListResponse {
    data: Employee[] | [];
    meta: any;
    message?: any;
  }