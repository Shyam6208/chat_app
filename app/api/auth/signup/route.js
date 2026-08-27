import { NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase/server";
import { generateAnonymousAlias } from "@/lib/anonymousAlias";

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, password } = body;

    // Validate required fields
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { message: "Full name must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Generate anonymous alias and profile picture for chat privacy
    const anonymousAlias = generateAnonymousAlias();
    const profilePic = `https://api.dicebear.com/9.x/avataaars/svg?seed=${anonymousAlias}`;

    const supabase = await getSupabaseServerClient();

    // 1. Create user in Supabase Auth (credentials & hashing managed internally by Supabase)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          anonymous_alias: anonymousAlias,
          profile_pic: profilePic,
        },
      },
    });

    if (authError) {
      return NextResponse.json(
        { message: authError.message || "Failed to create account" },
        { status: 400 }
      );
    }

    if (!authData?.user) {
      return NextResponse.json(
        { message: "Failed to create account" },
        { status: 500 }
      );
    }

    // 2. Create profile in public.profiles (NO password stored here)
    try {
      const supabaseAdmin = getSupabaseAdminClient();
      await supabaseAdmin.from("profiles").upsert(
        {
          id: authData.user.id,
          full_name: fullName.trim(),
          profile_pic: profilePic,
          anonymous_alias: anonymousAlias,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
    } catch (profileErr) {
      console.warn("Notice: public.profiles table upsert warning:", profileErr.message);
    }

    // Return safe user information only — never passwords or secrets
    return NextResponse.json(
      {
        user: {
          id: authData.user.id,
          fullName: fullName.trim(),
          email: authData.user.email,
          profilePic,
          anonymousAlias,
          createdAt: authData.user.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
