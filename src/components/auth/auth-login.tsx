import { useState } from "react";

interface AuthLoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  error?: string;
  loading?: boolean;
}

export default function AuthLogin({ onLogin, error, loading }: AuthLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!email || !password) {
      setLocalError("Please enter both email and password.");
      return;
    }
    try {
      await onLogin(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError("An unknown error occurred.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-xs"
    >
      <h2 className="text-2xl font-bold text-center mb-2 text-white">
        Sign in
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-lg px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
        autoFocus
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-lg px-4 py-2 bg-white/20 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      {(localError || error) && (
        <div className="text-red-400 text-sm text-center">
          {localError || error}
        </div>
      )}
      <button
        type="submit"
        className="bg-secondary text-black font-semibold rounded-lg px-4 py-2 mt-2 hover:bg-secondary/80 transition disabled:opacity-60 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
