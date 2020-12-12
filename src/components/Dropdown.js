import * as React from "react";
import { Menu, Transition } from "@headlessui/react";
import { caretDownOutline, downloadSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import Button from "./Button";

export default function Dropdown({ onClick = () => {}, disabled = false }) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <span className="rounded-md shadow-sm">
                <Menu.Button className="inline-flex justify-center w-full text-sm font-medium leading-5 rounded-md">
                  <Button disabled={disabled}>
                    <IonIcon icon={downloadSharp} size="small" />
                    <span>Download</span>
                    <IonIcon icon={caretDownOutline} size="small" />
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
                    <Menu.Item
                      onClick={(e) => {
                        if (!disabled) onClick(e);
                      }}
                    >
                      <a className="flex cursor-pointer justify-between w-full px-4 py-2 text-sm leading-5 text-left">
                        Download MP3
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a className="flex cursor-pointer justify-between w-full px-4 py-2 text-sm leading-5 text-left">
                        Download WAV
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
