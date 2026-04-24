export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "user";
    };
  }
  
  declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
  }
}
