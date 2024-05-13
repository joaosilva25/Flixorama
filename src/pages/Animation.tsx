import ShowMoviesGenres from "@/components/ShowMoviesGenres";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import ProtectRoute from "@/components/ProtectRoute";

export default function Animation() {
  const [page, setPage] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>();

  useEffect(() => {
    if (pageNumber) {
      setPage(pageNumber);
    }
  }, [page, pageNumber]);

  const slidePage = (pageNumerate: number) => {
    setPageNumber(pageNumerate);
  };

  return (
    <ProtectRoute>
      <div className="bg-gray-900">
        <ShowMoviesGenres
          genreCode={16}
          genreName="Animação"
          genrePage={page}
        />
        <div className="w-full relative bottom-24 flex justify-end p-6 h-56 xs:h-24 sm:h-24">
          <div className="flex w-72 gap-4 xs:w-36 sm:w-36">
            <div className="h-12 w-12 border-2 border-cyan-500 flex justify-center items-center xs:w-8 xs:h-8 sm:w-8 sm:h-8">
              <button
                className="text-white text-xl font-semibold xs:text-xs sm:text-sm"
                onClick={() => slidePage(1)}
              >
                1
              </button>
            </div>
            <div className="h-12 w-12 border-2 border-cyan-500 flex justify-center items-center xs:w-8 xs:h-8 sm:w-8 sm:h-8">
              <button
                className="text-white text-xl font-semibold xs:text-xs sm:text-sm"
                onClick={() => slidePage(2)}
              >
                2
              </button>
            </div>
            <div className="h-12 w-12 border-2 border-cyan-500 flex justify-center items-center xs:w-8 xs:h-8 sm:w-8 sm:h-8">
              <button
                className="text-white text-xl font-semibold xs:text-xs sm:text-sm"
                onClick={() => slidePage(3)}
              >
                3
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectRoute>
  );
}
