interface User {
  _id?: string;
  username?: string;
  hasAccess?: boolean;
  lastAction?: string;
  lastActionTime?: Date;
  lastActive?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}