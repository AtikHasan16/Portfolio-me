import { initialProjects } from "../data/projectsData";
import { initialCommunityProjects } from "../data/communityData";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const LOCAL_STORAGE_PROJECTS_KEY = "atik_curated_projects";
const LOCAL_STORAGE_COMMUNITY_KEY = "atik_curated_community";

export const getStoredProjects = async () => {
  // If Supabase is configured, attempt fetch
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*&order=date.desc`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
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

  // Check localStorage for any admin-curated additions
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

  // Default fallback
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
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(project),
      });
      if (res.ok) {
        return { success: true };
      }
    } catch (err) {
      console.warn("Supabase write failed; saving to local fallback:", err);
    }
  }

  // Local fallback save
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
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      if (res.ok) return { success: true };
    } catch (err) {
      console.warn("Supabase delete failed, removing locally:", err);
    }
  }

  const current = await getStoredProjects();
  const filtered = current.filter((p) => p.id !== projectId);
  localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(filtered));
  return { success: true };
};

export const getStoredCommunityProjects = async () => {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/community_projects?select=*`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
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
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(item),
      });
      if (res.ok) return { success: true };
    } catch (err) {
      console.warn("Supabase write failed:", err);
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
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
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
