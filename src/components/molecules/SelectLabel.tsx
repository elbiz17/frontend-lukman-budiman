import type { SelectTypes } from "@/types/types"
import { Label } from "../ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

const SelectLabel = ({
    icon,
    label,
    value,
    options,
    errors,
    placeholder,
    onChange,
    reverse = false
}: SelectTypes) => {
    const [selectedValue, setSelectedValue] = useState(value)

    const handleChange = (val: any) => {
        if (val == "") {
            onChange("")
        } else {
            onChange(val)
        }
    }

    const getLabelFromValue = (val: string) => {
        if (!val) return "";
        if (val === "all") return "All";
        const option = options?.find((opt) => opt.value === val);
        return <div>
            {option?.description} {option?.description && '-'} {option?.label}
        </div>;
    };

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);
    return (
        <>
            <div className="flex flex-col space-y-2">
                {label && (
                    <div className="flex gap-1">
                        {icon}
                        <Label>{label}</Label>
                    </div>
                )}
                <Select onValueChange={handleChange} value={selectedValue}>
                    <SelectTrigger className={`w-full focus:ring-0 dark:bg-black dark:hover:bg-muted ${selectedValue ? "" : "text-muted-foreground"}`}>
                        <SelectValue
                            placeholder={placeholder}
                        >
                            {selectedValue ? getLabelFromValue(selectedValue) : placeholder + ' ste'}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {/* <SelectItem value="">--Choose Option--</SelectItem> */}
                        {reverse ? (
                            options.map((item, index) => (
                                <SelectItem value={item.value} key={index}>{item.description && `${(item.description)}`} - {item.label}</SelectItem>
                            ))
                        ) : (
                            options.map((item, index) => (
                                <SelectItem value={item.value} key={index}>{item.label} {item.description && `${(item.description)}`}</SelectItem>
                            ))
                        )}

                    </SelectContent>
                </Select>
                {errors && <span className="text-red-500 text-sm">{errors}</span>}
            </div>

        </>
    )

}

export default SelectLabel