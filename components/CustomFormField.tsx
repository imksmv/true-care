import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Form } from "react-hook-form";
import { FormFieldType } from "./PatientForm";
import Image from "next/image";

interface Props {
  control: Control<any>;
  formFieldType: FormFieldType;
  name: string;
  label?: string;
  palceholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const CustomFormField = (props: Props) => {
  const { control, formFieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {formFieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const RenderField = ({ field, props }: { field: any; props: Props }) => {
  const { formFieldType, iconSrc, iconAlt, palceholder } = props;

  switch (formFieldType) {
    case FormFieldType.INPUT:
      return (
        <div>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "Icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input placeholder={palceholder} {...field} />
          </FormControl>
        </div>
      );
      break;

    default:
      break;
  }
};

export default CustomFormField;
