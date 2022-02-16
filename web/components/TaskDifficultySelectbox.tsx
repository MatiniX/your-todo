import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid";
import { useField } from "formik";
import React, { Fragment, useEffect, useState } from "react";

interface TaskDifficultySelectboxProps {
  name: string;
}

const TaskDifficultySelectbox = ({ name }: TaskDifficultySelectboxProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [_, meta, helpers] = useField(name);

  const { value, touched, error } = meta;

  useEffect(() => {
    helpers.setValue(selectedDifficulty.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDifficulty]);

  // tento useEffect kontroluje hodnotu v selectboxe podla aktualnej hodnoty vo formiku
  useEffect(() => {
    setSelectedDifficulty(value.charAt(0).toUpperCase() + value.slice(1));
  }, [value]);

  return (
    <div>
      <label htmlFor="friendSelect" className="block text-lg font-medium text-gray-700">
        Select difficulty:
      </label>
      <div className="w-72">
        <Listbox value={selectedDifficulty} onChange={setSelectedDifficulty}>
          <div className="relative mt-1">
            <Listbox.Button
              id="friendSelect"
              className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
            >
              <span className="block truncate">{selectedDifficulty}</span>
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
                {/* EASY OPTION */}
                <Listbox.Option
                  className={({ active }) =>
                    `${active ? "text-green-900 bg-green-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value="Easy"
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? "font-medium" : "font-normal"} block truncate`}
                      >
                        Easy
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? "text-green-600" : "text-green-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>

                {/* MEDIUM OPTION */}
                <Listbox.Option
                  className={({ active }) =>
                    `${active ? "text-yellow-900 bg-yellow-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value="Medium"
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? "font-medium" : "font-normal"} block truncate`}
                      >
                        Medium
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? "text-yellow-600" : "text-yellow-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>

                {/* HARD OPTION */}
                <Listbox.Option
                  className={({ active }) =>
                    `${active ? "text-red-900 bg-red-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value="Hard"
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? "font-medium" : "font-normal"} block truncate`}
                      >
                        Hard
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? "text-red-600" : "text-red-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <div className="mt-1">
        {touched && error ? <div className="mt-1 text-sm text-red-400">{error}</div> : null}
      </div>
    </div>
  );
};

export default TaskDifficultySelectbox;
