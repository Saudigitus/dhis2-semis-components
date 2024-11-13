interface DropZoneProps {
    /**
     * onSave is where the logic/processing of the loaded data/file takes place.
     * 
     * It receives the file metadata as a parameter
     *
     * @type {(args: any) => void}
     */
    onSave: (args: any) => void;

    /**
     * This variable is a list of acceptable extensions to upload, by default this variable is .csv. 
     * 
     * if you have more than one acceptable extension, the extensions must be separated by a comma ’,’
     *
     * @type {string}
     */
    accept?: string

    /**
     * The input plceholder
     *
     * @type {?string}
     */
    placeholder?: string

    /**
     * This boolean variable tells you whether to hide the updload image in the input.
     *
     * @type {?boolean}
     */
    hideIcon?: boolean

    /**
     * This variable tells you whether the label ‘Drag & drop files or browse’ should be visible or not.
     *
     * @type {?boolean}
     */
    hideLabel?: boolean

    /**
     * Field heigth
     *
     * @type {?string}
     */
    height?: string

    /**
     * Field width
     *
     * @type {?string}
     */
    width?: string

    /**
     * This component can be visible, ready to receive values, or it can be called from a button action,
     * 
     *  which when pressed calls the input in a dialogue.So this variable tells you whether the input 
     * 
     * should be ready to receive a value or whether it should be called from a button.
     *
     * @type {?boolean}
     */
    dialogMode?: boolean

    /**
     * If the dialogMode is true, the dialogue may or may not come with a title.
     * 
     * If you want a title in the dialogue, you can pass your title through this variable
     *
     * @type {?string}
     */
    title?: string

    /**
     * If the dialogue mode is true, the button that triggers the modal will appear by default
     * 
     * with the label ‘Upload Files’ If you wish, you can change this label by passing the 
     * 
     * new label through this variable
     *
     * @type {?string}
     */
    buttonLabel?: string
}

export type { DropZoneProps }