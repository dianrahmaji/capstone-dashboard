import clsx from "clsx";
import { useField } from "formik";
import { Combobox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export default function ReferenceCombobox({
  label,
  filteredItems,
  setQuery,
  ...props
}) {
  const [field, meta, helpers] = useField(props);

  const { onBlur, value } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const handleBlur = () => {
    onBlur({ target: { name: props.name } });
  };

  return (
    <div className="mt-3">
      <Combobox as="div" value={value} onBlur={handleBlur} onChange={setValue}>
        <Combobox.Label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full rounded-md border border-accent bg-white py-2 pl-3 pr-10 font-bold text-primary shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(value) =>
              filteredItems.find(({ _id }) => value._id === _id)?.name
            }
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          </Combobox.Button>
          {filteredItems.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-y-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredItems.map((item) => (
                <Combobox.Option
                  key={item._id}
                  value={item}
                  className={({ active }) =>
                    clsx(
                      {
                        "bg-primary text-secondary": active,
                        "text-primary": !active,
                      },
                      "relative z-20 cursor-default select-none  py-2 pl-3 pr-9",
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <div
                        className={clsx(
                          { "font-semibold": selected },
                          "flex gap-2",
                        )}
                      >
                        <div className="flex flex-col">
                          <span>Name</span>
                          <span>Authors</span>
                          <span>Location</span>
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={clsx(
                              { "font-semibold": selected },
                              "truncate",
                            )}
                          >
                            {item.name}.{item.extension}
                          </span>
                          <span>
                            {item.authors.reduce(
                              (prev, curr) =>
                                prev === undefined
                                  ? curr.fullName
                                  : `${prev} , ${curr.fullName}`,
                              undefined,
                            )}
                          </span>
                          <span>
                            {item.folders.parent.length > 0 &&
                              `${
                                item.folders.parent.sort(
                                  (a, b) => b.level - a.level,
                                )[0]?.name
                              } > `}
                            {item.folders.parent.length > 1 && "... > "}
                            {item.folders.name}
                          </span>
                        </div>
                      </div>
                      {selected && (
                        <span
                          className={clsx(
                            { "text-white": active, "text-primary": !active },
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      {touched && error ? (
        <div className="mt-1 text-xs text-red-500">{error}</div>
      ) : null}
    </div>
  );
}
