import type { InputTypes } from "@/types/types"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const InputLabel = ({
  icon,
  label,
  value,
  errors,
  readonly = false,
  onChange,
}: InputTypes) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        {label && (
          <div className="flex gap-1">
            {icon}
            <Label>{label}</Label>
          </div>
        )}
        <Input value={value} onChange={onChange} readOnly={readonly} />
        {errors && <span className="text-red-500 text-sm">{errors}</span>}
      </div>

    </>
  )

}

export default InputLabel