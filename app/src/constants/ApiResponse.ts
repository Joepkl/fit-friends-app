export default interface ApiResponse {
  isSuccess?: boolean;
  error?: string;
  token?: string | null;
  responseData?: any;
}
