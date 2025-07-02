import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  isActive?: boolean;
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export function requireAuth(handler: Function) {
  return async (req: NextRequest, ...args: any[]) => {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return handler(req, user, ...args);
  };
}

export function requireRole(allowedRoles: string[]) {
  return function(handler: Function) {
    return requireAuth(async (req: NextRequest, user: AuthUser, ...args: any[]) => {
      if (!allowedRoles.includes(user.role)) {
        return NextResponse.json({ 
          error: "Insufficient permissions" 
        }, { status: 403 });
      }
      return handler(req, user, ...args);
    });
  };
}

export function requireAdmin(handler: Function) {
  return requireRole(['admin'])(handler);
} 