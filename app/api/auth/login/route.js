import { NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const supabase = await getSupabaseServerClient();

    // 1. Authenticate using Supabase Auth (verification handled securely by Supabase)
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

    if (authError || !authData?.user) {
      // Generic authentication error to prevent email enumeration
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 2. Fetch profile from public.profiles
    let profile = null;
    try {
      const supabaseAdmin = getSupabaseAdminClient();
      const { data } = await supabaseAdmin
        .from("profiles")
        .select("id, full_name, profile_pic, anonymous_alias, created_at")
        .eq("id", authData.user.id)
        .single();
      profile = data;
    } catch {
      // Fall back to user metadata if admin client is unconfigured
    }

    // Return safe user information only — never passwords or secrets
    return NextResponse.json({
      user: {
        id: authData.user.id,
        fullName:
          profile?.full_name ||
          authData.user.user_metadata?.full_name ||
          "User",
        email: authData.user.email,
        profilePic:
          profile?.profile_pic ||
          authData.user.user_metadata?.profile_pic ||
          "",
        anonymousAlias:
          profile?.anonymous_alias ||
          authData.user.user_metadata?.anonymous_alias ||
          "Anonymous",
        createdAt: profile?.created_at || authData.user.created_at,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
