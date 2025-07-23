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
    // Simple filter setter for single-value filters
    const handleFilterChange = (
        field: string,
        value: string,
        checked?: boolean
    ) => {
        const newParams = new URLSearchParams(searchParams);

        if (checked !== undefined) {
            // Multi-value (checkbox) mode
            const current = newParams.get(field)?.split(',').filter(Boolean) || [];

            const updated = checked
                ? [...new Set([...current, value])]
                : current.filter(v => v !== value);

            if (updated.length > 0) {
                newParams.set(field, updated.join(','));
            } else {
                newParams.delete(field);
            }
        } else {
            // Single-value mode
            if (!value) {
                newParams.delete(field);
            } else {
                newParams.set(field, value);
            }
        }

        setSearchParams(newParams);
    };

    const renderFilter = (filter: Filters[number]) => {
        if (filter.type === "checkbox" && filter.options.length === 0) return null;

        switch (filter.type) {
            case "slider": {

                return (
                    <div key={filter.title} className="space-y-2">
                        <Slider
                            id={`filter-${filter.name}`}
                            label={filter.title}
                            min={filter.options.min}
                            max={filter.options.max}
                            defaultValue={[
                                Number(filter.options.min),
                                Number(filter.options.max),
                            ]}
                            prefix={filter.options.prefix}
                            suffix={filter.options.suffix}
                            onValueCommit={([min, max]) => {
                                handleFilterChange(
                                    `filter[${filter.name}]`,
                                    [Number(min), Number(max)].join(",")
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
                                const inputId = `filter-${filter.name}-${option.value}`;
                                const selectedValues = (searchParams.get(`filter[${filter.name}]`) || '')
                                    .split(',')
                                    .filter(Boolean);

                                const isChecked = selectedValues.includes(String(option.value));

                                return (
                                    <label key={option.id} className="flex items-center gap-2 text-sm">
                                        <input
                                            id={inputId}
                                            type="checkbox"
                                            className="h-4 w-4 accent-teal"
                                            checked={isChecked}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    `filter[${filter.name}]`,
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
    };

    return <div className="grid gap-4">{filters.map(renderFilter)}</div>;
}
