import { MailIcon } from "@heroicons/react/outline";
import React, { ReactElement, useEffect, useState } from "react";
import FriendCard from "../components/FriendCard";
import FriendDetails from "../components/FriendDetails";
import FriendRequests from "../components/FriendRequests";
import Layout from "../components/Layout";
import SendFriendRequest from "../components/SendFriendRequest";
import { useFriendRequests } from "../data/useFriendRequests";
import useFriends from "../data/useFriends";
import axiosInstance from "../utils/axiosInstance";

const Friends = () => {
  const { friends, isValidating, isLoading, error, mutate } = useFriends();
  const [friendDetailsOpen, setFriendDetailsOpen] = useState(false);
  const [friendId, setFriendId] = useState<number>();
  const [sendFriendRequestOpen, setSendFriendRequestOpen] = useState(false);
  const [friendRequestsOpen, setFriendRequestsOpen] = useState(false);
  const { hasRequest } = useFriendRequests();

  return (
    <>
      <div className="flex items-center">
        <h1 className="page-header">Friends</h1>
        <button
          className="ml-auto mr-8 px-3 py-2 rounded font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => {
            setSendFriendRequestOpen(true);
          }}
        >
          Add Friend
        </button>
        <SendFriendRequest isOpen={sendFriendRequestOpen} setIsOpen={setSendFriendRequestOpen} />
        <FriendRequests isOpen={friendRequestsOpen} setIsOpen={setFriendRequestsOpen} />
      </div>
      {isLoading ? (
        <h1>loading...</h1>
      ) : friends!.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-4 mt-4">
            {friends
              ? friends.map((friend) => (
                  <FriendCard
                    key={friend.id}
                    id={friend.id}
                    username={friend.username}
                    trustPoints={friend.trustPoints}
                    setFriendDetailOpen={setFriendDetailsOpen}
                    setFriendId={setFriendId}
                  />
                ))
              : "no friends"}
            <FriendDetails
              id={friendId!}
              isOpen={friendDetailsOpen}
              setIsOpen={setFriendDetailsOpen}
              removeFriend={async (id: number) => {
                try {
                  // zavola api, aktualizuje lokalne data ihned a revaliduje
                  await axiosInstance.delete(`user/cancel-friendship/${id}`);
                  mutate([...friends!.filter((friend) => friend.id !== id)]);
                  console.log(friends);
                } catch (error) {
                  throw error;
                }
              }}
            />
            {hasRequest && (
              <button
                className="fixed right-0 bottom-0 mr-16 mb-8 p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 shadow-lg"
                onClick={() => setFriendRequestsOpen(true)}
              >
                <MailIcon className="w-8" />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="mt-48 text-center">
          <h1 className="mb-4 text-2xl text-gray-800 font-medium">
            Looks like you don&apos;t have friends!
          </h1>
          <button
            className="ml-auto mr-8 px-3 py-2 rounded font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => {
              setSendFriendRequestOpen(true);
            }}
          >
            Find Some!
          </button>
        </div>
      )}
    </>
  );
};

Friends.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Friends;
