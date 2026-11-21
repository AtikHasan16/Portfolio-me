import React, { useState, useEffect } from "react";
import PageTransition from "../Components/PageTransition";
import MetaData from "../Components/MetaData";
import {
  getStoredProjects,
  saveProjectItem,
  deleteProjectItem,
  getStoredCommunityProjects,
  saveCommunityItem,
  deleteCommunityItem,
} from "../lib/dataService";
import { FaLock, FaKey, FaSignOutAlt, FaPlus, FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const AUTHORIZED_EMAIL = "hasan.atik.sn@gmail.com";
// Default access key for local / static curation session
const DEFAULT_ACCESS_KEY = "atik@scholarship2026";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("atik_admin_verified") === "true";
  });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSecret, setLoginSecret] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [communityWorks, setCommunityWorks] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  // Projects Form State
  const [projectForm, setProjectForm] = useState({
    id: "",
    title: "",
    category: "technical",
    role: "",
    date: "",
    techStack: "",
    image: "",
    liveLink: "",
    repoLink: "",
    description: "",
  });
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Community Form State
  const [communityForm, setCommunityForm] = useState({
    id: "",
    title: "",
    organization: "Volunteer for Bangladesh",
    role: "",
    period: "",
    beneficiaries: "",
    sdgs: "",
    summary: "",
    outcomes: "",
    images: "",
  });
  const [editingCommunityId, setEditingCommunityId] = useState(null);

  const loadAllData = async () => {
    try {
      const proj = await getStoredProjects();
      setProjects(proj);
      const comm = await getStoredCommunityProjects();
      setCommunityWorks(comm);
    } catch (e) {
      console.error(e);
    }
  };

  // Check persistent session and load data if authenticated
  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated) {
      Promise.all([getStoredProjects(), getStoredCommunityProjects()]).then(([proj, comm]) => {
        if (isMounted) {
          setProjects(proj);
          setCommunityWorks(comm);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError("");

    const trimmedEmail = loginEmail.trim().toLowerCase();
    const trimmedSecret = loginSecret.trim();

    if (trimmedEmail !== AUTHORIZED_EMAIL.toLowerCase()) {
      setAuthError("Unauthorized email address. Access denied.");
      return;
    }

    if (trimmedSecret !== DEFAULT_ACCESS_KEY) {
      setAuthError("Invalid security key credential.");
      return;
    }

    setIsAuthenticated(true);
    sessionStorage.setItem("atik_admin_verified", "true");
    loadAllData();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("atik_admin_verified");
  };

  // ---------------- PROJECT HANDLERS ----------------
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectForm.title) return;

    const formattedTech = projectForm.techStack
      ? projectForm.techStack.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const newProject = {
      id: editingProjectId || `proj-${Date.now()}`,
      title: projectForm.title,
      category: projectForm.category,
      role: projectForm.role,
      date: projectForm.date,
      techStack: formattedTech,
      image: projectForm.image,
      liveLink: projectForm.liveLink,
      repoLink: projectForm.repoLink,
      description: projectForm.description,
    };

    await saveProjectItem(newProject, Boolean(editingProjectId));
    await loadAllData();

    setProjectForm({
      id: "",
      title: "",
      category: "technical",
      role: "",
      date: "",
      techStack: "",
      image: "",
      liveLink: "",
      repoLink: "",
      description: "",
    });
    setEditingProjectId(null);
    setStatusMessage("Project successfully saved!");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleEditProject = (p) => {
    setEditingProjectId(p.id);
    setProjectForm({
      id: p.id,
      title: p.title || "",
      category: p.category || "technical",
      role: p.role || "",
      date: p.date || "",
      techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : "",
      image: p.image || "",
      liveLink: p.liveLink || "",
      repoLink: p.repoLink || "",
      description: p.description || "",
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProjectItem(id);
      await loadAllData();
      setStatusMessage("Project deleted.");
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  // ---------------- COMMUNITY HANDLERS ----------------
  const handleCommunitySubmit = async (e) => {
    e.preventDefault();
    if (!communityForm.title) return;

    const formattedSdgs = communityForm.sdgs
      ? communityForm.sdgs.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const formattedOutcomes = communityForm.outcomes
      ? communityForm.outcomes.split("\n").map((s) => s.trim()).filter(Boolean)
      : [];

    const formattedImages = communityForm.images
      ? communityForm.images.split("\n").map((s) => s.trim()).filter(Boolean)
      : [];

    const newCommunity = {
      id: editingCommunityId || `comm-${Date.now()}`,
      title: communityForm.title,
      organization: communityForm.organization,
      role: communityForm.role,
      period: communityForm.period,
      beneficiaries: communityForm.beneficiaries,
      sdgs: formattedSdgs,
      summary: communityForm.summary,
      outcomes: formattedOutcomes,
      images: formattedImages,
    };

    await saveCommunityItem(newCommunity, Boolean(editingCommunityId));
    await loadAllData();

    setCommunityForm({
      id: "",
      title: "",
      organization: "Volunteer for Bangladesh",
      role: "",
      period: "",
      beneficiaries: "",
      sdgs: "",
      summary: "",
      outcomes: "",
      images: "",
    });
    setEditingCommunityId(null);
    setStatusMessage("Community initiative saved!");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleEditCommunity = (c) => {
    setEditingCommunityId(c.id);
    setCommunityForm({
      id: c.id,
      title: c.title || "",
      organization: c.organization || "",
      role: c.role || "",
      period: c.period || "",
      beneficiaries: c.beneficiaries || "",
      sdgs: Array.isArray(c.sdgs) ? c.sdgs.join(", ") : "",
      summary: c.summary || "",
      outcomes: Array.isArray(c.outcomes) ? c.outcomes.join("\n") : "",
      images: Array.isArray(c.images) ? c.images.join("\n") : "",
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleDeleteCommunity = async (id) => {
    if (window.confirm("Are you sure you want to delete this community entry?")) {
      await deleteCommunityItem(id);
      await loadAllData();
      setStatusMessage("Community entry deleted.");
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  // ---------------- RENDER GATE IF NOT LOGGED IN ----------------
  if (!isAuthenticated) {
    return (
      <>
        <MetaData title="Curator Portal | Authentication" />
        <PageTransition>
          <div className="container mx-auto px-4 mt-32 mb-32 max-w-md">
            <div className="border border-gray-800 bg-gray-900/40 p-8 font-mono">
              <div className="flex items-center gap-3 mb-6 text-primary">
                <FaLock className="text-2xl" />
                <h1 className="text-xl font-bold text-white uppercase tracking-wider">
                  Admin Access Gate
                </h1>
              </div>

              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Authorized entry reserved exclusively for Atik Hasan to update academic projects and community engagement records.
              </p>

              {authError && (
                <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs mb-6">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-400 mb-1">Curator Email</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="hasan.atik.sn@gmail.com"
                    className="w-full bg-gray-950 border border-gray-700 px-3 py-2 text-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Secret Access Key</label>
                  <input
                    type="password"
                    required
                    value={loginSecret}
                    onChange={(e) => setLoginSecret(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-gray-950 border border-gray-700 px-3 py-2 text-white outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn btn-sm bg-primary text-black hover:bg-primary/90 border-0 rounded-none font-bold mt-4"
                >
                  Verify & Enter Portal
                </button>
              </form>
            </div>
          </div>
        </PageTransition>
      </>
    );
  }

  // ---------------- RENDER DASHBOARD IF LOGGED IN ----------------
  return (
    <>
      <MetaData title="Curator Portal | Portfolio Manager" />
      <PageTransition>
        <div className="container mx-auto px-4 mt-24 mb-24 max-w-6xl font-mono">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-4 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary text-xl font-bold">
                <FaKey />
                <h1 className="text-white text-2xl">Curator Management Portal</h1>
              </div>
              <span className="text-xs text-gray-500">
                Logged in as: {AUTHORIZED_EMAIL}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline border-red-800 text-red-400 hover:bg-red-950 rounded-none flex items-center gap-2 text-xs"
            >
              <FaSignOutAlt />
              <span>Exit Portal</span>
            </button>
          </div>

          {statusMessage && (
            <div className="p-3 bg-primary/10 border border-primary text-primary text-xs mb-6 flex items-center gap-2">
              <FaCheck />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-800 pb-3 text-xs">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2 border transition-all ${
                activeTab === "projects"
                  ? "border-primary bg-primary text-black font-bold"
                  : "border-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              Technical & Systems Projects ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab("community")}
              className={`px-4 py-2 border transition-all ${
                activeTab === "community"
                  ? "border-primary bg-primary text-black font-bold"
                  : "border-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              Community & Volunteering Initiatives ({communityWorks.length})
            </button>
          </div>

          {/* TAB 1: PROJECTS MANAGER */}
          {activeTab === "projects" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Column */}
              <div className="lg:col-span-5 border border-gray-800 bg-gray-900/40 p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FaPlus className="text-primary text-xs" />
                  <span>{editingProjectId ? "Edit Project" : "Add New Project"}</span>
                </h2>

                <form onSubmit={handleProjectSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-400 mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. Hardware and Server Lab Setup"
                      className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 mb-1">Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                      >
                        <option value="technical">Technical / Web App</option>
                        <option value="academic">Academic & Systems</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Date / Period</label>
                      <input
                        type="text"
                        value={projectForm.date}
                        onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                        placeholder="e.g. 02/2025"
                        className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Your Role</label>
                    <input
                      type="text"
                      value={projectForm.role}
                      onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                      placeholder="e.g. Technical Associate / Lead Developer"
                      className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      value={projectForm.techStack}
                      onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                      placeholder="React, Express, MongoDB, Server Assembly"
                      className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Image URL (ImgBB or Supabase)</label>
                    <input
                      type="url"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 mb-1">Live URL (optional)</label>
                      <input
                        type="url"
                        value={projectForm.liveLink}
                        onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Repo URL (optional)</label>
                      <input
                        type="url"
                        value={projectForm.repoLink}
                        onChange={(e) => setProjectForm({ ...projectForm, repoLink: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Description *</label>
                    <textarea
                      rows={3}
                      required
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="Concise overview of engineering solution and outcomes..."
                      className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-sm bg-primary text-black hover:bg-primary/90 flex-1 rounded-none font-bold"
                    >
                      {editingProjectId ? "Update Project" : "Publish Project"}
                    </button>
                    {editingProjectId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProjectId(null);
                          setProjectForm({
                            id: "",
                            title: "",
                            category: "technical",
                            role: "",
                            date: "",
                            techStack: "",
                            image: "",
                            liveLink: "",
                            repoLink: "",
                            description: "",
                          });
                        }}
                        className="btn btn-sm btn-ghost border border-gray-700 text-gray-400 rounded-none"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List Column */}
              <div className="lg:col-span-7 space-y-3">
                <h2 className="text-base font-bold text-gray-300 mb-2">Curated Project Records</h2>
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="border border-gray-800 bg-gray-950 p-4 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs uppercase bg-gray-800 border border-gray-700 text-primary px-2 py-0.5">
                          {p.category}
                        </span>
                        <h3 className="font-bold text-white text-sm">{p.title}</h3>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2">{p.description}</p>
                      {p.date && <span className="text-[10px] text-gray-500 mt-1 block">{p.date}</span>}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEditProject(p)}
                        className="btn btn-xs btn-ghost text-primary border border-gray-700"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="btn btn-xs btn-ghost text-red-400 border border-gray-700"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: COMMUNITY MANAGER */}
          {activeTab === "community" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Community Form */}
              <div className="lg:col-span-5 border border-gray-800 bg-gray-900/40 p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FaPlus className="text-primary text-xs" />
                  <span>
                    {editingCommunityId ? "Edit Community Entry" : "Add Community Initiative"}
                  </span>
                </h2>

                <form onSubmit={handleCommunitySubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-400 mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={communityForm.title}
                      onChange={(e) =>
                        setCommunityForm({ ...communityForm, title: e.target.value })
                      }
                      placeholder="e.g. Volunteer for Bangladesh — District Board"
                      className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 mb-1">Organization</label>
                      <input
                        type="text"
                        value={communityForm.organization}
                        onChange={(e) =>
                          setCommunityForm({ ...communityForm, organization: e.target.value })
                        }
                        placeholder="e.g. Volunteer for Bangladesh"
                        className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Period (Roadmap date)</label>
                      <input
                        type="text"
                        value={communityForm.period}
                        onChange={(e) =>
                          setCommunityForm({ ...communityForm, period: e.target.value })
                        }
                        placeholder="e.g. 2024 – 2026"
                        className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 mb-1">Your Role</label>
                      <input
                        type="text"
                        value={communityForm.role}
                        onChange={(e) =>
                          setCommunityForm({ ...communityForm, role: e.target.value })
                        }
                        placeholder="e.g. Project Officer / Tutor"
                        className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Beneficiaries Count</label>
                      <input
                        type="text"
                        value={communityForm.beneficiaries}
                        onChange={(e) =>
                          setCommunityForm({ ...communityForm, beneficiaries: e.target.value })
                        }
                        placeholder="e.g. 1,000+ citizens"
                        className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">
                      UN SDGs Served (comma separated)
                    </label>
                    <input
                      type="text"
                      value={communityForm.sdgs}
                      onChange={(e) =>
                        setCommunityForm({ ...communityForm, sdgs: e.target.value })
                      }
                      placeholder="SDG 3: Good Health, SDG 4: Quality Education"
                      className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Brief Summary *</label>
                    <textarea
                      rows={2}
                      required
                      value={communityForm.summary}
                      onChange={(e) =>
                        setCommunityForm({ ...communityForm, summary: e.target.value })
                      }
                      placeholder="Summary of responsibilities and scope..."
                      className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">
                      Key Outcomes (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={communityForm.outcomes}
                      onChange={(e) =>
                        setCommunityForm({ ...communityForm, outcomes: e.target.value })
                      }
                      placeholder="Coordinated field teams across 10+ projects&#10;Mobilized relief funding"
                      className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">
                      Work Photos / Image URLs (one per line)
                    </label>
                    <textarea
                      rows={2}
                      value={communityForm.images}
                      onChange={(e) =>
                        setCommunityForm({ ...communityForm, images: e.target.value })
                      }
                      placeholder="https://i.ibb.co/.../photo1.jpg&#10;https://i.ibb.co/.../photo2.jpg"
                      className="w-full bg-gray-950 border border-gray-700 p-2 text-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-sm bg-primary text-black hover:bg-primary/90 flex-1 rounded-none font-bold"
                    >
                      {editingCommunityId ? "Update Initiative" : "Save Initiative"}
                    </button>
                    {editingCommunityId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCommunityId(null);
                          setCommunityForm({
                            id: "",
                            title: "",
                            organization: "Volunteer for Bangladesh",
                            role: "",
                            period: "",
                            beneficiaries: "",
                            sdgs: "",
                            summary: "",
                            outcomes: "",
                            images: "",
                          });
                        }}
                        className="btn btn-sm btn-ghost border border-gray-700 text-gray-400 rounded-none"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Community List */}
              <div className="lg:col-span-7 space-y-3">
                <h2 className="text-base font-bold text-gray-300 mb-2">Roadmap Records</h2>
                {communityWorks.map((c) => (
                  <div
                    key={c.id}
                    className="border border-gray-800 bg-gray-950 p-4 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] bg-primary/10 border border-primary/30 text-primary px-2 py-0.5">
                          {c.period}
                        </span>
                        <h3 className="font-bold text-white text-sm">{c.title}</h3>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2">{c.summary}</p>
                      <span className="text-[10px] text-gray-500 mt-1 block">
                        Beneficiaries: {c.beneficiaries}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEditCommunity(c)}
                        className="btn btn-xs btn-ghost text-primary border border-gray-700"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteCommunity(c.id)}
                        className="btn btn-xs btn-ghost text-red-400 border border-gray-700"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </>
  );
};

export default Admin;
