import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase/server";

/**
 * Authenticate the current request using the Supabase Auth session.
 * Returns safe user information (never returns password hashes or auth tokens),
 * or null if unauthenticated.
 */
export async function getAuthenticatedUser() {
  try {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return null;
    }

    // Fetch user profile from public.profiles table
    let profile = null;
    try {
      const supabaseAdmin = getSupabaseAdminClient();
      const { data, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("id, full_name, profile_pic, anonymous_alias, created_at")
        .eq("id", authUser.id)
        .single();

      if (!profileError && data) {
        profile = data;
      }
    } catch {
      // Fall back to auth user metadata if admin client is unconfigured or profile query fails
    }

    // Return safe user information only
    return {
      id: authUser.id,
      fullName: profile?.full_name || authUser.user_metadata?.full_name || "User",
      email: authUser.email,
      profilePic: profile?.profile_pic || authUser.user_metadata?.profile_pic || "",
      anonymousAlias:
        profile?.anonymous_alias ||
        authUser.user_metadata?.anonymous_alias ||
        "Anonymous",
      createdAt: profile?.created_at || authUser.created_at,
    };
  } catch (error) {
    console.error("Error in getAuthenticatedUser:", error);
    return null;
  }
}
