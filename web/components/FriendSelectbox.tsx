import { Listbox, Transition } from "@headlessui/react";
import { useField } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import useFriends from "../data/useFriends";
import { User } from "../data/useUser";

interface FriendSelectboxProps {
  name: string;
}

// urobiť viac generický select a pridať defaultnú hodnotu
const FriendSelectbox = ({ name }: FriendSelectboxProps) => {
  const { friends, isValidating, mutate } = useFriends();
  const [selectedPerson, setSelectedPerson] = useState<User>();
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    helpers.setValue(selectedPerson ? selectedPerson.id : -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPerson]);

  return (
    <div>
      <label htmlFor="friendSelect" className="block text-lg font-medium text-gray-700">
        Send To:
      </label>
      <div className="w-72">
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <div className="relative mt-1">
            <Listbox.Button
              id="friendSelect"
              className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
            >
              <span className="block truncate">
                {selectedPerson ? selectedPerson.username : "Select friend..."}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {friends?.map((friend, friendIdx) => (
                  <Listbox.Option
                    key={friendIdx}
                    className={({ active }) =>
                      `${active ? "text-sky-900 bg-sky-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={friend}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${selected ? "font-medium" : "font-normal"} block truncate`}
                        >
                          {friend.username}
                        </span>
                        {selected ? (
                          <span
                            className={`${active ? "text-sky-600" : "text-sky-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default FriendSelectbox;
