import type { InputTypes } from "@/types/types"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

const InputArea = ({
  label,
  value,
  errors,
  readonly = false,
  onChange,
  row
}: InputTypes) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        {label && (
          <Label>{label}</Label>
        )}
        <Textarea value={value} onChange={onChange} readOnly={readonly} rows={row ?? 3}/>
        {errors && <span className="text-red-500 text-sm">{errors}</span>}
      </div>

    </>
  )

}

export default InputArea