import * as React from "react";

const randomString = () => Math.random().toString(36).substr(2, 9);

const useStateWithCallback = (initialValue) => {
    const callbackRef = React.useRef(null)
    const [state, setState] = React.useState({
        value: initialValue,
        revision: randomString(),
    })

    React.useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current(state.value)

            callbackRef.current = null
        }
    }, [state.revision, state.value])

    const setValueWithCallback = React.useCallback((newValue, callback) => {
        callbackRef.current = callback

        return setState({
            value: newValue,
            revision: randomString(),
        })
    }, [])

    return [state.value, setValueWithCallback]
}

export default useStateWithCallback