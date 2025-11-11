declare module "@shared/schema.js" {
  // Create dummy types so TypeScript stops complaining
  export interface Trip { [key: string]: any }
  export interface Signup { [key: string]: any }
  export interface TripsResponse { [key: string]: any }
  export interface SignupsResponse { [key: string]: any }
  export interface RandomizeResponse { [key: string]: any }
  export interface ApproveRandomizationResponse { [key: string]: any }
  export interface AddFromWaitlistResponse { [key: string]: any }
  export interface DropParticipantResponse { [key: string]: any }
  export const randomizeRequestSchema: any
  export const approveRandomizationRequestSchema: any
  export const addFromWaitlistRequestSchema: any
  export const addDriverRequestSchema: any
  export const addNonDriverRequestSchema: any
  export const reAddParticipantRequestSchema: any
  export const dropParticipantRequestSchema: any
  export interface User { [key: string]: any }
  export interface InsertUser { [key: string]: any }
  const dummy: any
  export default dummy
}
