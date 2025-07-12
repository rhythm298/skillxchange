import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";
import Pagination from "../components/Pagination";
import { getPublicProfiles } from "../lib/api";
import { UserProfile } from "../types";
import { useAuth } from "../contexts/AuthContext";

const ITEMS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("");
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const data = await getPublicProfiles();
      setProfiles(data);
    })();
  }, []);

  const filtered = profiles.filter((p) => {
    const matchesSearch = p.skillsOffered.some((s) =>
      s.toLowerCase().includes(search.toLowerCase()),
    );
    const matchesAvailability = availability
      ? p.availability === availability
      : true;
    return matchesSearch && matchesAvailability;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentPageItems = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setPage(1);
  }, [search, availability]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-5xl px-4 py-6 mx-auto space-y-6">
        <SearchBar
          search={search}
          setSearch={setSearch}
          availability={availability}
          setAvailability={setAvailability}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentPageItems.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              canRequest={!!user}
            />
          ))}
        </div>
        <Pagination current={page} total={totalPages} onChange={setPage} />
      </main>
    </div>
  );
};

export default HomePage;
