import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { E164Number } from "libphonenumber-js";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FormFieldType } from "./PatientForm";

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
  renderDatePicker?: (field: any) => React.ReactNode;
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
  const { formFieldType, placeholder, renderSkeleton, renderDatePicker } =
    props;

  switch (formFieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="GB"
            international
            withCountryCallingCode
            value={field.value as E164Number | ""}
            onChange={(value) => field.onChange(value || "")}
          />
        </FormControl>
      );

    case FormFieldType.SKELETON:
      if (renderSkeleton) return renderSkeleton(field);
      if (renderDatePicker) return renderDatePicker(field);
      return null;

    default:
      return null;
  }
};

export default CustomFormField;
