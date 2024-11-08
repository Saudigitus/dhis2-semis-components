import { Help, MenuItem } from "@dhis2/ui"
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import { OptionProps } from "../../../types/header/headerTypes";
import "../globalStyle.css"

const MenuItemContainer = ({ options, setSelected, onToggle, onSelectOption }:
    {
        options: OptionProps[], setSelected: (selected: OptionProps) => void,
        onToggle: () => void, onSelectOption: () => void
    }) => {

    if (options.length === 0) {
        return <Help className="customDhis2Helper">
            No items found
        </Help>
    }

    const onSelect = (option: OptionProps) => {
        setSelected(option)
        onSelectOption()
        onToggle()
    }

    return (
        <>
            {
                options.map((option) => (
                    < MenuItem onClick={() => onSelect(option)} icon={option.icon ? <AmpStoriesIcon /> : null} key={option.value} label={option.label} />
                ))
            }
        </>
    )
}

export default MenuItemContainer