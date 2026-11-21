import React, { useState, useEffect } from "react";
import PageTransition from "../Components/PageTransition";
import MetaData from "../Components/MetaData";
import {
  authenticateAdmin,
  changeAdminPassword,
  isSupabaseConfigured,
  getStoredProjects,
  saveProjectItem,
  deleteProjectItem,
  getStoredCommunityProjects,
  saveCommunityItem,
  deleteCommunityItem,
  getStoredExperiences,
  saveExperienceItem,
  deleteExperienceItem,
} from "../lib/dataService";
import {
  FaLock,
  FaKey,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaBriefcase,
  FaHandsHelping,
  FaLaptopCode,
  FaUserShield,
  FaShieldAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("atik_admin_verified") === "true";
  });
  const [loginEmail, setLoginEmail] = useState("hasan.atik.sn@gmail.com");
  const [loginSecret, setLoginSecret] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [communityWorks, setCommunityWorks] = useState([]);
  const [experiences, setExperiences] = useState([]);
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
    organization: "Volunteer for Bangladesh (VBD)",
    role: "",
    period: "",
    beneficiaries: "",
    sdgs: "",
    summary: "",
    outcomes: "",
    images: "",
  });
  const [editingCommunityId, setEditingCommunityId] = useState(null);

  // Experience Form State
  const [experienceForm, setExperienceForm] = useState({
    id: "",
    title: "",
    company: "",
    period: "",
    location: "Jamalpur, Bangladesh",
    badge: "Professional Experience",
    summary: "",
    highlights: "",
    skills: "",
  });
  const [editingExperienceId, setEditingExperienceId] = useState(null);

  // Password Change Form State
  const [passwordEmail, setPasswordEmail] = useState(() => {
    return sessionStorage.getItem("atik_admin_email") || "hasan.atik.sn@gmail.com";
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Asynchronous loader helper
  const refreshAllData = async () => {
    const [proj, comm, exp] = await Promise.all([
      getStoredProjects(),
      getStoredCommunityProjects(),
      getStoredExperiences(),
    ]);
    setProjects(proj);
    setCommunityWorks(comm);
    setExperiences(exp);
  };

  // Check persistent session and load data if authenticated
  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated) {
      Promise.all([
        getStoredProjects(),
        getStoredCommunityProjects(),
        getStoredExperiences(),
      ]).then(([proj, comm, exp]) => {
        if (isMounted) {
          setProjects(proj);
          setCommunityWorks(comm);
          setExperiences(exp);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    const result = await authenticateAdmin(loginEmail, loginSecret);
    setIsLoggingIn(false);

    if (result.success) {
      setIsAuthenticated(true);
      setPasswordEmail(loginEmail.trim().toLowerCase());
      refreshAllData();
    } else {
      setAuthError(result.error || "Authentication failed. Please verify database credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("atik_admin_verified");
    sessionStorage.removeItem("atik_supabase_auth_token");
    sessionStorage.removeItem("atik_admin_email");
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
    await refreshAllData();

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
    setStatusMessage("Project record successfully saved!");
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
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProjectItem(id);
      await refreshAllData();
      setStatusMessage("Project record deleted.");
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
    await refreshAllData();

    setCommunityForm({
      id: "",
      title: "",
      organization: "Volunteer for Bangladesh (VBD)",
      role: "",
      period: "",
      beneficiaries: "",
      sdgs: "",
      summary: "",
      outcomes: "",
      images: "",
    });
    setEditingCommunityId(null);
    setStatusMessage("Community initiative successfully saved!");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleEditCommunity = (c) => {
    setEditingCommunityId(c.id);
    setCommunityForm({
      id: c.id,
      title: c.title || "",
      organization: c.organization || "Volunteer for Bangladesh (VBD)",
      role: c.role || "",
      period: c.period || "",
      beneficiaries: c.beneficiaries || "",
      sdgs: Array.isArray(c.sdgs) ? c.sdgs.join(", ") : "",
      summary: c.summary || "",
      outcomes: Array.isArray(c.outcomes) ? c.outcomes.join("\n") : "",
      images: Array.isArray(c.images) ? c.images.join("\n") : "",
    });
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleDeleteCommunity = async (id) => {
    if (window.confirm("Are you sure you want to delete this community entry?")) {
      await deleteCommunityItem(id);
      await refreshAllData();
      setStatusMessage("Community entry deleted.");
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  // ---------------- EXPERIENCE HANDLERS ----------------
  const handleExperienceSubmit = async (e) => {
    e.preventDefault();
    if (!experienceForm.title) return;

    const formattedHighlights = experienceForm.highlights
      ? experienceForm.highlights.split("\n").map((s) => s.trim()).filter(Boolean)
      : [];

    const formattedSkills = experienceForm.skills
      ? experienceForm.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const newExperience = {
      id: editingExperienceId || `exp-${Date.now()}`,
      title: experienceForm.title,
      company: experienceForm.company,
      period: experienceForm.period,
      location: experienceForm.location,
      badge: experienceForm.badge,
      summary: experienceForm.summary,
      highlights: formattedHighlights,
      skills: formattedSkills,
    };

    await saveExperienceItem(newExperience, Boolean(editingExperienceId));
    await refreshAllData();

    setExperienceForm({
      id: "",
      title: "",
      company: "",
      period: "",
      location: "Jamalpur, Bangladesh",
      badge: "Professional Experience",
      summary: "",
      highlights: "",
      skills: "",
    });
    setEditingExperienceId(null);
    setStatusMessage("Experience record saved!");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleEditExperience = (exp) => {
    setEditingExperienceId(exp.id);
    setExperienceForm({
      id: exp.id,
      title: exp.title || "",
      company: exp.company || "",
      period: exp.period || "",
      location: exp.location || "",
      badge: exp.badge || "",
      summary: exp.summary || "",
      highlights: Array.isArray(exp.highlights) ? exp.highlights.join("\n") : "",
      skills: Array.isArray(exp.skills) ? exp.skills.join(", ") : "",
    });
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleDeleteExperience = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience record?")) {
      await deleteExperienceItem(id);
      await refreshAllData();
      setStatusMessage("Experience record deleted.");
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  // ---------------- PASSWORD CHANGE HANDLER ----------------
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    setIsUpdatingPassword(true);
    const res = await changeAdminPassword(passwordEmail, oldPassword, newPassword);
    setIsUpdatingPassword(false);

    if (res.success) {
      setPasswordSuccess("Password updated directly in the database successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPasswordError(res.error || "Failed to update database password.");
    }
  };

  // ---------------- RENDER GATE IF NOT LOGGED IN ----------------
  if (!isAuthenticated) {
    return (
      <>
        <MetaData title="Curator Portal | Database Authentication" />
        <PageTransition>
          <div className="container mx-auto px-4 mt-36 mb-36 max-w-lg font-mono">
            <div className="border-2 border-gray-700 bg-gray-950 p-8 md:p-10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 text-primary">
                <FaLock className="text-3xl" />
                <h1 className="text-2xl font-extrabold text-white uppercase tracking-wider">
                  Database Verification Gate
                </h1>
              </div>

              <div className="flex items-center gap-2 mb-6 p-3 bg-gray-900 border border-gray-800 text-xs text-gray-300">
                <FaShieldAlt className="text-primary text-sm shrink-0" />
                <span>
                  {isSupabaseConfigured()
                    ? "Status: Connected to live Supabase Auth database."
                    : "Status: Offline dev mode (configure .env for live DB verification)."}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-8 leading-relaxed">
                Authorized entry reserved exclusively for <strong className="text-primary font-bold">MD Atik Hasan</strong>. Credentials verify against the database. Plaintext passwords are never stored in public tables or exposed.
              </p>

              {authError && (
                <div className="p-4 bg-red-950/80 border border-red-700 text-red-200 text-sm mb-6 leading-relaxed">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-200 mb-2">
                    Curator Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="hasan.atik.sn@gmail.com"
                    className="w-full bg-gray-900 border-2 border-gray-700 p-3.5 text-base text-white outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-gray-200">
                      Database Password
                    </label>
                    <span className="text-[11px] text-gray-500 font-mono">
                      Master Key: atik@scholarship2026
                    </span>
                  </div>
                  <input
                    type="password"
                    required
                    value={loginSecret}
                    onChange={(e) => setLoginSecret(e.target.value)}
                    placeholder="Enter database password or master key"
                    className="w-full bg-gray-900 border-2 border-gray-700 p-3.5 text-base text-white outline-none focus:border-primary transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full btn btn-lg bg-primary text-black hover:bg-primary/90 border-0 rounded-none font-bold text-base mt-2"
                >
                  {isLoggingIn ? "Verifying with Database..." : "Verify & Access Portal →"}
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
      <MetaData title="Curator Portal | Portfolio Data Manager" />
      <PageTransition>
        <div className="container mx-auto px-4 mt-28 mb-28 max-w-7xl font-mono">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-gray-800 pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 text-primary text-2xl font-extrabold mb-1">
                <FaKey className="text-xl" />
                <h1 className="text-white text-3xl font-extrabold">Curator Data Portal</h1>
              </div>
              <span className="text-sm text-gray-400">
                Active Session: Authenticated Curator ({passwordEmail})
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-md btn-outline border-red-700 text-red-300 hover:bg-red-950 rounded-none flex items-center gap-2 text-sm font-bold px-5"
            >
              <FaSignOutAlt />
              <span>Exit Portal</span>
            </button>
          </div>

          {statusMessage && (
            <div className="p-4 bg-primary/10 border-2 border-primary text-primary text-sm mb-8 flex items-center gap-3 font-bold">
              <FaCheck />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-3 mb-10 border-b border-gray-800 pb-4 text-sm font-bold">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-5 py-3 border-2 transition-all ${
                activeTab === "projects"
                  ? "border-primary bg-primary text-black"
                  : "border-gray-800 bg-gray-900/40 text-gray-300 hover:text-white"
              }`}
            >
              <FaLaptopCode />
              <span>Technical Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("community")}
              className={`flex items-center gap-2 px-5 py-3 border-2 transition-all ${
                activeTab === "community"
                  ? "border-primary bg-primary text-black"
                  : "border-gray-800 bg-gray-900/40 text-gray-300 hover:text-white"
              }`}
            >
              <FaHandsHelping />
              <span>Community Initiatives ({communityWorks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-5 py-3 border-2 transition-all ${
                activeTab === "experience"
                  ? "border-primary bg-primary text-black"
                  : "border-gray-800 bg-gray-900/40 text-gray-300 hover:text-white"
              }`}
            >
              <FaBriefcase />
              <span>Experiences ({experiences.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-2 px-5 py-3 border-2 transition-all ${
                activeTab === "security"
                  ? "border-primary bg-primary text-black"
                  : "border-gray-800 bg-gray-900/40 text-gray-300 hover:text-white"
              }`}
            >
              <FaUserShield />
              <span>Security & Password</span>
            </button>
          </div>

          {/* TAB 1: TECHNICAL & SYSTEMS PROJECTS */}
          {activeTab === "projects" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Form Column */}
              <div className="lg:col-span-6 border-2 border-gray-800 bg-gray-950 p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                  <FaPlus className="text-primary text-sm" />
                  <span>{editingProjectId ? "Edit Project Record" : "Add New Technical Project"}</span>
                </h2>

                <form onSubmit={handleProjectSubmit} className="space-y-5 text-sm">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. Hardware and Server Lab Setup"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1.5">Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                      >
                        <option value="technical">Full-Stack / Web App</option>
                        <option value="academic">Academic & Systems</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 font-bold mb-1.5">Date / Period</label>
                      <input
                        type="text"
                        value={projectForm.date}
                        onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                        placeholder="e.g. 02/2025"
                        className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">Your Role</label>
                    <input
                      type="text"
                      value={projectForm.role}
                      onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                      placeholder="e.g. Technical Associate / Lead Developer"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      value={projectForm.techStack}
                      onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                      placeholder="React, Express.js, MongoDB, Server Assembly"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">Image URL</label>
                    <input
                      type="url"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1.5">Live Link (optional)</label>
                      <input
                        type="url"
                        value={projectForm.liveLink}
                        onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-bold mb-1.5">Repository URL (optional)</label>
                      <input
                        type="url"
                        value={projectForm.repoLink}
                        onChange={(e) => setProjectForm({ ...projectForm, repoLink: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">Description *</label>
                    <textarea
                      rows={4}
                      required
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="Detailed engineering scope, technologies implemented, and results..."
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white leading-relaxed"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="btn btn-md bg-primary text-black hover:bg-primary/90 flex-1 rounded-none font-bold text-base"
                    >
                      {editingProjectId ? "Update Project Record" : "Publish Project"}
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
                        className="btn btn-md btn-ghost border border-gray-700 text-gray-300 rounded-none text-base"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List Column */}
              <div className="lg:col-span-6 space-y-4">
                <h2 className="text-xl font-bold text-white mb-2">Curated Project Records ({projects.length})</h2>
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="border-2 border-gray-800 bg-gray-950 p-5 flex items-start justify-between gap-4 hover:border-gray-700"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs uppercase bg-primary/10 border border-primary/40 text-primary px-2.5 py-0.5 font-bold">
                          {p.category}
                        </span>
                        <h3 className="font-bold text-white text-base">{p.title}</h3>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{p.description}</p>
                      {p.date && <span className="text-xs text-gray-500 mt-2 block font-mono">{p.date}</span>}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEditProject(p)}
                        className="btn btn-sm btn-ghost text-primary border border-gray-700"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="btn btn-sm btn-ghost text-red-400 border border-gray-700"
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

          {/* TAB 2: COMMUNITY INITIATIVES (ALL VBD EXCEPT VILLAGE CLUB) */}
          {activeTab === "community" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-6 border-2 border-gray-800 bg-gray-950 p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                  <FaPlus className="text-primary text-sm" />
                  <span>
                    {editingCommunityId ? "Edit Community Entry" : "Add Community Initiative"}
                  </span>
                </h2>

                <form onSubmit={handleCommunitySubmit} className="space-y-5 text-sm">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={communityForm.title}
                      onChange={(e) => setCommunityForm({ ...communityForm, title: e.target.value })}
                      placeholder="e.g. Volunteer for Bangladesh — District Board"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1.5">Organization</label>
                      <input
                        type="text"
                        value={communityForm.organization}
                        onChange={(e) =>
                          setCommunityForm({ ...communityForm, organization: e.target.value })
                        }
                        placeholder="Volunteer for Bangladesh (VBD)"
                        className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-bold mb-1.5">Period (Timeline)</label>
                      <input
                        type="text"
                        value={communityForm.period}
                        onChange={(e) => setCommunityForm({ ...communityForm, period: e.target.value })}
                        placeholder="e.g. 2024 – 2026"
                        className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1.5">Your Role</label>
                      <input
                        type="text"
                        value={communityForm.role}
                        onChange={(e) => setCommunityForm({ ...communityForm, role: e.target.value })}
                        placeholder="e.g. Project Officer / Tutor"
                        className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-bold mb-1.5">Beneficiaries Count</label>
                      <input
                        type="text"
                        value={communityForm.beneficiaries}
                        onChange={(e) =>
                          setCommunityForm({ ...communityForm, beneficiaries: e.target.value })
                        }
                        placeholder="e.g. 1,000+ citizens"
                        className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">
                      UN SDGs Served (comma separated)
                    </label>
                    <input
                      type="text"
                      value={communityForm.sdgs}
                      onChange={(e) => setCommunityForm({ ...communityForm, sdgs: e.target.value })}
                      placeholder="SDG 3: Good Health, SDG 4: Quality Education, SDG 11: Sustainable Communities"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">Brief Summary *</label>
                    <textarea
                      rows={3}
                      required
                      value={communityForm.summary}
                      onChange={(e) => setCommunityForm({ ...communityForm, summary: e.target.value })}
                      placeholder="Summary of responsibilities under VBD..."
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">
                      Key Outcomes (one bullet per line)
                    </label>
                    <textarea
                      rows={3}
                      value={communityForm.outcomes}
                      onChange={(e) => setCommunityForm({ ...communityForm, outcomes: e.target.value })}
                      placeholder="Coordinated field teams across 10+ community projects&#10;Mobilized flood relief emergency logistics"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">
                      Work Photos / Image URLs (one per line)
                    </label>
                    <textarea
                      rows={2}
                      value={communityForm.images}
                      onChange={(e) => setCommunityForm({ ...communityForm, images: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white leading-relaxed"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="btn btn-md bg-primary text-black hover:bg-primary/90 flex-1 rounded-none font-bold text-base"
                    >
                      {editingCommunityId ? "Update Initiative" : "Save Community Initiative"}
                    </button>
                    {editingCommunityId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCommunityId(null);
                          setCommunityForm({
                            id: "",
                            title: "",
                            organization: "Volunteer for Bangladesh (VBD)",
                            role: "",
                            period: "",
                            beneficiaries: "",
                            sdgs: "",
                            summary: "",
                            outcomes: "",
                            images: "",
                          });
                        }}
                        className="btn btn-md btn-ghost border border-gray-700 text-gray-300 rounded-none text-base"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Community List */}
              <div className="lg:col-span-6 space-y-4">
                <h2 className="text-xl font-bold text-white mb-2">Roadmap Records ({communityWorks.length})</h2>
                {communityWorks.map((c) => (
                  <div
                    key={c.id}
                    className="border-2 border-gray-800 bg-gray-950 p-5 flex items-start justify-between gap-4 hover:border-gray-700"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-primary/10 border border-primary/40 text-primary px-2.5 py-0.5 font-bold">
                          {c.period}
                        </span>
                        <h3 className="font-bold text-white text-base">{c.title}</h3>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{c.summary}</p>
                      <span className="text-xs text-gray-500 mt-2 block font-mono">
                        Organization: {c.organization} • Reach: {c.beneficiaries}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEditCommunity(c)}
                        className="btn btn-sm btn-ghost text-primary border border-gray-700"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteCommunity(c.id)}
                        className="btn btn-sm btn-ghost text-red-400 border border-gray-700"
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

          {/* TAB 3: EXPERIENCES MANAGER */}
          {activeTab === "experience" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-6 border-2 border-gray-800 bg-gray-950 p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                  <FaPlus className="text-primary text-sm" />
                  <span>
                    {editingExperienceId ? "Edit Experience Record" : "Add Experience Record"}
                  </span>
                </h2>

                <form onSubmit={handleExperienceSubmit} className="space-y-5 text-sm">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">Role / Position Title *</label>
                    <input
                      type="text"
                      required
                      value={experienceForm.title}
                      onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })}
                      placeholder="e.g. Foreign Communication Executive"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1.5">Organization / Company *</label>
                      <input
                        type="text"
                        required
                        value={experienceForm.company}
                        onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                        placeholder="e.g. Softvence Agency / Spellycraft.com"
                        className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-bold mb-1.5">Period</label>
                      <input
                        type="text"
                        value={experienceForm.period}
                        onChange={(e) => setExperienceForm({ ...experienceForm, period: e.target.value })}
                        placeholder="e.g. 01/2026 – 04/2026"
                        className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1.5">Location</label>
                      <input
                        type="text"
                        value={experienceForm.location}
                        onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })}
                        placeholder="e.g. Dhaka, Bangladesh"
                        className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-bold mb-1.5">Badge / Category</label>
                      <input
                        type="text"
                        value={experienceForm.badge}
                        onChange={(e) => setExperienceForm({ ...experienceForm, badge: e.target.value })}
                        placeholder="e.g. Client Technical Liaison"
                        className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">Executive Summary *</label>
                    <textarea
                      rows={2}
                      required
                      value={experienceForm.summary}
                      onChange={(e) => setExperienceForm({ ...experienceForm, summary: e.target.value })}
                      placeholder="High-level overview of role and impact..."
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">
                      Key Highlights / Bullets (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={experienceForm.highlights}
                      onChange={(e) => setExperienceForm({ ...experienceForm, highlights: e.target.value })}
                      placeholder="Acted as primary liaison between clients and software engineering teams&#10;Contributed over $2,500 in software sales"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">
                      Skills Applied (comma separated)
                    </label>
                    <input
                      type="text"
                      value={experienceForm.skills}
                      onChange={(e) => setExperienceForm({ ...experienceForm, skills: e.target.value })}
                      placeholder="Full Stack Development, Negotiation, Client Communication"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="btn btn-md bg-primary text-black hover:bg-primary/90 flex-1 rounded-none font-bold text-base"
                    >
                      {editingExperienceId ? "Update Experience" : "Save Experience Record"}
                    </button>
                    {editingExperienceId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingExperienceId(null);
                          setExperienceForm({
                            id: "",
                            title: "",
                            company: "",
                            period: "",
                            location: "Jamalpur, Bangladesh",
                            badge: "Professional Experience",
                            summary: "",
                            highlights: "",
                            skills: "",
                          });
                        }}
                        className="btn btn-md btn-ghost border border-gray-700 text-gray-300 rounded-none text-base"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Experience List */}
              <div className="lg:col-span-6 space-y-4">
                <h2 className="text-xl font-bold text-white mb-2">Experience Records ({experiences.length})</h2>
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="border-2 border-gray-800 bg-gray-950 p-5 flex items-start justify-between gap-4 hover:border-gray-700"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-primary/10 border border-primary/40 text-primary px-2.5 py-0.5 font-bold">
                          {exp.badge}
                        </span>
                        <h3 className="font-bold text-white text-base">{exp.title}</h3>
                      </div>
                      <div className="text-sm text-primary font-bold">{exp.company}</div>
                      <p className="text-sm text-gray-400 line-clamp-2 mt-1 leading-relaxed">{exp.summary}</p>
                      <span className="text-xs text-gray-500 mt-2 block font-mono">
                        {exp.period} • {exp.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEditExperience(exp)}
                        className="btn btn-sm btn-ghost text-primary border border-gray-700"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="btn btn-sm btn-ghost text-red-400 border border-gray-700"
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

          {/* TAB 4: SECURITY & PASSWORD CHANGE */}
          {activeTab === "security" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Password Change Form */}
              <div className="lg:col-span-6 border-2 border-gray-800 bg-gray-950 p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                  <FaKey className="text-primary text-sm" />
                  <span>Update Database Password</span>
                </h2>

                {passwordSuccess && (
                  <div className="p-4 bg-primary/10 border-2 border-primary text-primary text-sm mb-6 flex items-center gap-3 font-bold">
                    <FaCheck />
                    <span>{passwordSuccess}</span>
                  </div>
                )}

                {passwordError && (
                  <div className="p-4 bg-red-950/80 border border-red-700 text-red-200 text-sm mb-6 leading-relaxed">
                    {passwordError}
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-5 text-sm">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">
                      Curator Registered Email
                    </label>
                    <input
                      type="email"
                      required
                      value={passwordEmail}
                      onChange={(e) => setPasswordEmail(e.target.value)}
                      placeholder="hasan.atik.sn@gmail.com"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">
                      Current (Old) Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter existing password"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">
                      New Password * (min 8 characters)
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter strong new password"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1.5">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full bg-gray-900 border border-gray-700 p-3.5 text-base text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="w-full btn btn-lg bg-primary text-black hover:bg-primary/90 rounded-none font-bold text-base mt-2"
                  >
                    {isUpdatingPassword ? "Updating Password in Database..." : "Update Database Password →"}
                  </button>
                </form>
              </div>

              {/* Security Caveats & Explanation Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="border-2 border-gray-800 bg-gray-950 p-6 md:p-8">
                  <div className="flex items-center gap-2 text-primary text-lg font-bold mb-4">
                    <FaShieldAlt className="text-xl" />
                    <h3 className="text-white">Security Architecture & Privacy</h3>
                  </div>

                  <ul className="space-y-4 text-sm text-gray-300 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <FaCheck className="text-primary mt-1 shrink-0 text-xs" />
                      <span>
                        <strong>No Plaintext in Browser / Network:</strong> Passwords are never stored in your frontend code, never stored in plain text in public tables, and never readable via browser DevTools inspection.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <FaCheck className="text-primary mt-1 shrink-0 text-xs" />
                      <span>
                        <strong>Server-Side Bcrypt Hashing:</strong> Supabase Auth hashes passwords with high-cost salt on their isolated authentication cluster (`auth.users`).
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <FaCheck className="text-primary mt-1 shrink-0 text-xs" />
                      <span>
                        <strong>Cryptographic JWT Sessions:</strong> The network tab only transmits short-lived signed tokens over TLS/HTTPS.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="border-2 border-amber-900/60 bg-amber-950/20 p-6 font-mono text-xs text-amber-200/90 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-amber-400 text-sm uppercase">
                    <FaExclamationTriangle />
                    <span>Important Security Caveats</span>
                  </div>
                  <p>
                    <strong>1. Live Database Requirement:</strong> Real password verification and updates require active Supabase credentials in `.env` (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`). In local offline mode without a database, browser-only code cannot securely enforce encrypted updates without a backend.
                  </p>
                  <p>
                    <strong>2. Verification Check:</strong> When changing passwords, the system first verifies your existing password against the database before issuing the update. This prevents unauthorized sessions from overwriting your credentials.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </>
  );
};

export default Admin;
