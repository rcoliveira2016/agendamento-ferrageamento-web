import router from "@/router";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_VUE_APP_SUPABASE_URL,
  import.meta.env.VITE_VUE_APP_SUPABASE_KEY,
  {
    auth: {
      storageKey: "Vue_app_tokens",
    },
  }
);

supabase.auth.onAuthStateChange((state, session) => {
  if (!session?.user) {
    router.push("login");
  }
});
