function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
    if (err && typeof err === "object") {
    try {
      const obj = err as Record<string, unknown>;
      const maybeMsg = obj?.message ?? obj?.error ?? obj?.detail;
      if (typeof maybeMsg === "string") return maybeMsg;
      if (maybeMsg != null) return String(maybeMsg);
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  }
  return String(err);
}
export default getErrorMessage;