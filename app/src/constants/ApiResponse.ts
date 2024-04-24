export default interface ApiResponse {
  isSuccess?: boolean;
  error?: string;
  status?: number;
  token?: string | null;
  responseData?: any;
}
