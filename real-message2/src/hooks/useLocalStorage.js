//Serves the same fucntion as useState where data on the Id is stored
import { useEffect, useState } from 'react'

const PREFIX = 'whatsapp-clone-' // since we are using a LocalStorage on a LocalHost this is here to differentiate them so multipla 
//local storages do not conflic with each other

export default function useLocalStorage(key, initialValue) {
    //key us what is stored in local stroage and initalValue is what is passed to the usestate
  const prefixedKey = PREFIX + key

  //Essentailly the code below is used to get our Vlaue aka the Id form LocalStorage and actually put into the state
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  //Use Effect is here so that once we've gotten our Value form LocalStorage we save it so it can be used again  and
  // if it is changed to overwrite the previous value and save the new one
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}