import { initialProjects } from "../data/projectsData";
import { initialCommunityProjects } from "../data/communityData";
import { initialExperiences } from "../data/experienceData";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const LOCAL_STORAGE_PROJECTS_KEY = "atik_curated_projects";
const LOCAL_STORAGE_COMMUNITY_KEY = "atik_curated_community";
const LOCAL_STORAGE_EXPERIENCE_KEY = "atik_curated_experience";
const SESSION_TOKEN_KEY = "atik_supabase_auth_token";
const SESSION_USER_EMAIL_KEY = "atik_admin_email";
const LOCAL_PASSWORD_OVERRIDE_KEY = "atik_curator_custom_password";

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

// Helper for authorization headers
const getAuthHeaders = () => {
  const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
  const bearer = token ? `Bearer ${token}` : `Bearer ${SUPABASE_ANON_KEY}`;
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: bearer,
  };
};

/**
 * Robust Curator Authentication:
 * 1. Checks master credentials from .env (hasan.atik.sn@gmail.com + atik@scholarship2026 or updated password)
 * 2. Checks/syncs with Supabase Auth in the background so you have a real JWT session
 * 3. Also allows logging in with any password updated directly in Supabase
 */
export const authenticateAdmin = async (email, password) => {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  const envEmail = (import.meta.env.VITE_ADMIN_EMAIL || "hasan.atik.sn@gmail.com").toLowerCase();
  const envPass = import.meta.env.VITE_ADMIN_PASSWORD || "atik@scholarship2026";
  const customPass = localStorage.getItem(LOCAL_PASSWORD_OVERRIDE_KEY);

  const isMasterCredentialMatch =
    trimmedEmail === envEmail && (trimmedPassword === envPass || (customPass && trimmedPassword === customPass));

  // If user entered valid master/env credentials, authenticate immediately
  if (isMasterCredentialMatch) {
    sessionStorage.setItem("atik_admin_verified", "true");
    sessionStorage.setItem(SESSION_USER_EMAIL_KEY, trimmedEmail);

    // If Supabase is connected, attempt to sync or obtain a live database JWT
    if (isSupabaseConfigured()) {
      try {
        const loginRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
        });

        const loginData = await loginRes.json().catch(() => ({}));

        if (loginRes.ok && loginData.access_token) {
          sessionStorage.setItem(SESSION_TOKEN_KEY, loginData.access_token);
        } else {
          // If the account does not exist yet on Supabase Auth, auto-provision it!
          const signupRes = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
            method: "POST",
            headers: {
              apikey: SUPABASE_ANON_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
          });

          const signupData = await signupRes.json().catch(() => ({}));
          if (signupRes.ok && signupData.access_token) {
            sessionStorage.setItem(SESSION_TOKEN_KEY, signupData.access_token);
          }
        }
      } catch (e) {
        console.warn("Background Supabase Auth sync note:", e);
      }
    }

    return { success: true, mode: "curator-verified" };
  }

  // If credentials did NOT match the master .env key, try verifying directly with Supabase Auth
  if (isSupabaseConfigured()) {
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.access_token) {
        sessionStorage.setItem(SESSION_TOKEN_KEY, data.access_token);
        sessionStorage.setItem(SESSION_USER_EMAIL_KEY, trimmedEmail);
        sessionStorage.setItem("atik_admin_verified", "true");
        return { success: true, mode: "database", user: data.user };
      } else if (data.error_description === "Email not confirmed") {
        return {
          success: false,
          error:
            "Your email is not yet confirmed in Supabase. Please check your inbox for the confirmation link, or disable 'Confirm email' under Authentication -> Providers -> Email in your Supabase Dashboard.",
        };
      } else {
        return {
          success: false,
          error: data.error_description || data.msg || "Invalid credentials. Use your database password or the key from .env.",
        };
      }
    } catch (err) {
      return {
        success: false,
        error: `Database connection error: ${err.message}.`,
      };
    }
  }

  return {
    success: false,
    error: "Invalid curator credentials. Check your email and password, or use the master credentials in .env.",
  };
};

/**
 * Change Password directly in Database (Supabase Auth) and local override
 */
export const changeAdminPassword = async (email, oldPassword, newPassword) => {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedOldPass = oldPassword.trim();
  const trimmedNewPass = newPassword.trim();

  if (trimmedNewPass.length < 8) {
    return { success: false, error: "New password must be at least 8 characters long." };
  }

  // Verify old password against master env/custom or Supabase
  const envEmail = (import.meta.env.VITE_ADMIN_EMAIL || "hasan.atik.sn@gmail.com").toLowerCase();
  const envPass = import.meta.env.VITE_ADMIN_PASSWORD || "atik@scholarship2026";
  const customPass = localStorage.getItem(LOCAL_PASSWORD_OVERRIDE_KEY);

  const isOldPasswordMatch =
    trimmedEmail === envEmail && (trimmedOldPass === envPass || (customPass && trimmedOldPass === customPass));

  // If Supabase is configured, update in Supabase Auth
  if (isSupabaseConfigured()) {
    try {
      // 1. Try to authenticate old password with Supabase
      const verifyRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedOldPass }),
      });

      const verifyData = await verifyRes.json().catch(() => ({}));

      // If Supabase has this user and old pass is valid, update on Supabase
      if (verifyRes.ok && verifyData.access_token) {
        const updateRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
          method: "PUT",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${verifyData.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: trimmedNewPass }),
        });

        if (updateRes.ok) {
          sessionStorage.setItem(SESSION_TOKEN_KEY, verifyData.access_token);
          localStorage.setItem(LOCAL_PASSWORD_OVERRIDE_KEY, trimmedNewPass);
          return { success: true, mode: "database" };
        }
      } else if (!isOldPasswordMatch) {
        return {
          success: false,
          error: "Current (old) password is incorrect.",
        };
      }
    } catch (err) {
      console.warn("Supabase password update notice:", err);
    }
  }

  if (isOldPasswordMatch) {
    localStorage.setItem(LOCAL_PASSWORD_OVERRIDE_KEY, trimmedNewPass);
    return { success: true, mode: "curator-override" };
  }

  return {
    success: false,
    error: "Current (old) password is incorrect.",
  };
};

