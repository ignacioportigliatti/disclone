import React from 'react'


const useOrigin = () => {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
    
    if (!mounted) return '';

    return origin;
}

export default useOrigin
