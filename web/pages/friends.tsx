import { MailIcon } from "@heroicons/react/outline";
import React, { ReactElement, useEffect, useState } from "react";
import { mutate } from "swr";
import FriendCard from "../components/FriendCard";
import FriendDetails from "../components/FriendDetails";
import FriendRequests from "../components/FriendRequests";
import Layout from "../components/Layout";
import SendFriendRequest from "../components/SendFriendRequest";
import useFriends from "../data/useFriends";

const Friends = () => {
  const { friends, isValidating, error } = useFriends();
  const [friendDetailsOpen, setFriendDetailsOpen] = useState(false);
  const [friendId, setFriendId] = useState<number>();
  const [sendFriendRequestOpen, setSendFriendRequestOpen] = useState(false);
  const [friendRequestsOpen, setFriendRequestsOpen] = useState(false);

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
      </div>
      {isValidating ? (
        <h1>loading...</h1>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 mt-4">
            {isValidating ? (
              <h1>loading</h1>
            ) : (
              <>
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
                />
              </>
            )}

            <button
              className="fixed right-0 bottom-0 mr-16 mb-8 p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 shadow-lg"
              onClick={() => setFriendRequestsOpen(true)}
            >
              <MailIcon className="w-8" />
            </button>
          </div>
          <SendFriendRequest isOpen={sendFriendRequestOpen} setIsOpen={setSendFriendRequestOpen} />
          <FriendRequests isOpen={friendRequestsOpen} setIsOpen={setFriendRequestsOpen} />
        </>
      )}
    </>
  );
};

Friends.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Friends;
