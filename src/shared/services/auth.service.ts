import type {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "@/shared/types";
import { mockUsers, simulateApiDelay } from "@/shared/data/mockData";

class AuthService {
  /**
   * Login user - Mock implementation only
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    console.log("🔐 Mock login with credentials:", {
      email: credentials.email,
      password: "***",
    });

    // Simulate API delay
    await simulateApiDelay(1000);

    return this.mockLogin(credentials);
  }

  /**
   * Register new user - Mock implementation only
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    console.log("🔐 Mock register with user data:", {
      email: userData.email,
      role: userData.role,
    });

    // Simulate API delay
    await simulateApiDelay(1000);

    return this.mockRegister(userData);
  }

  /**
   * Logout user - Mock implementation only
   */
  async logout(): Promise<void> {
    console.log("🔐 Mock logout");
    // Simulate API delay
    await simulateApiDelay(500);
    this.clearAuthData();
  }

  /**
   * Get current user - Mock implementation only
   */
  async getCurrentUser(): Promise<User> {
    console.log("🔐 Mock getCurrentUser");
    // Simulate API delay
    await simulateApiDelay(300);

    const storedUser = this.getStoredUser();
    if (storedUser) {
      return storedUser;
    }

    throw new Error("No user found");
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("auth_token");
  }

  /**
   * Get stored user data
   */
  getStoredUser(): User | null {
    if (typeof window === "undefined") return null;
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Get redirect URL based on user role
   */
  private getRedirectUrl(role: string): string {
    switch (role) {
      case "admin":
        return "/admin/dashboard";
      case "employer":
        return "/employer/dashboard";
      case "employee":
        return "/employee/dashboard";
      default:
        return "/dashboard";
    }
  }

  /**
   * Set token in localStorage
   */
  private setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("auth_token", token);
  }

  /**
   * Store user data locally
   */
  private setUser(user: User): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Clear authentication data
   */
  private clearAuthData(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  }

  /**
   * Refresh authentication token - Mock implementation only
   */
  async refreshToken(): Promise<AuthResponse> {
    console.log("🔐 Mock refreshToken");
    // Simulate API delay
    await simulateApiDelay(500);

    const storedUser = this.getStoredUser();
    if (!storedUser) {
      throw new Error("No user found");
    }

    const mockToken = "mock_token_" + Date.now();
    const authResponse: AuthResponse = {
      user: storedUser,
      token: mockToken,
      token_type: "Bearer",
      expires_in: 3600,
      redirect_url: this.getRedirectUrl(storedUser.role),
    };

    // Store token and user data
    this.setToken(mockToken);
    this.setUser(storedUser);

    return authResponse;
  }

  /**
   * Mock login with predefined accounts
   */
  private async mockLogin(credentials: LoginRequest): Promise<AuthResponse> {
    // Find user by email
    const mockUser = mockUsers.find((user) => user.email === credentials.email);

    if (!mockUser) {
      throw new Error("Invalid email or password");
    }

    // For demo purposes, accept any password for predefined accounts
    const mockToken = "mock_token_" + Date.now();
    const authResponse: AuthResponse = {
      user: mockUser,
      token: mockToken,
      token_type: "Bearer",
      expires_in: 3600,
      redirect_url: this.getRedirectUrl(mockUser.role),
    };

    // Store token and user data
    this.setToken(mockToken);
    this.setUser(mockUser);

    return authResponse;
  }

  /**
   * Mock register for development when API is not available
   */
  private async mockRegister(userData: RegisterRequest): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      specialization: userData.specialization,
      university: userData.university,
      phone: userData.phone,
      location: userData.location,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Determine redirect URL based on role
    const redirectUrl =
      {
        admin: "/admin/dashboard",
        employer: "/employer/dashboard",
        employee: "/employee/dashboard",
      }[userData.role] || "/dashboard";

    const mockToken = "mock_token_" + Date.now();
    const authResponse: AuthResponse = {
      user: mockUser,
      token: mockToken,
      token_type: "Bearer",
      expires_in: 3600,
      redirect_url: redirectUrl,
    };

    // Store token and user data
    this.setToken(mockToken);
    this.setUser(mockUser);

    return authResponse;
  }
}

export const authService = new AuthService();
