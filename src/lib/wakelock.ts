// Screen WakeLock Helper - Antrenman sırasında ekran kapanmasını engeller

class WakeLockHelper {
  private sentinel: WakeLockSentinel | null = null;

  async requestWakeLock() {
    if (typeof window === "undefined" || !("wakeLock" in navigator)) {
      return false;
    }

    try {
      this.sentinel = await navigator.wakeLock.request("screen");
      this.sentinel.addEventListener("release", () => {
        this.sentinel = null;
      });
      return true;
    } catch (err) {
      console.warn("WakeLock request failed:", err);
      return false;
    }
  }

  releaseWakeLock() {
    if (this.sentinel) {
      this.sentinel.release().catch(() => {});
      this.sentinel = null;
    }
  }
}

export const wakeLockHelper = new WakeLockHelper();
