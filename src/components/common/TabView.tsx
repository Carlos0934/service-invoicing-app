import { FC } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
interface Props {
  tabs: {
    name: string;
    component: React.ReactNode;
  }[];
  title: string;
  tab?: number;
  setTab?: (tab: number) => void;
}
export const TabView: FC<Props> = ({ title, tabs, tab, setTab }) => {
  return (
    <div className="max-w-screen-lg p-2">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="mx-4">
        <Tab.Group selectedIndex={tab} onChange={setTab}>
          <Tab.List className="text-lg mt-4  font-semibold flex gap-4 ">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  classNames("w-full py-1  transition duration-400 border-2", {
                    "bg-gray-50  text-gray-600 shadow  border-transparent  rounded ":
                      selected,

                    "text-gray-400 hover:text-gray-600 border-gray-200 hover:border-transparent hover:bg-gray-50 hover:shadow-md hover:rounded ":
                      !selected,
                  })
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {tabs.map((tab) => (
              <Tab.Panel key={tab.name} className="mt-4">
                {tab.component}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
