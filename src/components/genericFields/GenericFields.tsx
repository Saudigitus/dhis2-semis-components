import CheckInput from "./fields/CheckInput";
import DateInput from "./fields/DateInput";
import InputNumber from "./fields/InputNumber";
import InputText from "./fields/InputText";
import SingleSelectField from "./fields/SingleSelect";
import InputArea from "./fields/InputArea";
import { Attribute } from "../../types/generated/models";
import RadioButton from "./fields/RadioButton";
import { type GenericFieldsComponentProps } from "../../types/form/GenericFieldsTypes";
import { CustomAttributeProps } from "../../types/variables/AttributeColumns";
import DateRangePicker from './fields/datepicker/improvedDateRage';
import ImageField from './fields/ImageField';

function GenericFields({ attribute, disabled, valueType, form, onInputChange }: GenericFieldsComponentProps) {
  switch (valueType) {
    case Attribute.valueType.BOOLEAN as unknown as CustomAttributeProps["valueType"]:
      return <RadioButton {...attribute} disabled={disabled} />;

    case Attribute.valueType.PHONE_NUMBER as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.EMAIL as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"]:
      return <InputText {...attribute} disabled={attribute?.disabled} />;

    case Attribute.valueType.NUMBER as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.INTEGER as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.INTEGER_POSITIVE as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.INTEGER_ZERO_OR_POSITIVE as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.TIME as unknown as CustomAttributeProps["valueType"]:
      return <InputNumber {...attribute} type="number" disabled={attribute?.disabled} />;

    case Attribute.valueType.LONG_TEXT as unknown as CustomAttributeProps["valueType"]:
      return <InputArea {...attribute} disabled={attribute?.disabled} />;

    case Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"]:
      return <DateInput {...attribute} disabled={attribute?.disabled} />;

    case Attribute.valueType.TRUE_ONLY as unknown as CustomAttributeProps["valueType"]:
      return <CheckInput {...attribute} disabled={disabled} />

    case Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"]:
      return <SingleSelectField options={attribute.options} onChange={onInputChange} {...attribute} disabled={attribute.disabled} />;

    case Attribute.valueType.IMAGE as unknown as CustomAttributeProps["valueType"]:
      return <ImageField disabled={disabled} {...attribute} form={form} />;

    case 'DATE_RANGE' as unknown as CustomAttributeProps["valueType"]:
      return <DateRangePicker disabled={disabled} name='dateRange' />

    default:
      return <span>ValueType not mapped</span>;
  }
}

export default GenericFields;
