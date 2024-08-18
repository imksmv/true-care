import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldType } from "@/config/enums";
import { E164Number } from "libphonenumber-js";
import { Control } from "react-hook-form";
import "react-phone-number-input/style.css";
import { Checkbox } from "./ui/checkbox";
import { PhoneInput } from "./ui/phone-input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface Props {
  control: Control<any>;
  formFieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const CustomFormField = (props: Props) => {
  const { control, formFieldType, icon, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {formFieldType !== FormFieldType.CHECKBOX && label && (
            <div className="flex items-center gap-2">
              {icon} <FormLabel>{label}</FormLabel>
            </div>
          )}

          <RenderField field={field} props={props} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const RenderField = ({ field, props }: { field: any; props: Props }) => {
  const { formFieldType, placeholder, renderSkeleton } = props;

  switch (formFieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            className="resize-none"
            {...field}
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name}>{props.label}</label>
          </div>
        </FormControl>
      );

    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>{props.children}</SelectContent>
        </Select>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="GB"
            international
            value={field.value as E164Number | ""}
            onChange={(value) => field.onChange(value || "")}
          />
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton?.(field);

    default:
      return null;
  }
};

export default CustomFormField;