// ---------------- PROJECTS ----------------
export const getStoredProjects = async () => {
  if (isSupabaseConfigured()) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*&order=created_at.desc`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn("Supabase fetch failed; falling back to local dataset:", err);
    }
  }

  try {
    const local = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return initialProjects;
};

export const saveProjectItem = async (project, isEdit = false) => {
  if (isSupabaseConfigured()) {
    try {
      const url = isEdit
        ? `${SUPABASE_URL}/rest/v1/projects?id=eq.${project.id}`
        : `${SUPABASE_URL}/rest/v1/projects`;
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(project),
      });
      if (res.ok) {
        return { success: true };
      }
    } catch (err) {
      console.warn("Supabase write failed:", err);
    }
  }

  try {
    const current = await getStoredProjects();
    let updated;
    if (isEdit) {
      updated = current.map((p) => (p.id === project.id ? project : p));
    } else {
      updated = [project, ...current];
    }
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(updated));
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const deleteProjectItem = async (projectId) => {
  if (isSupabaseConfigured()) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) return { success: true };
    } catch (err) {
      console.warn("Supabase delete failed:", err);
    }
  }

  const current = await getStoredProjects();
  const filtered = current.filter((p) => p.id !== projectId);
  localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(filtered));
  return { success: true };
};

// ---------------- COMMUNITY INITIATIVES ----------------
export const getStoredCommunityProjects = async () => {
  if (isSupabaseConfigured()) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/community_projects?select=*&order=created_at.desc`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn("Supabase community fetch failed; using fallback:", err);
    }
  }

  try {
    const local = localStorage.getItem(LOCAL_STORAGE_COMMUNITY_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return initialCommunityProjects;
};

export const saveCommunityItem = async (item, isEdit = false) => {
  if (isSupabaseConfigured()) {
    try {
      const url = isEdit
        ? `${SUPABASE_URL}/rest/v1/community_projects?id=eq.${item.id}`
        : `${SUPABASE_URL}/rest/v1/community_projects`;
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(item),
      });
      if (res.ok) return { success: true };
    } catch (err) {
      console.warn("Supabase community write failed:", err);
    }
  }

  const current = await getStoredCommunityProjects();
  let updated;
  if (isEdit) {
    updated = current.map((c) => (c.id === item.id ? item : c));
  } else {
    updated = [item, ...current];
  }
  localStorage.setItem(LOCAL_STORAGE_COMMUNITY_KEY, JSON.stringify(updated));
  return { success: true };
};

export const deleteCommunityItem = async (itemId) => {
  if (isSupabaseConfigured()) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/community_projects?id=eq.${itemId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) return { success: true };
    } catch (err) {
      console.warn("Supabase delete failed:", err);
    }
  }

  const current = await getStoredCommunityProjects();
  const filtered = current.filter((c) => c.id !== itemId);
  localStorage.setItem(LOCAL_STORAGE_COMMUNITY_KEY, JSON.stringify(filtered));
  return { success: true };
};

// ---------------- EXPERIENCES ----------------
export const getStoredExperiences = async () => {
  if (isSupabaseConfigured()) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/experiences?select=*&order=created_at.desc`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn("Supabase experience fetch failed; using fallback:", err);
    }
  }

  try {
    const local = localStorage.getItem(LOCAL_STORAGE_EXPERIENCE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return initialExperiences;
};

export const saveExperienceItem = async (item, isEdit = false) => {
  if (isSupabaseConfigured()) {
    try {
      const url = isEdit
        ? `${SUPABASE_URL}/rest/v1/experiences?id=eq.${item.id}`
        : `${SUPABASE_URL}/rest/v1/experiences`;
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(item),
      });
      if (res.ok) return { success: true };
    } catch (err) {
      console.warn("Supabase experience write failed:", err);
    }
  }

  const current = await getStoredExperiences();
  let updated;
  if (isEdit) {
    updated = current.map((e) => (e.id === item.id ? item : e));
  } else {
    updated = [item, ...current];
  }
  localStorage.setItem(LOCAL_STORAGE_EXPERIENCE_KEY, JSON.stringify(updated));
  return { success: true };
};

export const deleteExperienceItem = async (itemId) => {
  if (isSupabaseConfigured()) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/experiences?id=eq.${itemId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) return { success: true };
    } catch (err) {
      console.warn("Supabase delete failed:", err);
    }
  }

  const current = await getStoredExperiences();
  const filtered = current.filter((e) => e.id !== itemId);
  localStorage.setItem(LOCAL_STORAGE_EXPERIENCE_KEY, JSON.stringify(filtered));
  return { success: true };
};
