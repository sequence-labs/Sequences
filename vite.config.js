import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = process.cwd();

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, "index.html"),
        game: resolve(root, "gamePage.html"),
        termsLegacy: resolve(root, "terms-of-service.html"),
        privacyLegacy: resolve(root, "privacy-policy.html"),
        spyPrivacyLegacy: resolve(root, "spy-privacy-policy.html"),
        patchItPrivacyLegacy: resolve(root, "patchit-privacy-policy.html"),
        supportLegacy: resolve(root, "user-support.html"),
        docsIndex: resolve(root, "docs/index.html"),
        sequencesTerms: resolve(root, "docs/sequences/terms.html"),
        sequencesPrivacy: resolve(root, "docs/sequences/privacy.html"),
        spyPrivacy: resolve(root, "docs/spy/privacy.html"),
        patchItPrivacy: resolve(root, "docs/patchit/privacy.html"),
        support: resolve(root, "docs/support.html")
      }
    }
  }
});
