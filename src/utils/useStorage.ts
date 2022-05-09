import { useState } from 'react'

const useStorage = <T>(key: string, defaultValue: T): [T, (value: T) => void | ((arg: T) => T)] => {
	const [storeValue, setStoreValue] = useState<T>(() => {
		const localValue = localStorage.getItem(key)
		if (localValue) {
			return JSON.parse(localValue)
		}
		localStorage.setItem(key, JSON.stringify(defaultValue))
		return defaultValue
	})

	const _setStoreValue = (value: T) => {
		localStorage.setItem(key, JSON.stringify(value))
		setStoreValue(value)
	}

	// @ts-ignore
	return [storeValue, _setStoreValue]
}

export default useStorage
