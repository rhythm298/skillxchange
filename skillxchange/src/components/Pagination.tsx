import React from "react";

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ current, total, onChange }) => {
  if (total <= 1) return null;
  return (
    <div className="flex justify-center gap-1 mt-4">
      {Array.from({ length: total }).map((_, idx) => {
        const page = idx + 1;
        return (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={`px-3 py-1 border rounded ${
              page === current ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
