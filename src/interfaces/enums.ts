export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum AccountStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  ACTIVATED = 'ACTIVATED',
  SUSPENDED = 'SUSPENDED'
}

export enum TaskStatus {
  OPEN = 'OPEN',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE'
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}