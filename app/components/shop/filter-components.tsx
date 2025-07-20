import type { SetURLSearchParams } from "react-router";
import { Slider } from "~/components/ui";
import type { Filters } from "~/types";

interface FilterComponentsProps {
    filters: Filters;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}

export function FilterComponents({
    filters,
    searchParams,
    setSearchParams,
}: FilterComponentsProps) {
    const handleMultiCheckboxChange = (
        group: string,
        key: string,
        value: string,
        checked: boolean
    ) => {
        const paramKey = `filter[${group}][${key}]`;
        const newParams = new URLSearchParams(searchParams);

        const existing = newParams.getAll(paramKey);
        newParams.delete(paramKey);

        const newValues = checked
            ? [...existing, value]
            : existing.filter((v) => v !== value);

        for (const v of newValues) {
            newParams.append(paramKey, v);
        }

        setSearchParams(newParams);
    };

    // Simple filter setter for single-value filters
    const handleFilterChange = (
        field: string,
        value: string | number | boolean
    ) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === "" || value === false) {
            newParams.delete(field);
        } else {
            newParams.set(field, String(value));
        }
        setSearchParams(newParams);
    };

    const renderFilter = (filter: Filters[number]) => {
        if (filter.type === "checkbox" && filter.options.length === 0) return null;

        switch (filter.type) {
            case "slider": {
                const searchValue = searchParams.get(`filter[${filter.name}]`);
                const [minValue, maxValue] = searchValue
                    ? searchValue.split(",").map(Number)
                    : [filter.options.min, filter.options.max];

                const values = [
                    Number(minValue ?? filter.options.min),
                    Number(maxValue ?? filter.options.max),
                ];

                return (
                    <div key={filter.title} className="space-y-2">
                        <Slider
                            id={`filter-${filter.name}`}
                            label={filter.title}
                            min={filter.options.min}
                            max={filter.options.max}
                            defaultValue={values}
                            prefix={filter.options.prefix}
                            suffix={filter.options.suffix}
                            onValueCommit={([min, max]) => {
                                handleFilterChange(
                                    `filter[${filter.name}]`,
                                    [min, max].join(",")
                                );
                            }}
                        />
                    </div>
                );
            }

            case "checkbox":
                return (
                    <div key={filter.title} className="flex flex-col gap-1">
                        <span className="font-bold">{filter.title}</span>
                        <div className="grid gap-2">
                            {filter.options.map((option) => {
                                const isChecked =
                                    String(searchParams.get(`filter[${filter.name}]`)) === String(option.value);
                                const inputId = `filter-${filter.name}-${option.value}`;
                                return (
                                    <label
                                        key={option.id}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <input
                                            id={inputId}
                                            type="checkbox"
                                            className="h-4 w-4 accent-teal"
                                            checked={isChecked}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    `filter[${filter.name}]`,
                                                    e.target.checked
                                                        ? String(option.value)
                                                        : ""
                                                )
                                            }
                                        />
                                        <span>{option.name}</span>
                                        <span className="text-gray">({option.count})</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                );

            case "multi-checkbox": {

                return (
                    <div key={filter.title} className="flex flex-col gap-1">
                        <span className="font-bold">{filter.title}</span>
                        <div className="grid gap-2">
                            {filter.options.map((option) => {
                                const selectedValues = searchParams.getAll(`filter[${filter.name}][${option.value[0]}]`);
                                const isChecked = selectedValues.includes(String(option.value));
                                const inputId = `filter-${filter.name}-${option.value}`;

                                return (
                                    <label
                                        key={option.id}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <input
                                            id={inputId}
                                            type="checkbox"
                                            className="h-4 w-4 accent-teal"
                                            checked={isChecked}
                                            onChange={(e) =>
                                                handleMultiCheckboxChange(
                                                    filter.name,
                                                    String(option.value[0]),
                                                    String(option.value),
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span>{option.name}</span>
                                        <span className="text-gray">({option.count})</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                );
            }
        }
    };

    return <div className="grid gap-4">{filters.map(renderFilter)}</div>;
}
