import defaultClasses from '../table.module.css';

export default function TextPagination(text: string): React.ReactElement {
    return (
        <span className={defaultClasses.textPagination}>
            {text}
        </span>
    )
}