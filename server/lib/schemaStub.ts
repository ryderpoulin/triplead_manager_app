// runtime + compile-time stub for schema

// export as types so TS doesn't confuse them as runtime values
export type Trip = Record<string, any>;
export type Signup = Record<string, any>;
export type TripsResponse = Record<string, any>;
export type SignupsResponse = Record<string, any>;
export type RandomizeResponse = Record<string, any>;
export type ApproveRandomizationResponse = Record<string, any>;
export type AddFromWaitlistResponse = Record<string, any>;
export type DropParticipantResponse = Record<string, any>;
export type User = Record<string, any>;
export type InsertUser = Record<string, any>;

export const randomizeRequestSchema: any = {};
export const approveRandomizationRequestSchema: any = {};
export const addFromWaitlistRequestSchema: any = {};
export const addDriverRequestSchema: any = {};
export const addNonDriverRequestSchema: any = {};
export const reAddParticipantRequestSchema: any = {};
export const dropParticipantRequestSchema: any = {};

export default {};

