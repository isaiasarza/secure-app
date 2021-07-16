export interface AuthService{
   auth(email: string, password: string): Promise<boolean>; 
}