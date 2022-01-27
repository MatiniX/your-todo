import React, { ReactElement, useState } from "react";
import FriendCard from "../components/FriendCard";
import FriendDetails from "../components/FriendDetails";
import Layout from "../components/Layout";
import useFriends from "../data/useFriends";

const Friends = () => {
  const { friends, loading, error, mutate } = useFriends();
  const [friendDetailsOpen, setFriendDetailsOpen] = useState(false);
  const [friendId, setFriendId] = useState<number>();

  return (
    <>
      <h1 className="page-header">Friends</h1>
      <div className="flex flex-wrap gap-4 mt-4">
        {friends?.map((friend) => (
          <FriendCard
            key={friend.id}
            id={friend.id}
            username={friend.username}
            trustPoints={friend.trustPoints}
            setFriendDetailsOpen={setFriendDetailsOpen}
            setFriendId={setFriendId}
          />
        ))}
      </div>
      {friendDetailsOpen && (
        <FriendDetails id={friendId!} isOpen={friendDetailsOpen} setIsOpen={setFriendDetailsOpen} />
      )}
    </>
  );
};

Friends.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Friends;
