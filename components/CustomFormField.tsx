import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
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
  const { formFieldType, placeholder } = props;

  switch (formFieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
      );

    default:
      return null;
  }
};

export default CustomFormField;
