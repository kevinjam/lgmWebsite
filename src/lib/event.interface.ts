// src/lib/models/event.interface.ts
export interface IEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  isUpcoming: boolean;
  _id?: string; // Optional for MongoDB's _id field
  createdAt?: Date; // Optional for timestamps
  updatedAt?: Date; // Optional for timestamps
}