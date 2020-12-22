import * as React from "react";
import { Menu, Transition } from "@headlessui/react";
import { personCircleSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import Button from "./Button.tsx";

export default function Dropdown({ onClick = () => {} }) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <span className="rounded-md shadow-sm">
                <Menu.Button className="inline-flex justify-center w-full text-sm font-medium leading-5 rounded-md">
                  <Button onClick={onClick}>
                    <IonIcon icon={personCircleSharp} size="small"></IonIcon>
                  </Button>
                </Menu.Button>
              </span>

              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 w-56 mt-2 origin-top-right bg-secondary text-primary divide-y divide-gray-100 border shadow-lg outline-none"
                >
                  <div>
                    <Menu.Item>
                      <a className="flex cursor-pointer justify-between w-full px-4 py-2 text-sm font-bold leading-5 text-left">
                        Logged in as ___.
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a className="flex cursor-pointer justify-between w-full px-4 py-2 text-sm leading-5 text-left">
                        My Profile
                      </a>
                    </Menu.Item>
                    <Menu.Item className="flex cursor-pointer justify-start w-full px-4 py-2 text-sm leading-5 text-left">
                      <span>Settings</span>
                    </Menu.Item>
                    <Menu.Item>
                      <a className="flex cursor-pointer justify-between w-full px-4 py-2 text-sm leading-5 text-left">
                        Log Out
                      </a>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
}
