import React, { SetStateAction } from "react";
import { useLeaderboard } from "../data/useLeaderboard";

interface LeaderboardProps {
  setOpenDetails: React.Dispatch<SetStateAction<boolean>>;
  setCurrUserId: React.Dispatch<SetStateAction<number | undefined>>;
}

const Leaderboard = ({ setOpenDetails, setCurrUserId }: LeaderboardProps) => {
  const { data, error, loading } = useLeaderboard();
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full sm:px-6 lg:px-32">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trust Points
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Details</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading
                  ? "loading"
                  : data?.map((user, idx) => (
                      <tr key={user.id}>
                        <td className="px-6 py-3">
                          <span className="text-sm font-bold text-gray-900">{idx + 1}.</span>
                        </td>
                        <td className="px-6 py-3">
                          <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        </td>
                        <td className="px-6 py-3">
                          <div className="text-sm font-medium text-gray-900">
                            {user.trustPoints}
                          </div>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-sky-600 hover:text-sky-900"
                            onClick={() => {
                              setCurrUserId(user.id);
                              setOpenDetails(true);
                            }}
                          >
                            Details
                          </a>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
