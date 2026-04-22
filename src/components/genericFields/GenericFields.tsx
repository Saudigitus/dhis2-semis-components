import CheckInput from "./fields/CheckInput";
import DateInput from "./fields/DateInput";
import InputNumber from "./fields/InputNumber";
import InputText from "./fields/InputText";
import SingleSelectField from "./fields/SingleSelect";
import InputArea from "./fields/InputArea";
import { Attribute } from "dhis2-semis-types";
import RadioButton from "./fields/RadioButton";
import { type GenericFieldsComponentProps } from "../../types/form/GenericFieldsTypes";
import { CustomAttributeProps } from "../../types/variables/AttributeColumns";
import DateRangePicker from './fields/datepicker/improvedDateRage';
import ImageField from './fields/ImageField';
import { DataProvider } from '@dhis2/app-runtime';
import OrgUnitTreeField from "./fields/orgUnitTree/OrgUnitTreeField";
import { SelectMultiple } from "./fields/MultiSelect";

function GenericFields(props: GenericFieldsComponentProps) {
  const { attribute, disabled, valueType, form, onInputChange, storybook, setChanged, submitted, baseUrl } = props;

  switch (valueType) {
    case Attribute.valueType.BOOLEAN as unknown as CustomAttributeProps["valueType"]:
      return <RadioButton dataTest={attribute.name} {...attribute} disabled={disabled} />;

    case Attribute.valueType.PHONE_NUMBER as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.EMAIL as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.TEXT as unknown as CustomAttributeProps["valueType"]:
      return <InputText dataTest={attribute.name} {...attribute} disabled={attribute?.disabled} />;

    case Attribute.valueType.NUMBER as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.INTEGER as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.INTEGER_POSITIVE as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.INTEGER_ZERO_OR_POSITIVE as unknown as CustomAttributeProps["valueType"]:
    case Attribute.valueType.TIME as unknown as CustomAttributeProps["valueType"]:
      return <InputNumber dataTest={attribute.name} {...attribute} type="number" disabled={attribute?.disabled} />;

    case Attribute.valueType.LONG_TEXT as unknown as CustomAttributeProps["valueType"]:
      return <InputArea dataTest={attribute.name} {...attribute} disabled={attribute?.disabled} />;

    case Attribute.valueType.DATE as unknown as CustomAttributeProps["valueType"]:
      return <DateInput dataTest={attribute.name} {...attribute} disabled={attribute?.disabled} />;

    case Attribute.valueType.TRUE_ONLY as unknown as CustomAttributeProps["valueType"]:
      return <CheckInput dataTest={attribute.name} {...attribute} disabled={disabled} />

    case Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"]:
      return <SingleSelectField dataTest={attribute.name} submitted={submitted} setChanged={setChanged} options={attribute.options} onChange={onInputChange} {...attribute} disabled={attribute.disabled} />;

    case 'MULTI_SELECT' as unknown as CustomAttributeProps["valueType"]:
      return <SelectMultiple dataTest={attribute.name} setChanged={setChanged} options={attribute?.options || [] as unknown as CustomAttributeProps["options"]} onChange={onInputChange} {...attribute} disabled={attribute.disabled} />;

    case Attribute.valueType.IMAGE as unknown as CustomAttributeProps["valueType"]:
      return <>
        {
          storybook ?
            <ImageField dataTest={attribute.name} storyBook={storybook} disabled={disabled} {...attribute} form={form} />
            : (
              <DataProvider baseUrl={baseUrl} apiVersion={39}>
                <ImageField dataTest={attribute.name} storyBook={storybook} disabled={disabled} {...attribute} form={form} />
              </DataProvider>
            )
        }
      </>

    case 'DATE_RANGE' as unknown as CustomAttributeProps["valueType"]:
      return <DateRangePicker dataTest={attribute.name} disabled={disabled} name='dateRange' setChanged={setChanged} />

    case Attribute.valueType.ORGANISATION_UNIT as unknown as CustomAttributeProps["valueType"]:
      return <OrgUnitTreeField {...attribute} />

    default:
      return <span>ValueType not mapped</span>;
  }
}

export default GenericFields;
