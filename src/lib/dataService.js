import { initialProjects } from "../data/projectsData";
import { initialCommunityProjects } from "../data/communityData";
import { initialExperiences } from "../data/experienceData";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const LOCAL_STORAGE_PROJECTS_KEY = "atik_curated_projects";
const LOCAL_STORAGE_COMMUNITY_KEY = "atik_curated_community";
const LOCAL_STORAGE_EXPERIENCE_KEY = "atik_curated_experience";
const SESSION_TOKEN_KEY = "atik_supabase_auth_token";

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
 * Authenticate against Supabase Auth (DB login) or local env credentials
 */
export const authenticateAdmin = async (email, password) => {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  // 1. Try Supabase Auth if credentials configured
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
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

      if (res.ok) {
        const data = await res.json();
        if (data.access_token) {
          sessionStorage.setItem(SESSION_TOKEN_KEY, data.access_token);
          sessionStorage.setItem("atik_admin_verified", "true");
          return { success: true, mode: "supabase" };
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        console.warn("Supabase auth response:", errData);
      }
    } catch (err) {
      console.warn("Supabase auth request failed, trying fallback comparison:", err);
    }
  }

  // 2. Compare against configured environment variables
  const envEmail = (import.meta.env.VITE_ADMIN_EMAIL || "hasan.atik.sn@gmail.com").toLowerCase();
  const envPass = import.meta.env.VITE_ADMIN_PASSWORD || "atik@scholarship2026";

  if (trimmedEmail === envEmail && trimmedPassword === envPass) {
    sessionStorage.setItem("atik_admin_verified", "true");
    return { success: true, mode: "local-env" };
  }

  return { success: false, error: "Invalid curator credentials. Access denied." };
};

// ---------------- PROJECTS ----------------
export const getStoredProjects = async () => {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
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
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
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
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
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
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
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
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
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
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
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
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
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
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
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
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
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
