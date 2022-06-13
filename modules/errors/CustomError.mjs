class CustomError extends Error {
    fields = []
    description = ""
    statusCode = null

    constructor(props) {
        super(props.message)
        this.fields = props.fields
        this.description = props.description
        this.statusCode = props.statusCode
    }
}

export default CustomError