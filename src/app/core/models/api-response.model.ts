export interface ApiResponse<T = any> {
  status: boolean; // true for success, false for failure
  message: string; // Response message
  data?: T; // Generic type for the actual response data (optional)
  error?: any; // Error details if the request fails (optional)
  user: any; // Generic type for the actual response data (optional)
}
