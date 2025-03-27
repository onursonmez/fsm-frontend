import axios from "axios";
import { login } from "../services/api";

jest.mock("axios");

describe("Login", () => {
  it("kullanici başarılı giriş testi", async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { username: "TestUser", token: "fake-jwt-token" },
    });

    const result = await login({ email: "demo@demo.com", password: "demodemo" });

    expect(result).toEqual({ token: "fake-jwt-token" });

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/api/auth/login", {
      email: "demo@demo.com",
      password: "demodemo",
    });
  });

  it("kullanıcı başarısız giriş testi", async () => {
    // Mock başarısız yanıt
    (axios.post as jest.Mock).mockRejectedValue(new Error("Giriş başarısız"));

    await expect(login({ email: "demo@demo.com", password: "demodemo" })).rejects.toThrow("Giriş başarısız");

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/api/auth/login", {
      email: "demo@demo.com",
      password: "demodemo",
    });
  });
});
