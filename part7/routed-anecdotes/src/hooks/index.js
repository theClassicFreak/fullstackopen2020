import {useState} from 'react'

export const useField = (type) => {

    const [value, setValue] = useState('')

    const onChange = (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }

    const reset = (e) => {
        e.preventDefault()
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}

